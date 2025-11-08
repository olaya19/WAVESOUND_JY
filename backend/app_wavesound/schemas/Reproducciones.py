from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ReproduccionBase(BaseModel):
    id_usuario: int
    id_cancion: int
    fecha_reproduccion: Optional[datetime] = None

class ReproduccionCreate(ReproduccionBase):
    pass

class ReproduccionOut(ReproduccionBase):
    id_reproduccion: int
    fecha_reproduccion: datetime

    model_config = {"from_attributes": True}
