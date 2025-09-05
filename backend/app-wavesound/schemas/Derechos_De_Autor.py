from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime, date

class DerechoAutorBase(BaseModel):
    nombre_autor: str
    porcentaje_royalties: float
    fecha_acuerdo: date
    documento_legal: str
    activo: Optional[bool] = True


class DerechoAutorCreate(DerechoAutorBase):
    id_cancion: int
    id_usuario_autor: int


class DerechoAutorResponse(DerechoAutorBase):
    id_registro: int

    class Config:
        from_attributes = True
