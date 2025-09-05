from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime, date

class ListaCancionBase(BaseModel):
    id_lista: int
    id_cancion: int


class ListaCancionResponse(ListaCancionBase):
    class Config:
        from_attributes = True
