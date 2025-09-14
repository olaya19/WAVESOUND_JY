# schemas/usuarios.py
from pydantic import BaseModel, EmailStr
from typing import Optional
from .Roles import RolOut

class UsuarioBase(BaseModel):
    nombre_usuario: str             
    nickname: str                   
    email: EmailStr
    
class UsuarioCreate(BaseModel):
    nickname: str             # <-- agregado aquí
    nombre_usuario: str
    email: EmailStr
    contraseña: str
    id_rol: int

class UsuarioOut(UsuarioBase):
    id_usuario: int
    rol: Optional[RolOut]
    
class LoginUsuario(BaseModel):
    username: str   # Puede ser email o nickname
    password: str    

    model_config = {"from_attributes": True}