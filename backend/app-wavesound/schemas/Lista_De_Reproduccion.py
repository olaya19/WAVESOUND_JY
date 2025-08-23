from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime, date

class ListaReproduccionCreate(ListaReproduccionBase):
    id_usuario: int


class ListaReproduccionResponse(ListaReproduccionBase):
    id_lista: int

    class Config:
        from_attributes = True
