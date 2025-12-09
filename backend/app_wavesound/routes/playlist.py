from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app_wavesound.db.database import get_db
from app_wavesound.controllers.playlist_services import (
    crear_playlist,
    obtener_playlists_por_usuario,
    obtener_playlist_por_id,
    agregar_cancion_a_playlist,
    eliminar_cancion_de_playlist,
    eliminar_playlist
)
from app_wavesound.models.models import Lista_Canciones, Canciones
from pydantic import BaseModel

router = APIRouter(prefix="/playlists", tags=["Playlists"])


class PlaylistCreate(BaseModel):
    id_usuario: int
    nombre: str
    descripcion: str = ""
    privada: bool = False


class AgregarCancion(BaseModel):
    id_cancion: int
    orden: int = 0


@router.post("/")
def crear_lista(playlist: PlaylistCreate, db: Session = Depends(get_db)):
    return crear_playlist(
        db,
        playlist.id_usuario,
        playlist.nombre,
        playlist.descripcion,
        playlist.privada
    )


@router.get("/usuario/{id_usuario}")
def listas_por_usuario(id_usuario: int, db: Session = Depends(get_db)):
    return obtener_playlists_por_usuario(db, id_usuario)


@router.get("/{id_lista}")
def obtener_lista(id_lista: int, db: Session = Depends(get_db)):
    return obtener_playlist_por_id(db, id_lista)


@router.get("/{id_lista}/canciones")
def obtener_canciones_playlist(id_lista: int, db: Session = Depends(get_db)):
    playlist = obtener_playlist_por_id(db, id_lista)

    canciones = (
        db.query(Lista_Canciones, Canciones)
        .join(Canciones, Lista_Canciones.id_cancion == Canciones.id_cancion)
        .filter(Lista_Canciones.id_lista == id_lista)
        .all()
    )

    return [
        {
            "id_cancion": cancion.id_cancion,
            "titulo": cancion.titulo,
            "archivo_url": cancion.archivo_url,
            "portada_url": cancion.portada_url
        }
        for lc, cancion in canciones
    ]


@router.post("/{id_lista}/agregar-cancion")
def agregar_cancion(id_lista: int, cancion: AgregarCancion, db: Session = Depends(get_db)):
    return agregar_cancion_a_playlist(db, id_lista, cancion.id_cancion, cancion.orden)


@router.delete("/{id_lista}/eliminar-cancion/{id_cancion}")
def eliminar_cancion(id_lista: int, id_cancion: int, db: Session = Depends(get_db)):
    return eliminar_cancion_de_playlist(db, id_lista, id_cancion)


@router.delete("/{id_lista}")
def borrar_playlist(id_lista: int, db: Session = Depends(get_db)):
    return eliminar_playlist(db, id_lista)
