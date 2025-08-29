from pydantic import BaseModel
from typing import Optional
from datetime import date
from decimal import Decimal

class AlbumBase(BaseModel):
    titulo: str
    descripcion: Optional[str] = None
    portada: Optional[str] = None
    fecha_lanzamiento: Optional[date] = None
    precio: Optional[Decimal] = None

class AlbumCreate(AlbumBase):
    id_usuario: int

class AlbumOut(AlbumBase):
    id_album: int

    class Config:
        model_config = {"from_attributes": True}
