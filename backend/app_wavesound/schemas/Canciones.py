from pydantic import BaseModel
from typing import Optional

class CancionBase(BaseModel):
    titulo: str
    descripcion: Optional[str] = None
    id_genero: Optional[int] = None
    id_album: Optional[int] = None

class CancionCreate(CancionBase):
    id_usuario: int

class CancionOut(CancionBase):
    id_cancion: int

    class Config:
        orm_mode = True
