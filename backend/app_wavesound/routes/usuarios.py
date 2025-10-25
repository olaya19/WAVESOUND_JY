from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app_wavesound.db.database import get_db
from app_wavesound.schemas.Usuarios import UsuarioCreate, UsuarioOut, PerfilUsuarioOut
from app_wavesound.controllers.user_data_services import registrar_usuario, obtener_usuarios, autenticar_usuario
from app_wavesound.routes.auth import create_access_token, logout, get_current_user
from app_wavesound.controllers.perfil_service import obtener_perfil_completo
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

    # 🔐 Generar token con el ID del usuario
    token = create_access_token(data={"sub": str(user.id_usuario)})

    # ✅ Devolver también el ID para el frontend
    return {
        "access_token": token,
        "token_type": "bearer",
        "id_usuario": user.id_usuario,  # 👈 AÑADIDO
        "nombre_usuario": user.nombre_usuario,
        "id_rol": user.id_rol
    }


@router.post("/logout")
def cerrar_sesion(response = Depends(logout)):
    return response

# -----------------------
# Listado de usuarios
# -----------------------
@router.get("/", response_model=list[UsuarioOut])
def listar_usuarios(db: Session = Depends(get_db)):
    return obtener_usuarios(db)

# -----------------------
# Perfil Usuario
# -----------------------
@router.get("/perfil", response_model=PerfilUsuarioOut)
def obtener_perfil(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Devuelve el perfil completo del usuario autenticado, con sus canciones,
    álbumes y estadísticas.
    """
    perfil = obtener_perfil_completo(db, current_user)
    if not perfil:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return perfil


