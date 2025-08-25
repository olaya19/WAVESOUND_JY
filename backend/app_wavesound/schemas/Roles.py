# schemas/roles.py
from pydantic import BaseModel
from typing import Optional

class RolBase(BaseModel):
    rol: str

class RolCreate(RolBase):
    pass

class RolOut(RolBase):
    id_rol: int

    class Config:
        orm_mode = True
