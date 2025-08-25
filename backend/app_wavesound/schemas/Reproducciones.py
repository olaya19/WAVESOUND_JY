from pydantic import BaseModel
from datetime import datetime

class ReproduccionBase(BaseModel):
    id_cancion: int
    id_usuario: int

class ReproduccionCreate(ReproduccionBase):
    fecha_reproduccion: datetime

class ReproduccionOut(ReproduccionBase):
    id_reproduccion: int
    fecha_reproduccion: datetime

    class Config:
        orm_mode = True
