from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime, date

class PermisoReproduccionBase(BaseModel):
    permiso: str
    activo: bool


class PermisoReproduccionCreate(PermisoReproduccionBase):
    id_cancion: int
    id_usuario: int


class PermisoReproduccionResponse(PermisoReproduccionBase):
    id_permiso: int

    class Config:
        from_attributes = True
