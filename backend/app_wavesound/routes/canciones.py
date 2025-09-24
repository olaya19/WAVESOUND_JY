from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app_wavesound.db.database import get_db
from app_wavesound.schemas.Canciones import CancionCreate, CancionOut, CancionBase
from app_wavesound.controllers import canciones_services
from app_wavesound.routes.auth import get_current_user  # 🔒 Protección con token

router = APIRouter(prefix="/canciones", tags=["Canciones"])

@router.post("/", response_model=CancionOut)
def crear(cancion: CancionCreate, db: Session = Depends(get_db), usuario_id: int = Depends(get_current_user)):
    # 👇 aseguramos que el usuario autenticado sea quien sube la canción
    cancion.id_usuario = usuario_id
    return canciones_services.crear_cancion(db, cancion)

@router.get("/", response_model=List[CancionOut])
def listar(db: Session = Depends(get_db), usuario_id: int = Depends(get_current_user)):
    return canciones_services.obtener_canciones(db)


@router.get("/public", response_model=List[CancionOut])
def listar_publico(db: Session = Depends(get_db)):
    # 👈 Sin token, devuelve todas las canciones disponibles
    return canciones_services.obtener_canciones(db)

@router.get("/{id_cancion}", response_model=CancionOut)
def obtener(id_cancion: int, db: Session = Depends(get_db), usuario_id: int = Depends(get_current_user)):
    cancion = canciones_services.obtener_cancion(db, id_cancion)
    if not cancion:
        raise HTTPException(status_code=404, detail="Canción no encontrada")
    return cancion


@router.put("/{id_cancion}", response_model=CancionOut)
def actualizar(id_cancion: int, datos: CancionBase, db: Session = Depends(get_db), usuario_id: int = Depends(get_current_user)):
    cancion = canciones_services.actualizar_cancion(db, id_cancion, datos)
    if not cancion:
        raise HTTPException(status_code=404, detail="Canción no encontrada")
    return cancion

@router.delete("/{id_cancion}")
def eliminar(id_cancion: int, db: Session = Depends(get_db), usuario_id: int = Depends(get_current_user)):
    cancion = canciones_services.eliminar_cancion(db, id_cancion)
    if not cancion:
        raise HTTPException(status_code=404, detail="Canción no encontrada")
    return {"msg": f"Canción {id_cancion} eliminada correctamente"}
