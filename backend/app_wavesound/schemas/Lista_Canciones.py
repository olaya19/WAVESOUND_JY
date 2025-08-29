from pydantic import BaseModel

class ListaCancionBase(BaseModel):
    id_lista: int
    id_cancion: int

class ListaCancionCreate(ListaCancionBase):
    pass

class ListaCancionOut(ListaCancionBase):
    class Config:
        model_config = {"from_attributes": True}