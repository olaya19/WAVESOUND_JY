from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime, date

class RolBase(BaseModel):
    rol: str


class RolResponse(RolBase):
    id_rol: int

    class Config:
        from_attributes = True
