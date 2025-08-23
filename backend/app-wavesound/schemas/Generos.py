from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime, date

class GeneroBase(BaseModel):
    genero: str


class GeneroResponse(GeneroBase):
    id_genero: int

    class Config:
        from_attributes = True
