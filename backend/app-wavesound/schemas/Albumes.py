from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime, date

class AlbumBase(BaseModel):
    titulo: str
    descripcion: Optional[str] = None
    portada: Optional[str] = None
    fecha_lanzamiento: Optional[date] = None
    precio: Optional[float] = None


class AlbumCreate(AlbumBase):
    id_usuario: int


class AlbumResponse(AlbumBase):
    id_album: int

    class Config:
        from_attributes = True
