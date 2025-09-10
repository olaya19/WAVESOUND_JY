from pydantic import BaseModel
from typing import Optional

class ListaReproduccionBase(BaseModel):
    nombre_lista: str
    descripcion: Optional[str] = None
    privada: Optional[bool] = False

class ListaReproduccionCreate(ListaReproduccionBase):
    id_usuario: int

class ListaReproduccionOut(ListaReproduccionBase):
    id_lista: int

    class Config:
        model_config = {"from_attributes": True}