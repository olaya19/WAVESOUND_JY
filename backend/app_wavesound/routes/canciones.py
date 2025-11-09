from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app_wavesound.db.database import get_db
from app_wavesound.schemas.Canciones import CancionCreate, CancionOut, CancionBase
from app_wavesound.controllers import canciones_services
from app_wavesound.routes.auth import get_current_user

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
