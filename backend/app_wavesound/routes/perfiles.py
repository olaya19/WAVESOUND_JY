from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from app_wavesound.db.database import get_db
from app_wavesound.controllers import perfil_service
from app_wavesound.schemas.Perfiles import PerfilCreate, PerfilOut
from app_wavesound.models.models import Usuarios
from app_wavesound.auth.auth import get_current_user
import os

router = APIRouter(prefix="/perfiles", tags=["Perfiles"])

@router.post("/", response_model=PerfilOut)
def crear_perfil(perfil_data: PerfilCreate, db: Session = Depends(get_db)):
    return perfil_service.crear_perfil(db, perfil_data)

@router.get("/me", response_model=PerfilOut)
def obtener_mi_perfil(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    perfil = perfil_service.obtener_perfil(db, current_user.id_usuario)  # 👈 cambio aquí
    if not perfil:
        raise HTTPException(status_code=404, detail="Perfil no encontrado")
    return perfil


@router.put("/editar", response_model=PerfilOut)
def editar_perfil(
    db: Session = Depends(get_db),
    current_user: Usuarios = Depends(get_current_user),
    nombre_artista: str = Form(None),
    biografia: str = Form(None),
    genero_musical: str = Form(None),
    foto_perfil: UploadFile | None = File(None)
):
    data = {}

    # 🔹 Agregar campos si vienen en el formulario
    if nombre_artista:
        data["nombre_artista"] = nombre_artista
    if biografia:
        data["biografia"] = biografia
    if genero_musical:
        data["genero_musical"] = genero_musical

    # 🔹 Guardar imagen si se sube una nueva
    if foto_perfil:
        carpeta_destino = "app_wavesound/static/perfiles"
        os.makedirs(carpeta_destino, exist_ok=True)

        file_path = os.path.join(carpeta_destino, foto_perfil.filename)
        with open(file_path, "wb") as f:
            f.write(foto_perfil.file.read())

        # ✅ Ruta pública accesible desde el frontend
        data["foto_perfil"] = f"static/perfiles/{foto_perfil.filename}"

    # 🔹 Actualizar el perfil en la base de datos
    perfil_actualizado = perfil_service.actualizar_perfil(
        db=db,
        id_usuario=current_user.id_usuario,  # usa el campo real del modelo
        data=data
    )

    if not perfil_actualizado:
        raise HTTPException(status_code=404, detail="Perfil no encontrado")

    return perfil_actualizado

@router.get("/{id_usuario}")
def obtener_perfil_usuario(id_usuario: int, db: Session = Depends(get_db)):
    perfil = perfil_service.obtener_perfil_completo(db, id_usuario)
    if not perfil:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return perfil
