from sqlalchemy.orm import Session
from fastapi import HTTPException
from app_wavesound.models.models import Perfiles, Generos, Usuarios, PerfilGenero
from pathlib import Path

# ============================================================
# Crear Perfil
# ============================================================
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
            "foto_perfil": (
                f"http://127.0.0.1:8000/{nuevo_perfil.foto_perfil}"
                if nuevo_perfil.foto_perfil else None
            ),
            "generos": [g.nombre_genero for g in nuevo_perfil.generos]
        }
    }


# ============================================================
# Obtener Perfil Completo
# ============================================================
def obtener_perfil_completo(db: Session, user_id: int):

    usuario = db.query(Usuarios).filter(Usuarios.id_usuario == user_id).first()
    if not usuario:
        return None

    perfil = db.query(Perfiles).filter(Perfiles.id_usuario == user_id).first()
    if not perfil:
        return None

    foto_url = None
    if perfil.foto_perfil:
        foto_url = f"http://127.0.0.1:8000/{Path(perfil.foto_perfil).as_posix()}"
    
    return {
        "id_usuario": usuario.id_usuario,
        "nombre_usuario": usuario.nombre_usuario,
        "nombre_artista": perfil.nombre_artista,
        "biografia": perfil.biografia,
        "foto_perfil": foto_url,
        "generos": [g.nombre_genero for g in perfil.generos],
        "generos_ids": [g.id_genero for g in perfil.generos]  # útil para frontend
    }


# ============================================================
# Actualizar Perfil
# ============================================================
def actualizar_perfil_service(db: Session, user_id: int,
                              nombre_artista=None,
                              biografia=None,
                              generos_ids=None,
                              foto_perfil=None):

    perfil = db.query(Perfiles).filter(Perfiles.id_usuario == user_id).first()
    if not perfil:
        raise HTTPException(status_code=404, detail="Perfil no encontrado")

    # Datos simples
    if nombre_artista:
        perfil.nombre_artista = nombre_artista

    if biografia:
        perfil.biografia = biografia

    if foto_perfil:
        perfil.foto_perfil = foto_perfil

    # Actualizar géneros
    if generos_ids is not None:
        perfil.generos.clear()

        for gid in generos_ids:
            genero = db.query(Generos).filter(Generos.id_genero == gid).first()
            if not genero:
                raise HTTPException(status_code=404, detail=f"El género {gid} no existe")
            perfil.generos.append(genero)

    db.commit()
    db.refresh(perfil)

    return {
        "msg": "Perfil actualizado exitosamente",
        "perfil": {
            "nombre_artista": perfil.nombre_artista,
            "biografia": perfil.biografia,
            "foto_perfil": (
                f"http://127.0.0.1:8000/{perfil.foto_perfil}"
                if perfil.foto_perfil else None
            ),
            "generos": [g.nombre_genero for g in perfil.generos],
            "generos_ids": [g.id_genero for g in perfil.generos]
        }
    }


# ============================================================
# Eliminar Perfil
# ============================================================
def eliminar_perfil_service(db: Session, user_id: int):

    perfil = db.query(Perfiles).filter(Perfiles.id_usuario == user_id).first()

    if not perfil:
        raise HTTPException(status_code=404, detail="Perfil no encontrado")

    db.query(PerfilGenero).filter(PerfilGenero.id_perfil == perfil.id_perfil).delete()

    db.delete(perfil)
    db.commit()

    return {"msg": "Perfil eliminado correctamente"}
