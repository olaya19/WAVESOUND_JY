from pydantic import BaseModel

class ListaCancionBase(BaseModel):
    id_lista: int
    id_cancion: int

class ListaCancionCreate(ListaCancionBase):
    pass

class ListaCancionOut(ListaCancionBase):
    class Config:
        orm_mode = True
