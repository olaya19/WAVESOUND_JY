from pydantic import BaseModel
from datetime import datetime

class FavoritoBase(BaseModel):
    id_cancion: int
    id_usuario: int

class FavoritoCreate(FavoritoBase):
    pass

class FavoritoOut(FavoritoBase):
    id_favorito: int
    fecha_agregado: datetime

    model_config = {"from_attributes": True}