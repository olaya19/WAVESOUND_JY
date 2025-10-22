# schemas/usuarios.py
from pydantic import BaseModel, EmailStr
from typing import Optional, List
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

class CancionPerfilOut(BaseModel):
    id: int
    titulo: str
    descripcion: Optional[str]
    genero: Optional[str]
    album: Optional[str]
    reproducciones: int

class AlbumPerfilOut(BaseModel):
    id: int
    titulo: str

class PerfilUsuarioOut(BaseModel):
    id_usuario: int
    nombre_usuario: str
    nickname: str
    email: str
    albumes: List[AlbumPerfilOut]
    canciones: List[CancionPerfilOut]
    total_reproducciones: int

    model_config = {"from_attributes": True}