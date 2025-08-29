from pydantic import BaseModel

class GeneroBase(BaseModel):
    genero: str

class GeneroCreate(GeneroBase):
    pass

class GeneroOut(GeneroBase):
    id_genero: int

    class Config:
        model_config = {"from_attributes": True}
