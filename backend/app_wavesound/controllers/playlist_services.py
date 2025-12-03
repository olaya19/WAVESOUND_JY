from sqlalchemy.orm import Session
from app_wavesound.models.models import  Listas_Reproducciones, Lista_Canciones, Canciones
from fastapi import HTTPException


# ============================================================
#   CREAR PLAYLIST
# ============================================================
def crear_playlist(db: Session, id_usuario: int, nombre: str, descripcion: str = "", privada: bool = False):
    nueva_lista = Listas_Reproducciones(
        id_usuario=id_usuario,
        nombre_lista=nombre,
        descripcion=descripcion,
        privada=privada
    )

    db.add(nueva_lista)
    db.commit()
    db.refresh(nueva_lista)

    return nueva_lista


# ============================================================
#   OBTENER PLAYLISTS DEL USUARIO
# ============================================================
def obtener_playlists_por_usuario(db: Session, id_usuario: int):
    return db.query(Listas_Reproducciones).filter(Listas_Reproducciones.id_usuario == id_usuario).all()


# ============================================================
#   OBTENER UNA PLAYLIST POR ID
# ============================================================
def obtener_playlist_por_id(db: Session, id_lista: int):
    playlist = db.query(Listas_Reproducciones).filter(Listas_Reproducciones.id_lista == id_lista).first()

    if not playlist:
        raise HTTPException(status_code=404, detail="Playlist no encontrada")

    return playlist


# ============================================================
#   AGREGAR CANCIÓN A UNA PLAYLIST
# ============================================================
def agregar_cancion_a_playlist(db: Session, id_lista: int, id_cancion: int, orden: int = 0):
    # Verificar playlist
    playlist = obtener_playlist_por_id(db, id_lista)

    # Verificar canción
    cancion = db.query(Canciones).filter(Canciones.id_cancion == id_cancion).first()
    if not cancion:
        raise HTTPException(status_code=404, detail="Canción no encontrada")

    # Evitar duplicados
    existente = db.query(Lista_Canciones).filter(
        Lista_Canciones.id_lista == id_lista,
        Lista_Canciones.id_cancion == id_cancion
    ).first()

    if existente:
        raise HTTPException(status_code=400, detail="La canción ya está en la playlist")

    item = Lista_Canciones(
        id_lista=id_lista,
        id_cancion=id_cancion,
        orden=orden
    )

    db.add(item)
    db.commit()

    return {"mensaje": "Canción agregada correctamente"}


# ============================================================
#   ELIMINAR CANCIÓN DE LA PLAYLIST
# ============================================================
def eliminar_cancion_de_playlist(db: Session, id_lista: int, id_cancion: int):
    item = db.query(Lista_Canciones).filter(
        Lista_Canciones.id_lista == id_lista,
        Lista_Canciones.id_cancion == id_cancion
    ).first()

    if not item:
        raise HTTPException(status_code=404, detail="La canción no está en la playlist")

    db.delete(item)
    db.commit()

    return {"mensaje": "Canción eliminada correctamente"}


# ============================================================
#   ELIMINAR PLAYLIST COMPLETA
# ============================================================
def eliminar_playlist(db: Session, id_lista: int):
    playlist = obtener_playlist_por_id(db, id_lista)

    db.delete(playlist)
    db.commit()

    return {"mensaje": "Playlist eliminada correctamente"}
