from pydantic import BaseModel
from typing import Optional

class PerfilBase(BaseModel):
    nombre_artista: Optional[str] = None
    biografia: Optional[str] = None
    foto_perfil: Optional[str] = None
    id_genero: list[int] = None   

    model_config = {"from_attributes": True}


class PerfilCreate(PerfilBase):
    id_usuario: int


class PerfilOut(PerfilBase):
    id_perfil: int
    id_usuario: Optional[int] = None

    model_config = {"from_attributes": True}
