from sqlalchemy.orm import Session
from fastapi import HTTPException
from app_wavesound.models.models import Perfiles, Generos, Usuarios, PerfilGenero


def crear_perfil_service(db: Session, id_usuario: int, nombre_artista: str,
                         biografia: str, generos_ids: list, foto_perfil: str = None):

    usuario = db.query(Usuarios).filter(Usuarios.id_usuario == id_usuario).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    if usuario.perfil:
        raise HTTPException(status_code=400, detail="El usuario ya tiene un perfil creado")

    nuevo_perfil = Perfiles(
        id_usuario=id_usuario,
        nombre_artista=nombre_artista,
        biografia=biografia,
        foto_perfil=foto_perfil
    )

    db.add(nuevo_perfil)
    db.commit()
    db.refresh(nuevo_perfil)

    # Asociar géneros
    for gid in generos_ids:
        genero = db.query(Generos).filter(Generos.id_genero == gid).first()
        if not genero:
            raise HTTPException(status_code=404, detail=f"El género {gid} no existe")
        nuevo_perfil.generos.append(genero)

    db.commit()
    db.refresh(nuevo_perfil)

    return {
        "msg": "Perfil creado exitosamente",
        "perfil": {
            "id_perfil": nuevo_perfil.id_perfil,
            "nombre_artista": nuevo_perfil.nombre_artista,
            "biografia": nuevo_perfil.biografia,
            "foto_perfil": nuevo_perfil.foto_perfil,
            "generos": [g.nombre_genero for g in nuevo_perfil.generos]
        }
    }

def obtener_perfil_completo(db: Session, user_id: int):

    user = db.query(Usuarios).filter(Usuarios.id_usuario == user_id).first()
    if not user:
        return None

    perfil = db.query(Perfiles).filter(Perfiles.id_usuario == user_id).first()
    if not perfil:
        return None

    generos = (
        db.query(Generos)
        .join(PerfilGenero, PerfilGenero.id_genero == Generos.id_genero)
        .filter(PerfilGenero.id_perfil == perfil.id_perfil)
        .all()
    )

    return {
        "id_usuario": user.id_usuario,
        "nombre_usuario": user.nombre_usuario,
        "correo": user.correo,
        "nombre_artista": perfil.nombre_artista,
        "biografia": perfil.biografia,
        "foto_perfil": perfil.foto_perfil,
        "generos": [g.nombre_genero for g in generos]
    }


# ------------------------------------------------------------
# Actualizar perfil
# ------------------------------------------------------------
def actualizar_perfil_service(db: Session, user_id: int,
                              nombre_artista=None,
                              biografia=None,
                              generos_ids=None,
                              foto_perfil=None):

    perfil = db.query(Perfiles).filter(Perfiles.id_usuario == user_id).first()
    if not perfil:
        raise HTTPException(status_code=404, detail="Perfil no encontrado")

    if nombre_artista:
        perfil.nombre_artista = nombre_artista

    if biografia:
        perfil.biografia = biografia

    if foto_perfil:
        perfil.foto_perfil = foto_perfil

    # Actualizar géneros si llegaron
    if generos_ids is not None:
        perfil.generos.clear()
        for gid in generos_ids:
            genero = db.query(Generos).filter(Generos.id_genero == gid).first()
            if not genero:
                raise HTTPException(status_code=404, detail=f"El género {gid} no existe")
            perfil.generos.append(genero)

    db.commit()
    db.refresh(perfil)

    return {"msg": "Perfil actualizado exitosamente"}


# ------------------------------------------------------------
# Eliminar perfil
# ------------------------------------------------------------
def eliminar_perfil_service(db: Session, user_id: int):

    perfil = db.query(Perfiles).filter(Perfiles.id_usuario == user_id).first()

    if not perfil:
        raise HTTPException(status_code=404, detail="Perfil no encontrado")

    # Elimina relaciones en tabla intermedia
    db.query(PerfilGenero).filter(PerfilGenero.id_perfil == perfil.id_perfil).delete()

    db.delete(perfil)
    db.commit()

    return {"msg": "Perfil eliminado correctamente"}