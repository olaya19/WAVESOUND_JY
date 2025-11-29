# schemas/seguidores.py
from pydantic import BaseModel
from datetime import datetime

class SeguidorBase(BaseModel):
    id_usuario: int      # quien sigue
    id_seguido: int      # a quién sigue

class SeguidorCreate(SeguidorBase):
    fecha_seguimiento: datetime

class SeguidorOut(SeguidorBase):
    id_seguidor: int
    fecha_seguimiento: datetime

    class Config:
        from_attributes = True
