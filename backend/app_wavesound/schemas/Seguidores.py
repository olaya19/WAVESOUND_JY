from pydantic import BaseModel
from datetime import datetime

class SeguidorBase(BaseModel):
    id_usuario: int
    id_seguido: int

class SeguidorCreate(SeguidorBase):
    fecha_seguimiento: datetime

class SeguidorOut(SeguidorBase):
    id_seguidor: int
    fecha_seguimiento: datetime

    class Config:
        orm_mode = True
