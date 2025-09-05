from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime, date

class ReproduccionBase(BaseModel):
    fecha_reproduccion: Optional[datetime] = None


class ReproduccionCreate(ReproduccionBase):
    id_cancion: int
    id_usuario: int


class ReproduccionResponse(ReproduccionBase):
    id_reproduccion: int

    class Config:
        from_attributes = True
