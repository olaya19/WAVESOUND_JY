from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from app_wavesound.db.database import get_db



# Importa las funciones (controladores) de usuarios
from app_wavesound.controllers.user_data_services import registrar_usuario
from app_wavesound.schemas.Usuarios import UsuarioCreate, UsuarioOut
from app_wavesound.controllers.user_data_services import registrar_usuario, obtener_usuarios

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


@app.get("/usuarios/", response_model=list[UsuarioOut])
def listar_usuarios(db: Session = Depends(get_db)):
    logger.info("Entró al endpoint /usuarios/")
    try:
        from app_wavesound.controllers.user_data_services import obtener_usuarios
        return obtener_usuarios(db=db)
    except Exception as e:
        logger.error(f"Error en listar_usuarios: {e}")
        raise HTTPException(status_code=500, detail=str(e))
