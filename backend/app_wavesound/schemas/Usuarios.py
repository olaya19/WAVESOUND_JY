# app_wavesound/schemas/Usuarios.py

from pydantic import BaseModel, EmailStr
from typing import Optional, List
from app_wavesound.schemas.Roles import RolOut


# -------------------------------------------------
# Base
# -------------------------------------------------
class UsuarioBase(BaseModel):
    nombre_usuario: str
    nickname: str
    email: EmailStr


# -------------------------------------------------
# Crear usuario normal
# -------------------------------------------------
class UsuarioCreate(BaseModel):
    nickname: str
    nombre_usuario: str
    email: EmailStr
    contraseña: str
    id_rol: int


# -------------------------------------------------
# Login normal
# -------------------------------------------------
class LoginUsuario(BaseModel):
    username: str  # nickname o email
    password: str


# -------------------------------------------------
# Login con Google
# -------------------------------------------------
class GoogleLogin(BaseModel):
    token_google: str


# -------------------------------------------------
# Respuesta al frontend
# -------------------------------------------------
class UsuarioOut(UsuarioBase):
    id_usuario: int
    rol: Optional[RolOut]

    class Config:
        model_config = {"from_attributes": True}


# -------------------------------------------------
# Salida de perfil (para vista pública)
# -------------------------------------------------
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
