from sqlalchemy.orm import Session, joinedload
from app_wavesound.models.models import Usuarios, Canciones, Albumes, Perfiles, Genero
from fastapi import HTTPException
from app_wavesound.schemas.Perfiles import PerfilCreate


def crear_perfil(db: Session, data: PerfilCreate, id_usuario: int):

    nuevo_perfil = Perfiles(
        id_usuario=id_usuario,
        nombre_artista=data.nombre_artista,
        biografia=data.biografia,
        foto_perfil=data.foto_perfil
    )

    db.add(nuevo_perfil)
    db.commit()
    db.refresh(nuevo_perfil)

    for id_gen in data.generos:
        genero = db.query(Genero).filter_by(id_genero=id_gen).first()
        if genero:
            nuevo_perfil.generos.append(genero)

    db.commit()
    db.refresh(nuevo_perfil)

    return nuevo_perfil



def obtener_perfil_completo(db: Session, id_usuario: int):
    """Obtiene la información completa del perfil de un usuario."""
    
    usuario = (
        db.query(Usuarios)
        .options(
            joinedload(Usuarios.canciones)
            .joinedload(Canciones.album),
            joinedload(Usuarios.canciones)
            .joinedload(Canciones.genero),
        )
        .filter(Usuarios.id_usuario == id_usuario)
        .first()
    )

    if not usuario:
        return None

    # Calcular el total de reproducciones si existe la relación
    total_reproducciones = sum(
        len(c.reproducciones) for c in usuario.canciones
    )

    # Evitar duplicados de álbumes
    albumes_unicos = list({c.album for c in usuario.canciones if c.album})

    return {
        "id_usuario": usuario.id_usuario,
        "nombre_usuario": usuario.nombre_usuario,
        "nickname": usuario.nickname,
        "email": usuario.email,
        "albumes": [
            {"id": a.id_album, "titulo": a.titulo}
            for a in albumes_unicos
        ],
        "canciones": [
            {
                "id": c.id_cancion,
                "titulo": c.titulo,
                "descripcion": c.descripcion,
                "genero": c.genero.nombre if c.genero else None,
                "album": c.album.titulo if c.album else None,
                "reproducciones": len(c.reproducciones),
            }
            for c in usuario.canciones
        ],
        "total_reproducciones": total_reproducciones,
    }

def obtener_perfil(db: Session, id_usuario: int):
    return db.query(Perfiles).filter(Perfiles.id_usuario == id_usuario).first()

def actualizar_perfil(db: Session, id_usuario: int, data: dict):
    perfil = db.query(Perfiles).filter(Perfiles.id_usuario == id_usuario).first()
    if not perfil:
        return None

    for key, value in data.items():
        setattr(perfil, key, value)

    db.commit()
    db.refresh(perfil)
    return perfil