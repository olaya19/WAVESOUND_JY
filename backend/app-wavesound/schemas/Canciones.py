from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime, date

class CancionBase(BaseModel):
    titulo: str
    descripcion: Optional[str] = None


class CancionCreate(CancionBase):
    id_usuario: int
    id_genero: Optional[int] = None
    id_album: Optional[int] = None


class CancionResponse(CancionBase):
    id_cancion: int
    genero: Optional[GeneroResponse]
    album: Optional[AlbumResponse]

    class Config:
        from_attributes = True
