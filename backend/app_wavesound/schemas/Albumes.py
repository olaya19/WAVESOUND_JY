# schemas/albumes.py
from pydantic import BaseModel
from typing import Optional
from datetime import date

class AlbumBase(BaseModel):
    titulo: str
    descripcion: Optional[str] = None
    portada: Optional[str] = None
    fecha_lanzamiento: Optional[date] = None

class AlbumCreate(AlbumBase):
    id_usuario: int

class AlbumOut(AlbumBase):
    id_album: int

    class Config:
        from_attributes = True
