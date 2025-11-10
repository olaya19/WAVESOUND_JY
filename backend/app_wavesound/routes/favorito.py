from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app_wavesound.db.database import get_db
from app_wavesound.schemas.Favorito import FavoritoCreate, FavoritoOut
from app_wavesound.controllers import favoritos_services
from app_wavesound.routes.auth import get_current_user

router = APIRouter(prefix="/favoritos", tags=["Favoritos"])

# Agregar canción a favoritos
@router.post("/", response_model=FavoritoOut)
def agregar_favorito(
    favorito: FavoritoCreate,
    db: Session = Depends(get_db),
    usuario_actual = Depends(get_current_user)
):
    return favoritos_services.agregar_favorito(db, usuario_actual.id_usuario, favorito)


# Eliminar canción de favoritos
@router.delete("/{id_cancion}")
def eliminar_favorito(
    id_cancion: int,
    db: Session = Depends(get_db),
    usuario_actual = Depends(get_current_user)
):
    return favoritos_services.eliminar_favorito(db, usuario_actual.id_usuario, id_cancion)


# Listar favoritos del usuario
@router.get("/", response_model=List[FavoritoOut])
def listar_favoritos(
    db: Session = Depends(get_db),
    usuario_actual = Depends(get_current_user)
):
    return favoritos_services.listar_favoritos_usuario(db, usuario_actual.id_usuario)

@router.get("/likes/{id_cancion}")
def get_likes_cancion(id_cancion: int, db: Session = Depends(get_db), usuario_actual = Depends(get_current_user)):
    return favoritos_services.obtener_likes_cancion(db, id_cancion, usuario_actual.id_usuario)
