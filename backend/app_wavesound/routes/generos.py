from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app_wavesound.db.database import get_db
from app_wavesound.models.models import Generos

router = APIRouter(prefix="/generos", tags=["Géneros"])

@router.get("/")
def listar_generos(db: Session = Depends(get_db)):
    generos = db.query(Generos).all()
    return generos
