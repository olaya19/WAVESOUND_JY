from datetime import datetime
from typing import Optional
from pydantic import BaseModel
from .Usuarios import UsuarioOut  # 👈 importa el esquema del usuario

# ------------------------
# Base de la canción
# ------------------------
class CancionBase(BaseModel):
    titulo: str
    descripcion: Optional[str] = None
    duracion: Optional[str] = None
    likes: Optional[int] = 0
    archivo_url: Optional[str] = None
    portada_url: Optional[str] = None
    id_usuario: Optional[int] = None

# ------------------------
# Crear canción
# ------------------------
class CancionCreate(CancionBase):
    pass

# ------------------------
# Mostrar canción con usuario y rol
# ------------------------
class CancionOut(CancionBase):
    id_cancion: int
    fecha_creacion: Optional[datetime] = None
    usuario: Optional[UsuarioOut] = None  # 👈 relación con el usuario que la subió

    class Config:
        from_attributes = True
