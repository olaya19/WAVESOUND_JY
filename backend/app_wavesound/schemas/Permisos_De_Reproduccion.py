from pydantic import BaseModel
from typing import Optional

class PermisoReproduccionBase(BaseModel):
    id_cancion: int
    id_usuario: int
    permiso: str
    activo: Optional[bool] = True

class PermisoReproduccionCreate(PermisoReproduccionBase):
    pass

class PermisoReproduccionOut(PermisoReproduccionBase):
    id_permiso: int

    class Config:
        orm_mode = True
