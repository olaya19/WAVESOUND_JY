from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

# --- Sub-esquemas relacionados ---

class GeneroOut(BaseModel):
    id_genero: int
    nombre: str

    model_config = {"from_attributes": True}


class AlbumOut(BaseModel):
    id_album: int
    titulo: str
    año_lanzamiento: Optional[int]

    model_config = {"from_attributes": True}


class UsuarioColabOut(BaseModel):
    id_usuario: int
    nombre_usuario: str
    nickname: str

    model_config = {"from_attributes": True}


# --- Schema principal de canciones ---

class CancionBase(BaseModel):
    titulo: str
    descripcion: Optional[str] = None
    duracion_segundos: Optional[int] = None
    url_archivo: Optional[str] = None
    portada: Optional[str] = None


class CancionCreate(CancionBase):
    id_genero: Optional[int]
    id_album: Optional[int]


class CancionOut(CancionBase):
    id_cancion: int
    genero: Optional[GeneroOut]
    album: Optional[AlbumOut]
    reproducciones: int = 0
    colaboradores: List[UsuarioColabOut] = []
    fecha_publicacion: Optional[datetime]

    model_config = {"from_attributes": True}
