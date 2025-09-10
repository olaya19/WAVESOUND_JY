from pydantic import BaseModel
from datetime import datetime

class DocumentoDerechoAutorBase(BaseModel):
    id_registro: int
    tipo_documento: str
    nombre_documento: str
    ruta_archivo: str
    fecha_subida: datetime
    vigente: bool

class DocumentoDerechoAutorCreate(DocumentoDerechoAutorBase):
    pass

class DocumentoDerechoAutorOut(DocumentoDerechoAutorBase):
    id_documento: int

    class Config:
        model_config = {"from_attributes": True}