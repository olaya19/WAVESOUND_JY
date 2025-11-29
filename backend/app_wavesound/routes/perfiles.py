from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from app_wavesound.db.database import get_db
from app_wavesound.controllers import perfil_service
from app_wavesound.schemas.Perfiles import PerfilCreate, PerfilOut
from app_wavesound.models.models import Usuarios
from app_wavesound.auth.auth import get_current_user
import os
import shutil

router = APIRouter(prefix="/perfiles", tags=["Perfiles"])


# ===============================
# CREAR PERFIL
# ===============================
@router.post("/", response_model=PerfilOut)
def crear_perfil(
    nombre_artista: str = Form(...),
    biografia: str = Form(...),
    genero_musical: str = Form(...),
    foto_perfil: UploadFile | None = File(None),
    db: Session = Depends(get_db),
    current_user: Usuarios = Depends(get_current_user)
):

    ruta_imagen = None

    if foto_perfil:
        ext = foto_perfil.filename.split(".")[-1].lower()
        if ext not in ["jpg", "jpeg", "png", "webp"]:
            raise HTTPException(status_code=400, detail="Formato no permitido")

        carpeta = "app_wavesound/static/perfiles"
        os.makedirs(carpeta, exist_ok=True)

        file_path = os.path.join(carpeta, foto_perfil.filename)
        with open(file_path, "wb") as f:
            shutil.copyfileobj(foto_perfil.file, f)

        ruta_imagen = f"static/perfiles/{foto_perfil.filename}"

    perfil_data = PerfilCreate(
        id_usuario=current_user.id_usuario,
        nombre_artista=nombre_artista,
        biografia=biografia,
        genero_musical=genero_musical,
        foto_perfil=ruta_imagen
    )

    return perfil_service.crear_perfil(db, perfil_data)


# ===============================
# OBTENER MI PERFIL
# ===============================
@router.get("/me", response_model=PerfilOut)
def obtener_mi_perfil(
    db: Session = Depends(get_db), 
    current_user: Usuarios = Depends(get_current_user)
):
    perfil = perfil_service.obtener_perfil(db, current_user.id_usuario)
    if not perfil:
        raise HTTPException(status_code=404, detail="Perfil no encontrado")
    return perfil


# ===============================
# EDITAR PERFIL
# ===============================
@router.put("/editar", response_model=PerfilOut)
def editar_perfil(
    db: Session = Depends(get_db),
    current_user: Usuarios = Depends(get_current_user),

    nombre_artista: str = Form(None),
    biografia: str = Form(None),
    genero_musical: str = Form(None),

    eliminar_foto: str = Form(None),
    foto_perfil: UploadFile | None = File(None)
):

    data = {}

    if nombre_artista:
        data["nombre_artista"] = nombre_artista

    if biografia:
        data["biografia"] = biografia

    if genero_musical:
        data["genero_musical"] = genero_musical

    # -------------------------
    # ELIMINAR FOTO
    # -------------------------
    if eliminar_foto == "1":
        data["foto_perfil"] = None

    # -------------------------
    # SUBIR FOTO NUEVA
    # -------------------------
    if foto_perfil:
        ext = foto_perfil.filename.split(".")[-1].lower()
        if ext not in ["jpg", "jpeg", "png", "webp"]:
            raise HTTPException(status_code=400, detail="Formato inválido")

        carpeta = "app_wavesound/static/perfiles"
        os.makedirs(carpeta, exist_ok=True)

        file_path = os.path.join(carpeta, foto_perfil.filename)
        with open(file_path, "wb") as f:
            shutil.copyfileobj(foto_perfil.file, f)

        data["foto_perfil"] = f"static/perfiles/{foto_perfil.filename}"

    perfil_actualizado = perfil_service.actualizar_perfil(
        db=db,
        id_usuario=current_user.id_usuario,
        data=data
    )

    if not perfil_actualizado:
        raise HTTPException(status_code=404, detail="Perfil no encontrado")

    return perfil_actualizado


# ===============================
# OBTENER PERFIL DE OTRO USUARIO
# ===============================
@router.get("/{id_usuario}")
def obtener_perfil_usuario(id_usuario: int, db: Session = Depends(get_db)):
    perfil = perfil_service.obtener_perfil_completo(db, id_usuario)
    if not perfil:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return perfil
