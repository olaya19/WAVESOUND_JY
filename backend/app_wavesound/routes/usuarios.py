from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app_wavesound.db.database import get_db
from app_wavesound.schemas.Usuarios import UsuarioCreate, UsuarioOut
from app_wavesound.controllers.user_data_services import registrar_usuario, obtener_usuarios, autenticar_usuario
from app_wavesound.routes.auth import create_access_token, logout
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter(prefix="/usuarios", tags=["Usuarios"])

# -----------------------
# Registro de usuario
# -----------------------
@router.post("/register", response_model=UsuarioOut)
def register(user_data: UsuarioCreate, db: Session = Depends(get_db)):
    return registrar_usuario(db, user_data)

# -----------------------
# Login de usuario
# -----------------------
@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    # Autenticar con email o nickname
    user = autenticar_usuario(db, form_data.username, form_data.password)

    if not user:
        raise HTTPException(status_code=401, detail="Credenciales inválidas")
    
    token = create_access_token(data={"sub": str(user.id_usuario)})
    return {"access_token": token, "token_type": "bearer"}

@router.post("/logout")
def cerrar_sesion(response = Depends(logout)):
    return response

# -----------------------
# Listado de usuarios
# -----------------------
@router.get("/", response_model=list[UsuarioOut])
def listar_usuarios(db: Session = Depends(get_db)):
    return obtener_usuarios(db)
