from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app_wavesound.db.database import get_db
from app_wavesound.models.models import Usuarios
from app_wavesound.auth.auth import create_access_token

router = APIRouter(prefix="/google", tags=["Google Auth"])

class GoogleLoginSchema(BaseModel):
    email: str
    nombre_usuario: str
    picture: str | None = None

@router.post("/login")
def login_google(data: GoogleLoginSchema, db: Session = Depends(get_db)):
    usuario = db.query(Usuarios).filter(Usuarios.email == data.email).first()

    if not usuario:
        usuario = Usuarios(
            email=data.email,
            nombre_usuario=data.nombre_usuario,
            nickname=data.email.split("@")[0],
            contraseña="GOOGLE_ACCOUNT",
            id_rol=3
        )
        db.add(usuario)
        db.commit()
        db.refresh(usuario)

    token = create_access_token({"sub": str(usuario.id_usuario)})

    return {
        "access_token": token,
        "token_type": "bearer",
        "id_usuario": usuario.id_usuario,
        "nombre_usuario": usuario.nombre_usuario,
        "id_rol": usuario.id_rol
    }
