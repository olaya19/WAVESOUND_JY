from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app_wavesound.db.database import get_db
from app_wavesound.schemas.Canciones import CancionCreate, CancionOut, CancionBase
from app_wavesound.schemas.Albumes import AlbumOut
from app_wavesound.controllers import canciones_services

from app_wavesound.auth.auth import get_current_user
from app_wavesound.controllers import albumes_services

router = APIRouter(prefix="/canciones", tags=["Canciones"])

# -----------------------
# Crear canción
# -----------------------
@router.post("/", response_model=CancionOut)
def crear_cancion(
    cancion: CancionCreate,
    db: Session = Depends(get_db),
    usuario_actual=Depends(get_current_user)
):
    cancion.id_usuario = usuario_actual.id_usuario
    return canciones_services.crear_cancion(db, cancion)


# -----------------------
# Listar todas las canciones (autenticado)
# -----------------------
@router.get("/", response_model=List[CancionOut])
def listar_canciones(
    db: Session = Depends(get_db),
    usuario_actual=Depends(get_current_user)
):
    return canciones_services.obtener_canciones(db)


# -----------------------
# Listar canciones públicas (sin token)
# -----------------------
@router.get("/public", response_model=List[CancionOut])
def listar_publicas(db: Session = Depends(get_db)):
    return canciones_services.obtener_canciones_publicas(db)


# -----------------------
# Listar canciones por usuario
# -----------------------
@router.get("/usuario/{id_usuario}", response_model=List[CancionOut])
def listar_por_usuario(id_usuario: int, db: Session = Depends(get_db)):
    return canciones_services.obtener_canciones_por_usuario(db, id_usuario)


# -----------------------
# Obtener canción por ID (registra reproducción automáticamente)
# -----------------------
@router.get("/{id_cancion}", response_model=CancionOut)
def obtener_cancion(
    id_cancion: int,
    db: Session = Depends(get_db),
    usuario_actual=Depends(get_current_user)
):
    cancion = canciones_services.obtener_cancion(db, id_cancion)
    if not cancion:
        raise HTTPException(status_code=404, detail="Canción no encontrada")

    # ✅ Registrar reproducción
    canciones_services.registrar_reproduccion(db, id_cancion, usuario_actual.id_usuario)

    return cancion


# -----------------------
# Actualizar canción
# -----------------------
@router.put("/{id_cancion}", response_model=CancionOut)
def actualizar_cancion(
    id_cancion: int,
    datos: CancionBase,
    db: Session = Depends(get_db),
    usuario_actual=Depends(get_current_user)
):
    cancion = canciones_services.actualizar_cancion(db, id_cancion, datos)
    if not cancion:
        raise HTTPException(status_code=404, detail="Canción no encontrada")
    return cancion

# -----------------------
# asignar canción a álbum
# -----------------------
@router.put("/{id_cancion}/asignar-album/{id_album}")
def asignar_cancion_a_album(
    id_cancion: int,
    id_album: int,
    db: Session = Depends(get_db),
    usuario_actual=Depends(get_current_user)
):
    cancion = canciones_services.obtener_cancion(db, id_cancion)

    if not cancion:
        raise HTTPException(status_code=404, detail="Canción no encontrada")

    cancion.id_album = id_album
    db.commit()
    db.refresh(cancion)

    return {"msg": f"Canción {id_cancion} asignada al álbum {id_album}"}


# -----------------------
# Eliminar canción
# -----------------------
@router.delete("/{id_cancion}")
def eliminar_cancion(
    id_cancion: int,
    db: Session = Depends(get_db),
    usuario_actual=Depends(get_current_user)
):
    cancion = canciones_services.eliminar_cancion(db, id_cancion)
    if not cancion:
        raise HTTPException(status_code=404, detail="Canción no encontrada")
    return {"msg": f"Canción {id_cancion} eliminada correctamente"}

# -----------------------
# Eliminar canción de álbum
# -----------------------
@router.delete("/{album_id}/canciones/{cancion_id}", response_model=AlbumOut)
def remove_song_from_album(
    album_id: int,
    cancion_id: int,
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user)
):
    album, error = albumes_services.remove_cancion_from_album(db, album_id, cancion_id)

    if error:
        raise HTTPException(status_code=400, detail=error)

    return album


# -----------------------
# Obtener canciones más reproducidas
# -----------------------
@router.get("/top", response_model=List[dict])
def obtener_top_canciones(db: Session = Depends(get_db)):
    return canciones_services.obtener_top_canciones(db)


# -----------------------
# Obtener total de reproducciones por canción
# -----------------------
@router.get("/{id_cancion}/reproducciones", response_model=dict)
def obtener_reproducciones_cancion(id_cancion: int, db: Session = Depends(get_db)):
    total = canciones_services.obtener_total_reproducciones(db, id_cancion)
    return {"id_cancion": id_cancion, "total_reproducciones": total}
