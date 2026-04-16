from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app_wavesound.db.database import get_db
from app_wavesound.controllers import admin_service

router = APIRouter(prefix="/admin", tags=["Admin"])

@router.get("/usuarios")
def obtener_usuarios_admin(db: Session = Depends(get_db)):
    return admin_service.obtener_usuarios_admin(db) 