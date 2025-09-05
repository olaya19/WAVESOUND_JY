from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime, date

class PerfilBase(BaseModel):
    nombre_artista: Optional[str] = None
    biografia: Optional[str] = None
    foto_perfil: Optional[str] = None
    genero_musical: Optional[str] = None


class PerfilCreate(PerfilBase):
    id_usuario: int


class PerfilResponse(PerfilBase):
    id_perfil: int

    class Config:
        from_attributes = True
