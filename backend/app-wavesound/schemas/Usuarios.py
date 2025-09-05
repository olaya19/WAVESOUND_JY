from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime, date

class UsuarioBase(BaseModel):
    nombre_usuario: str
    email: EmailStr
    telefono: Optional[str] = None


class UsuarioCreate(UsuarioBase):
    contraseña: str
    id_rol: int


class UsuarioResponse(UsuarioBase):
    id_usuario: int
    rol: Optional[RolResponse]

    class Config:
        from_attributes = True
