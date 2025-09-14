from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import or_
from app_wavesound.db.database import get_db
from app_wavesound.models.models import Usuarios
from app_wavesound.schemas.Usuarios import UsuarioCreate, UsuarioOut
from app_wavesound.controllers.user_data_services import registrar_usuario, obtener_usuarios, autenticar_usuario
from app_wavesound.routes.auth import verify_password, create_access_token
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter(prefix="/usuarios", tags=["Usuarios"])

@router.post("/register", response_model=UsuarioOut)
def register(user_data: UsuarioCreate, db: Session = Depends(get_db)):
    return registrar_usuario(db, user_data)

@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    # Buscar usuario por email o nickname
    user = db.query(Usuarios).filter(
        or_(Usuarios.email == form_data.username, Usuarios.nickname == form_data.username)
    ).first()

    if not user or not verify_password(form_data.password, user.contraseña):
        raise HTTPException(status_code=401, detail="Credenciales inválidas")
    
    token = create_access_token(data={"sub": str(user.id_usuario)})
    return {"access_token": token, "token_type": "bearer"}