from pydantic import BaseModel
from typing import Optional

class PerfilBase(BaseModel):
    nombre_artista: Optional[str] = None
    biografia: Optional[str] = None
    foto_perfil: Optional[str] = None
    genero_musical: Optional[str] = None

class PerfilCreate(PerfilBase):
    id_usuario: int

class PerfilOut(PerfilBase):
    id_perfil: int

    class Config:
        model_config = {"from_attributes": True}
