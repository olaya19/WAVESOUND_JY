from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app_wavesound.db.database import get_db
from app_wavesound.auth.auth import get_current_user
from app_wavesound.controllers import seguidores_services

router = APIRouter(prefix="/seguidores", tags=["Seguidores"])


@router.post("/seguir/{usuario_id}")
def seguir(usuario_id: int, db: Session = Depends(get_db), current=Depends(get_current_user)):
    data, error = seguidores_services.seguir_usuario(db, current["id_usuario"], usuario_id)

    if error:
        raise HTTPException(status_code=400, detail=error)

    return {"mensaje": "Ahora sigues al usuario"}


@router.delete("/seguir/{usuario_id}")
def dejar_de_seguir(usuario_id: int, db: Session = Depends(get_db), current=Depends(get_current_user)):
    data, error = seguidores_services.dejar_de_seguir(db, current["id_usuario"], usuario_id)

    if error:
        raise HTTPException(status_code=400, detail=error)

    return {"mensaje": "Has dejado de seguir al usuario"}


@router.get("/mis_seguidores")
def mis_seguidores(db: Session = Depends(get_db), current=Depends(get_current_user)):
    return seguidores_services.obtener_seguidores(db, current["id_usuario"])


@router.get("/mis_seguidos")
def mis_seguidos(db: Session = Depends(get_db), current=Depends(get_current_user)):
    return seguidores_services.obtener_seguidos(db, current["id_usuario"])


@router.get("/sugerencias")
def sugerencias_usuarios(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return seguidores_services.obtener_sugerencias_de_usuarios(db, current_user["id_usuario"])
