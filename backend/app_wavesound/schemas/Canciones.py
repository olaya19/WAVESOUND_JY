from pydantic import BaseModel, HttpUrl
from typing import Optional
from datetime import datetime

# --------------------
# Base
# --------------------
class CancionBase(BaseModel):
    titulo: str
    descripcion: Optional[str] = None
    duracion: Optional[int] = None          
    archivo_url: HttpUrl                     
    portada_url: Optional[HttpUrl] = None   
    id_genero: int
    id_album: Optional[int] = None

# --------------------
# Crear
# --------------------
class CancionCreate(CancionBase):
    id_usuario: int   

# --------------------
# Salida
# --------------------
class CancionOut(CancionBase):
    id_cancion: int
    fecha_creacion: datetime

    class Config:
        from_attributes = True
