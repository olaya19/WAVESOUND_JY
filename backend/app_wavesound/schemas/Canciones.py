from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class CancionBase(BaseModel):
    titulo: str
    descripcion: Optional[str] = None
    duracion: Optional[int] = None
    archivo_url: str
    portada_url: Optional[str] = None
    id_genero: int
    id_album: Optional[int] = None

class CancionCreate(CancionBase):
    id_usuario: Optional[int] = None

class CancionOut(CancionBase):
    id_cancion: int
    id_usuario: int
    fecha_creacion: datetime
    total_reproducciones: Optional[int] = 0

    class Config:
        from_attributes = True
