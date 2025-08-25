from ..db.database import BASE
from sqlalchemy import Column, Integer, String, ForeignKey ,DateTime,DECIMAL ,Date, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

# Roles 
class Roles(BASE):
    __tablename__ = "roles"
    id_rol = Column(Integer, primary_key=True)
    rol = Column(String(50), unique=True, nullable=False)

    usuarios = relationship("Usuarios", back_populates="rol")
# Usuarios
class Usuarios(BASE):
    __tablename__ = "usuarios"
    id_usuario = Column(Integer, primary_key=True)
    id_rol = Column(Integer, ForeignKey("roles.id_rol"))
    nombre_usuario = Column(String(50), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    contraseña = Column(String(255), nullable=False)  # guardar hash
    telefono = Column(String(30))

    rol = relationship("Roles", back_populates="usuarios")
    perfil = relationship("Perfiles", back_populates="usuario", uselist=False)
    canciones = relationship("Canciones", back_populates="usuario")
    albumes = relationship("Albumes", back_populates="usuario")
    listas = relationship("Listas_Reproducciones", back_populates="usuario")

# Perfiles 

class Perfiles(BASE):
    __tablename__ = "perfiles"
    id_perfil = Column(Integer, primary_key=True)
    id_usuario = Column(Integer, ForeignKey("usuarios.id_usuario"))
    nombre_artista = Column(String(50))
    biografia = Column(String(100))
    foto_perfil = Column(String(100))
    genero_musical = Column(String(50))

    usuario = relationship("Usuarios", back_populates="perfil")

# Seguidores
class Seguidores(BASE):
    __tablename__ = "seguidores"
    id_seguidor = Column(Integer, primary_key=True)
    id_usuario = Column(Integer, ForeignKey("usuarios.id_usuario"))  # quien sigue
    id_seguido = Column(Integer, ForeignKey("usuarios.id_usuario"))  # a quién sigue
    fecha_seguimiento = Column(DateTime)

# Géneros 

class Genero(BASE):
    __tablename__ = "genero"
    id_genero = Column(Integer, primary_key=True)
    genero = Column(String(50), nullable=False, unique=True)

    canciones = relationship("Canciones", back_populates="genero")

# Álbumes

class Albumes(BASE):
    __tablename__ = "albumes"
    id_album = Column(Integer, primary_key=True)
    id_usuario = Column(Integer, ForeignKey("usuarios.id_usuario"))
    titulo = Column(String(100))
    descripcion = Column(String(500))
    portada = Column(String(255))
    fecha_lanzamiento = Column(Date)
    precio = Column(DECIMAL(10, 2))

    usuario = relationship("Usuarios", back_populates="albumes")
    canciones = relationship("Canciones", back_populates="album")

# Canciones
class Canciones(BASE):
    __tablename__ = "canciones"
    id_cancion = Column(Integer, primary_key=True)
    id_usuario = Column(Integer, ForeignKey("usuarios.id_usuario"))
    titulo = Column(String(50), nullable=False)
    descripcion = Column(String(200))
    id_genero = Column(Integer, ForeignKey("genero.id_genero"))
    id_album = Column(Integer, ForeignKey("albumes.id_album"))

    usuario = relationship("Usuarios", back_populates="canciones")
    genero = relationship("Genero", back_populates="canciones")
    album = relationship("Albumes", back_populates="canciones")
    reproducciones = relationship("Reproducciones", back_populates="cancion")
    derechos = relationship("Derechos_Autor", back_populates="cancion")
    permisos = relationship("Permisos_Reproduccion", back_populates="cancion")
    listas = relationship("Lista_Canciones", back_populates="cancion")



# Reproducciones 

class Reproducciones(BASE):
    __tablename__ = "reproducciones"
    id_reproduccion = Column(Integer, primary_key=True)
    id_cancion = Column(Integer, ForeignKey("canciones.id_cancion"))
    id_usuario = Column(Integer, ForeignKey("usuarios.id_usuario"))
    fecha_reproduccion = Column(DateTime)

    cancion = relationship("Canciones", back_populates="reproducciones")

# Derechos

class Derechos_Autor(BASE):
    __tablename__ = "derechos_autor"
    id_registro = Column(Integer, primary_key=True)
    id_cancion = Column(Integer, ForeignKey("canciones.id_cancion"))
    nombre_autor = Column(String(40))
    porcentaje_royalties = Column(DECIMAL(5, 2))
    fecha_acuerdo = Column(Date)
    documento_legal = Column(String(1000))
    activo = Column(Boolean, default=True)
    id_usuario_autor = Column(Integer, ForeignKey("usuarios.id_usuario"))

    cancion = relationship("Canciones", back_populates="derechos")
# Documentos De Derechos De Autor
class Documentos_Derechos_Autor(BASE):
    __tablename__ = "documentos_derechos_autor"
    id_documento = Column(Integer, primary_key=True, autoincrement=True)
    id_registro = Column(Integer, ForeignKey("derechos_autor.id_registro"), nullable=False)
    tipo_documento = Column(String(50), nullable=False)
    nombre_documento = Column(String(150), nullable=False)
    ruta_archivo = Column(String(300), nullable=False)
    fecha_subida = Column(DateTime, default=func.now())
    vigente = Column(Boolean, default=True)

    derecho_autor = relationship("Derechos_Autor", back_populates="documentos")

# Listas de reproducción

class Listas_Reproducciones(BASE):
    __tablename__ = "listas_reproducciones"
    id_lista = Column(Integer, primary_key=True)
    id_usuario = Column(Integer, ForeignKey("usuarios.id_usuario"))
    nombre_lista = Column(String(100))
    descripcion = Column(String(500))
    privada = Column(Boolean, default=False)

    usuario = relationship("Usuarios", back_populates="listas")
    canciones = relationship("Lista_Canciones", back_populates="lista")

# Lista_Canciones

class Lista_Canciones(BASE):
    __tablename__ = "lista_canciones"
    id_lista = Column(Integer, ForeignKey("listas_reproducciones.id_lista"), primary_key=True)
    id_cancion = Column(Integer, ForeignKey("canciones.id_cancion"), primary_key=True)

    lista = relationship("Listas_Reproducciones", back_populates="canciones")
    cancion = relationship("Canciones", back_populates="listas")

# Permisos de reproducción

class Permisos_Reproduccion(BASE):
    __tablename__ = "permisos_reproduccion"
    id_permiso = Column(Integer, primary_key=True)
    id_cancion = Column(Integer, ForeignKey("canciones.id_cancion"))
    id_usuario = Column(Integer, ForeignKey("usuarios.id_usuario"))
    permiso = Column(String(50))
    activo = Column(Boolean)

    cancion = relationship("Canciones", back_populates="permisos")
