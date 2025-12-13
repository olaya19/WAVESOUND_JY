from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from typing import List

from app_wavesound.db.database import get_db
from app_wavesound.auth.auth import get_current_user

from app_wavesound.schemas.Derechos_De_Autor import DerechoAutorCreate, DerechoAutorOut
from app_wavesound.schemas.Documento_De_Autor import DocumentoDerechoAutorOut

from app_wavesound.controllers import derechos_autor_services

router = APIRouter(prefix="/derechos-autor", tags=["Derechos de Autor"])


# CREAR REGISTRO
@router.post("/", response_model=DerechoAutorOut)
def crear_registro_derecho_autor(
    datos: DerechoAutorCreate,
    db: Session = Depends(get_db),
    usuario_actual=Depends(get_current_user)
):
    if datos.id_usuario_autor != usuario_actual.id_usuario:
        raise HTTPException(status_code=403, detail="No autorizado para crear este registro")

    return derechos_autor_services.crear_registro(db, datos)


# SUBIR DOCUMENTO MANUAL
@router.post("/documento", response_model=DocumentoDerechoAutorOut)
async def subir_documento(
    id_registro: int,
    tipo_documento: str,
    archivo: UploadFile = File(...),
    db: Session = Depends(get_db),
    usuario_actual=Depends(get_current_user)
):
    return await derechos_autor_services.subir_documento(db, id_registro, tipo_documento, archivo)


# GENERAR CERTIFICADO AUTOMÁTICO
@router.post("/generar-certificado/{id_registro}", response_model=DocumentoDerechoAutorOut)
def generar_certificado_endpoint(   # <-- quitar async
    id_registro: int,
    db: Session = Depends(get_db),
    usuario_actual=Depends(get_current_user)
):
    registro = db.query(derechos_autor_services.Derechos_Autor).filter(
        derechos_autor_services.Derechos_Autor.id_registro == id_registro
    ).first()

    if not registro:
        raise HTTPException(status_code=404, detail="Registro no encontrado")

    if registro.id_usuario_autor != usuario_actual.id_usuario:
        raise HTTPException(status_code=403, detail="No autorizado para generar este certificado")

    # Quitar await aquí
    return derechos_autor_services.generar_certificado(db, id_registro)


# OBTENER REGISTROS DE UN USUARIO
@router.get("/usuario/{id_usuario}", response_model=List[DerechoAutorOut])
def obtener_registros_usuario(id_usuario: int, db: Session = Depends(get_db)):
    return derechos_autor_services.obtener_registros_usuario(db, id_usuario)


# OBTENER DOCUMENTOS DE UN REGISTRO
@router.get("/documentos/{id_registro}", response_model=List[DocumentoDerechoAutorOut])
def obtener_documentos(id_registro: int, db: Session = Depends(get_db)):
    return derechos_autor_services.obtener_documentos(db, id_registro)


# DESCARGAR DOCUMENTO
@router.get("/documento/{id_documento}/descargar")
def descargar_documento(id_documento: int, db: Session = Depends(get_db)):
    return derechos_autor_services.descargar_documento(db, id_documento)