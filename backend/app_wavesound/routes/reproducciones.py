from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app_wavesound.db.database import get_db
from app_wavesound.schemas.Reproducciones import ReproduccionCreate, ReproduccionOut
from app_wavesound.controllers import reproducciones_service

router = APIRouter(prefix="/reproducciones", tags=["Reproducciones"])

@router.post("/", response_model=ReproduccionOut)
def registrar_reproduccion(datos: ReproduccionCreate, db: Session = Depends(get_db)):
    return reproducciones_service.registrar_reproduccion(db, datos)

@router.get("/", response_model=list[ReproduccionOut])
def obtener_reproducciones(db: Session = Depends(get_db)):
    return reproducciones_service.obtener_reproducciones(db)

@router.get("/cancion/{id_cancion}/total", response_model=int)
def obtener_total_reproducciones(id_cancion: int, db: Session = Depends(get_db)):
    return reproducciones_service.contar_reproducciones_cancion(db, id_cancion)

@router.get("/top", response_model=list[dict])
def obtener_top_reproducciones(db: Session = Depends(get_db), limite: int = 10):
    return reproducciones_service.canciones_mas_reproducidas(db, limite)
