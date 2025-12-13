from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from sqlalchemy.orm import Session
from fastapi.responses import JSONResponse
from app_wavesound.db.database import get_db
from app_wavesound.auth.auth import get_current_user
from app_wavesound.models.models import Usuarios
from app_wavesound.controllers.perfil_service import (
    crear_perfil_service,
    obtener_perfil_completo,
    actualizar_perfil_service,
    eliminar_perfil_service
)
import json
import os

router = APIRouter(prefix="/perfiles", tags=["Perfiles"])


# ---------------------------------------------
#   Filtro básico de lenguaje ofensivo
# ---------------------------------------------
PALABRAS_OFENSIVAS = [
    "maldita", "basura", "hp", "gonorrea", "mierda",
    "estupido", "idiota", "asqueroso", "imbecil"
]

def contiene_lenguaje_ofensivo(texto: str) -> bool:
    texto = texto.lower()
    return any(p in texto for p in PALABRAS_OFENSIVAS)


# ---------------------------------------------
#   Crear perfil
# ---------------------------------------------
@router.post("/")
def crear_perfil(
    nombre_artista: str = Form(...),
    biografia: str = Form(...),
    generos_ids: str = Form(...),
    foto_perfil: UploadFile = File(None),
    db: Session = Depends(get_db),
    usuario_actual=Depends(get_current_user)
):
    generos_ids = json.loads(generos_ids)

    # Validación de lenguaje ofensivo
    if contiene_lenguaje_ofensivo(biografia):
        return JSONResponse(
            status_code=400,
            content={"detail": "El texto contiene lenguaje inapropiado."}
        )

    foto_path = None
    if foto_perfil:
        upload_dir = "app_wavesound/static/perfiles"
        os.makedirs(upload_dir, exist_ok=True)

        foto_path = f"static/perfiles/{usuario_actual.id_usuario}_{foto_perfil.filename}"

        with open(f"app_wavesound/{foto_path}", "wb") as buffer:
            buffer.write(foto_perfil.file.read())

    return crear_perfil_service(
        db=db,
        id_usuario=usuario_actual.id_usuario,
        nombre_artista=nombre_artista,
        biografia=biografia,
        generos_ids=generos_ids,
        foto_perfil=foto_path
    )


# ---------------------------------------------
#   Obtener mi perfil
# ---------------------------------------------
@router.get("/me")
def obtener_mi_perfil(
    db: Session = Depends(get_db),
    usuario_actual=Depends(get_current_user)
):
    perfil = obtener_perfil_completo(db, usuario_actual.id_usuario)

    if perfil is None:
        raise HTTPException(status_code=404, detail="El usuario no tiene un perfil creado")

    return perfil


# ---------------------------------------------
#   Editar perfil
# ---------------------------------------------
@router.put("/editar")
def editar_perfil(
    nombre_artista: str = Form(...),
    biografia: str = Form(...),
    generos_ids: str = Form(...),
    foto_perfil: UploadFile = File(None),
    db: Session = Depends(get_db),
    usuario_actual=Depends(get_current_user)
):
    generos_ids = json.loads(generos_ids)

    # Validación de lenguaje ofensivo
    if contiene_lenguaje_ofensivo(biografia):
        return JSONResponse(
            status_code=400,
            content={"detail": "El texto contiene lenguaje inapropiado."}
        )

    foto_path = None
    if foto_perfil:
        upload_dir = "app_wavesound/static/perfiles"
        os.makedirs(upload_dir, exist_ok=True)

        foto_path = f"static/perfiles/{usuario_actual.id_usuario}_{foto_perfil.filename}"

        with open(f"app_wavesound/{foto_path}", "wb") as buffer:
            buffer.write(foto_perfil.file.read())

    return actualizar_perfil_service(
        db=db,
        user_id=usuario_actual.id_usuario,
        nombre_artista=nombre_artista,
        biografia=biografia,
        generos_ids=generos_ids,
        foto_perfil=foto_path
    )


# ---------------------------------------------
#   Obtener perfil público
# ---------------------------------------------
@router.get("/{id_usuario}")
def obtener_perfil_publico(id_usuario: int, db: Session = Depends(get_db)):

    usuario = db.query(Usuarios).filter(Usuarios.id_usuario == id_usuario).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    perfil = obtener_perfil_completo(db, usuario.id_usuario)

    if perfil is None:
        raise HTTPException(status_code=404, detail="Perfil no encontrado")

    return perfil


# ---------------------------------------------
#   Eliminar perfil
# ---------------------------------------------
@router.delete("/eliminar")
def eliminar_perfil(
    db: Session = Depends(get_db),
    usuario_actual=Depends(get_current_user)
):
    return eliminar_perfil_service(db, usuario_actual.id_usuario)
