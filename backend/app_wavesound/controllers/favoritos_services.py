# app_wavesound/controllers/favoritos_services.py
from sqlalchemy.orm import Session
from app_wavesound.models.models import Favoritos, Canciones
from app_wavesound.schemas.Favorito import FavoritoCreate, FavoritoOut
from fastapi import HTTPException
from datetime import datetime
from sqlalchemy import func



def agregar_favorito(db: Session, id_usuario: int, favorito_data: FavoritoCreate) -> FavoritoOut:
    # Verificar si la canción existe
    cancion = db.query(Canciones).filter(Canciones.id_cancion == favorito_data.id_cancion).first()
    if not cancion:
        raise HTTPException(status_code=404, detail="Canción no encontrada")

    # Verificar si ya está en favoritos
    favorito_existente = db.query(Favoritos).filter(
        Favoritos.id_usuario == id_usuario,
        Favoritos.id_cancion == favorito_data.id_cancion
    ).first()

    if favorito_existente:
        raise HTTPException(status_code=400, detail="La canción ya está en tus favoritos")

    nuevo_favorito = Favoritos(
        id_usuario=id_usuario,
        id_cancion=favorito_data.id_cancion,
        fecha_agregado=datetime.now()
    )

    db.add(nuevo_favorito)
    db.commit()
    db.refresh(nuevo_favorito)
    return FavoritoOut.model_validate(nuevo_favorito)


def eliminar_favorito(db: Session, id_usuario: int, id_cancion: int):
    favorito = db.query(Favoritos).filter(
        Favoritos.id_usuario == id_usuario,
        Favoritos.id_cancion == id_cancion
    ).first()

    if not favorito:
        raise HTTPException(status_code=404, detail="Favorito no encontrado")

    db.delete(favorito)
    db.commit()
    return {"msg": "Canción eliminada de favoritos"}


def listar_favoritos_usuario(db: Session, id_usuario: int):
    favoritos = (
        db.query(Favoritos)
        .filter(Favoritos.id_usuario == id_usuario)
        .join(Canciones)
        .all()
    )

    resultado = []

    for f in favoritos:
        c = f.cancion
        u = c.usuario if c else None

        resultado.append({
            "id_favorito": f.id_favorito,
            "fecha_agregado": f.fecha_agregado,
            "cancion": {
                "id_cancion": c.id_cancion if c else None,
                "titulo": c.titulo if c else None,
                "archivo_url": c.archivo_url if c else None,
                "portada_url": c.portada_url if c else None,
                "duracion": c.duracion if c else None,
                "usuario": {
                    "id_usuario": u.id_usuario if u else None,
                    "nombre_usuario": u.nombre_usuario if u else None
                }
            }
        })

    return resultado




def obtener_likes_cancion(db: Session, id_cancion: int, id_usuario: int):
    # Total de likes
    total_likes = db.query(func.count(Favoritos.id_favorito)).filter(
        Favoritos.id_cancion == id_cancion
    ).scalar()

    # Si el usuario ya dio like
    mi_favorito = db.query(Favoritos).filter(
        Favoritos.id_cancion == id_cancion,
        Favoritos.id_usuario == id_usuario
    ).first() is not None

    return {"total_likes": total_likes, "mi_favorito": mi_favorito}
