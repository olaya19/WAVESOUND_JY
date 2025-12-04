from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from app_wavesound.db.database import get_db
from app_wavesound.auth.auth import get_current_user
from app_wavesound.controllers.perfil_service import (
    crear_perfil_service,
    obtener_perfil_completo,
    actualizar_perfil_service,
    eliminar_perfil_service
)
import os

router = APIRouter(prefix="/perfiles", tags=["Perfiles"])

UPLOAD_DIR = "static/perfiles"
os.makedirs(UPLOAD_DIR, exist_ok=True)


# ============================================================
# CREAR PERFIL — FRONT usa: POST /perfiles/
# ============================================================
@router.post("/")
def crear_perfil(
    nombre_artista: str = Form(...),
    biografia: str = Form(...),
    generos: str = Form(...),     # "1,2,3"
    foto: UploadFile = File(None),
    usuario_actual=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    foto_path = None

    # Guardar foto si viene
    if foto:
        ext = foto.filename.split(".")[-1]
        filename = f"{usuario_actual.id_usuario}_perfil.{ext}"
        foto_path = os.path.join(UPLOAD_DIR, filename)

        with open(foto_path, "wb") as f:
            f.write(foto.file.read())

        foto_path = foto_path.replace("\\", "/")

    generos_ids = [int(g.strip()) for g in generos.split(",")]

    return crear_perfil_service(
        db=db,
        id_usuario=usuario_actual.id_usuario,
        nombre_artista=nombre_artista,
        biografia=biografia,
        generos_ids=generos_ids,
        foto_perfil=foto_path
    )


# ============================================================
# OBTENER MI PERFIL — FRONT usa: GET /perfiles/me
# ============================================================
@router.get("/me")
def obtener_mi_perfil(usuario_actual=Depends(get_current_user), db: Session = Depends(get_db)):
    perfil = obtener_perfil_completo(db, user_id=usuario_actual.id_usuario)
    if not perfil:
        raise HTTPException(status_code=404, detail="No tienes perfil creado")
    return perfil


# ============================================================
#  EDITAR PERFIL — FRONT usa: PUT /perfiles/editar
# ============================================================
@router.put("/editar")
def editar_perfil(
    nombre_artista: str = Form(None),
    biografia: str = Form(None),
    generos: str = Form(None),  # formato: "1,2,3"
    foto: UploadFile = File(None),
    usuario_actual=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    foto_path = None

    if foto:
        ext = foto.filename.split(".")[-1]
        filename = f"{usuario_actual.id_usuario}_perfil.{ext}"
        foto_path = os.path.join(UPLOAD_DIR, filename)

        with open(foto_path, "wb") as f:
            f.write(foto.file.read())

        foto_path = foto_path.replace("\\", "/")

    generos_ids = None
    if generos:
        generos_ids = [int(g.strip()) for g in generos.split(",")]

    return actualizar_perfil_service(
        db=db,
        user_id=usuario_actual.id_usuario,
        nombre_artista=nombre_artista,
        biografia=biografia,
        generos_ids=generos_ids,
        foto_perfil=foto_path
    )


# ============================================================
#  OBTENER PERFIL PÚBLICO — FRONT usa: GET /perfiles/{id}
# ============================================================
@router.get("/{id_usuario}")
def obtener_perfil_publico(id_usuario: int, db: Session = Depends(get_db)):
    perfil = obtener_perfil_completo(db, user_id=id_usuario)
    if not perfil:
        raise HTTPException(status_code=404, detail="Perfil no encontrado")
    return perfil
