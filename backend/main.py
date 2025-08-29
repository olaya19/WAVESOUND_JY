from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from app_wavesound.db.database import get_db
from passlib.context import CryptContext



# Importa las funciones (controladores) de usuarios
from app_wavesound.controllers.user_data_services import registrar_usuario
from app_wavesound.schemas.Usuarios import UsuarioCreate, UsuarioOut
from app_wavesound.controllers.user_data_services import registrar_usuario, obtener_usuarios
from app_wavesound.models.models import Usuarios

import logging
logger = logging.getLogger("uvicorn.error")

app = FastAPI(
    title="WaveSound API",
    description="API para gestión de usuarios, canciones y derechos de autor.",
    version="1.0.0",
    debug=True
)


# ---------- Endpoints de Usuarios ----------
@app.post("/usuarios/", response_model=UsuarioOut, status_code=201)
def crear_usuario(user_data: UsuarioCreate, db: Session = Depends(get_db)):
    """Crear un nuevo usuario en la plataforma."""
    try:
        return registrar_usuario(db=db, datos_usuario=user_data)
    except HTTPException as e:
        raise e
    except Exception:
        raise HTTPException(status_code=500, detail="Error interno del servidor")

@app.post("/login/")
def login(email: str, contraseña: str, db: Session = Depends(get_db)):
    user = db.query(Usuarios).filter(Usuarios.email == email).first()
    if not user or not pwd_context.verify(contraseña, user.contraseña):
        raise HTTPException(status_code=401, detail="Credenciales inválidas")
    return {"id_usuario": user.id_usuario, "nombre_usuario": user.nombre_usuario, "rol": user.id_rol}

@app.get("/usuarios/", response_model=list[UsuarioOut])
def listar_usuarios(db: Session = Depends(get_db)):
    logger.info("Entró al endpoint /usuarios/")
    try:
        from app_wavesound.controllers.user_data_services import obtener_usuarios
        return obtener_usuarios(db=db)
    except Exception as e:
        logger.error(f"Error en listar_usuarios: {e}")
        raise HTTPException(status_code=500, detail=str(e))
