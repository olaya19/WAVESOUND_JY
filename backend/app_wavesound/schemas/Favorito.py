from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class FavoritoBase(BaseModel):
    id_cancion: int

class FavoritoCreate(FavoritoBase):
    pass

class FavoritoOut(FavoritoBase):
    id_favorito: int
    id_usuario: int
    fecha_agregado: datetime

    model_config = {"from_attributes": True}
