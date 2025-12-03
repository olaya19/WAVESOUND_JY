from pydantic import BaseModel
from datetime import date
from typing import Optional
from decimal import Decimal

class DerechoAutorBase(BaseModel):
    id_cancion: int
    nombre_autor: str
    fecha_acuerdo: Optional[date] = None
    documento_legal: Optional[str] = None
    id_usuario_autor: int

class DerechoAutorCreate(DerechoAutorBase):
    pass

class DerechoAutorOut(DerechoAutorBase):
    id_registro: int

    class Config:
       model_config = {"from_attributes": True}

