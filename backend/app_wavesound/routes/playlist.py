from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app_wavesound.db.database import get_db

from app_wavesound.controllers.playlist_services import crear_playlist, obtener_playlists_por_usuario, obtener_playlist_por_id, agregar_cancion_a_playlist, eliminar_cancion_de_playlist, eliminar_playlist


router = APIRouter(prefix="/playlists", tags=["Playlists"])


# ================================================
#   CREAR PLAYLIST
# ================================================
@router.post("/")
def crear_lista(
    id_usuario: int,
    nombre: str,
    descripcion: str = "",
    privada: bool = False,
    db: Session = Depends(get_db)
):
    return crear_playlist(db, id_usuario, nombre, descripcion, privada)


# ================================================
#   OBTENER PLAYLISTS DEL USUARIO
# ================================================
@router.get("/usuario/{id_usuario}")
def listas_por_usuario(id_usuario: int, db: Session = Depends(get_db)):
    return obtener_playlists_por_usuario(db, id_usuario)


# ================================================
#   OBTENER PLAYLIST POR ID
# ================================================
@router.get("/{id_lista}")
def obtener_lista(id_lista: int, db: Session = Depends(get_db)):
    return obtener_playlist_por_id(db, id_lista)


# ================================================
#   AGREGAR CANCIÓN A LA PLAYLIST
# ================================================
@router.post("/{id_lista}/agregar-cancion")
def agregar_cancion(
    id_lista: int,
    id_cancion: int,
    orden: int = 0,
    db: Session = Depends(get_db)
):
    return agregar_cancion_a_playlist(db, id_lista, id_cancion, orden)


# ================================================
#   ELIMINAR CANCIÓN DE LA PLAYLIST
# ================================================
@router.delete("/{id_lista}/eliminar-cancion/{id_cancion}")
def eliminar_cancion(id_lista: int, id_cancion: int, db: Session = Depends(get_db)):
    return eliminar_cancion_de_playlist(db, id_lista, id_cancion)


# ================================================
#   ELIMINAR PLAYLIST COMPLETA
# ================================================
@router.delete("/{id_lista}")
def borrar_playlist(id_lista: int, db: Session = Depends(get_db)):
    return eliminar_playlist(db, id_lista)
