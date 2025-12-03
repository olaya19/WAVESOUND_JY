from fastapi import APIRouter, Depends, HTTPException , UploadFile , File
from sqlalchemy.orm import Session
from typing import List
from app_wavesound.db.database import get_db
from app_wavesound.auth.auth import get_current_user
from app_wavesound.schemas.Derechos_De_Autor import DerechoAutorCreate, DerechoAutorOut
from app_wavesound.schemas.Documento_De_Autor import DocumentoDerechoAutorOut
from app_wavesound.controllers import derechos_autor_services

router = APIRouter(prefix="/derechos-autor", tags=["Derechos de Autor"])

# Crear registro
@router.post("/", response_model=DerechoAutorOut)
def crear_registro_derecho_autor(
    datos: DerechoAutorCreate,
    db: Session = Depends(get_db),
    usuario_actual=Depends(get_current_user)
):
    if datos.id_usuario_autor != usuario_actual.id_usuario:
        raise HTTPException(status_code=403, detail="No autorizado")
    return derechos_autor_services.crear_registro(db, datos)

# Subir documento manual (opcional)
@router.post("/documento", response_model=DocumentoDerechoAutorOut)
async def subir_documento(
    id_registro: int,
    tipo_documento: str,
    archivo: UploadFile,
    db: Session = Depends(get_db),
    usuario_actual=Depends(get_current_user)
):
    return await derechos_autor_services.subir_documento(db, id_registro, tipo_documento, archivo)

# Generar certificado automáticamente
@router.post("/generar-certificado/{id_registro}", response_model=DocumentoDerechoAutorOut)
async def generar_certificado_endpoint(
    id_registro: int,
    db: Session = Depends(get_db),
    usuario_actual=Depends(get_current_user)
):
    registro = db.query(derechos_autor_services.Derechos_Autor).filter(
        derechos_autor_services.Derechos_Autor.id_registro == id_registro
    ).first()
    if not registro or registro.id_usuario_autor != usuario_actual.id_usuario:
        raise HTTPException(status_code=403, detail="No autorizado")
    return await derechos_autor_services.generar_certificado(db, id_registro)

# Obtener registros de usuario
@router.get("/usuario/{id_usuario}", response_model=List[DerechoAutorOut])
def obtener_registros_usuario(id_usuario: int, db: Session = Depends(get_db)):
    return derechos_autor_services.obtener_registros_usuario(db, id_usuario)

# Obtener documentos de registro
@router.get("/documentos/{id_registro}", response_model=List[DocumentoDerechoAutorOut])
def obtener_documentos(id_registro: int, db: Session = Depends(get_db)):
    return derechos_autor_services.obtener_documentos(db, id_registro)

# Descargar PDF
@router.get("/documento/{id_documento}/descargar")
def descargar_documento(id_documento: int, db: Session = Depends(get_db)):
    return derechos_autor_services.descargar_documento(db, id_documento)
