from sqlalchemy.orm import Session
from app_wavesound.models.models import Favoritos, Canciones
from app_wavesound.schemas.Favorito import FavoritoCreate, FavoritoOut
from fastapi import HTTPException
from datetime import datetime

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
    fecha_agregado=datetime.now()  # <-- asigna la fecha aquí
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
    favoritos = db.query(Favoritos).filter(Favoritos.id_usuario == id_usuario).all()
    return [FavoritoOut.model_validate(f) for f in favoritos]
