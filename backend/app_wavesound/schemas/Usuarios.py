# schemas/usuarios.py
from pydantic import BaseModel, EmailStr
from typing import Optional
from .Roles import RolOut

class UsuarioBase(BaseModel):
    nombre_usuario: str
    email: EmailStr
    telefono: Optional[str] = None

class UsuarioCreate(UsuarioBase):
    contraseña: str
    id_rol: int

class UsuarioOut(UsuarioBase):
    id_usuario: int
    rol: Optional[RolOut]

    model_config = {"from_attributes": True}