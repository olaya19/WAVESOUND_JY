from .database import BASE
from sqlalchemy import Column, Integer, String, ForeignKey ,DateTime,DECIMAL ,Date, Boolean


class Usuarios(BASE):
    __tablename__= "usuarios"
    id_usuario= Column(Integer,
                primary_key=True
                )
    id_rol = Column(Integer,
                    ForeignKey("Roles.id_rol")) 
    nombre_usuario = Column(String(50))
    email = Column(String(100))
    contraseña = Column(String(50))
    telefono = Column (String(30))
    
class Roles(BASE):
    __tablename__="Roles"
    id_rol = Column(Integer, primary_key=True)
    rol = Column(String(50))
  

class Perfiles(BASE):
    __tablename__="perfiles"
    id_perfil = Column(Integer, 
                primary_key=True)
    id_usuario = Column(Integer,ForeignKey("usuarios.id_usuario") )
    nombre_artista =Column(String(50))
    biografia = Column (String(100))
    foto_perfil = Column(String(100))
    genero_musical = Column(String(50))

class Publicaciones(BASE):
    __tablename__ = "publicaciones"
    id_publicacion = Column(Integer, primary_key=True)
    id_usuario = Column(Integer, ForeignKey("usuarios.id_usuario"))
    titulo = Column(String(50))
    contenido = Column(String(500))
    imagen = Column(String(255))
    media = Column(String(50))
    fecha_publicacion = Column(DateTime)

class Reacciones(BASE):
    __tablename__ = "reacciones"
    id_reaccion = Column(Integer, primary_key=True)
    tipo_reaccion = Column(String(20))
    id_usuario = Column(Integer, ForeignKey("usuarios.id_usuario"))
    id_publicacion = Column(Integer, ForeignKey("publicaciones.id_publicacion"))
    fecha_reaccion = Column(DateTime)


class Comentarios(BASE):
    __tablename__ = "comentarios"
    id_comentario = Column(Integer, primary_key=True)
    id_publicacion = Column(Integer, ForeignKey("publicaciones.id_publicacion"))
    id_usuario = Column(Integer, ForeignKey("usuarios.id_usuario"))
    comentario = Column(String(500))
    fecha_comentario = Column(DateTime)


class Seguidores(BASE):
    __tablename__ = "seguidores"
    id_seguidor = Column(Integer, primary_key=True)
    id_usuario = Column(Integer, ForeignKey("usuarios.id_usuario"))
    id_seguido = Column(Integer, ForeignKey("usuarios.id_usuario"))
    fecha_seguimiento = Column(DateTime)

class Canciones(BASE):
    __tablename__= "canciones"
    id_cancion = Column(Integer,
                primary_key=True
                )    
    id_usuario = Column(Integer,ForeignKey("usuarios.id_usuario"))
    Titulo = Column(String(50))
    Descripcion = Column(String(50))
    id_genero = Column(Integer,ForeignKey("genero.id_genero"))
    id_album= Column(Integer,ForeignKey("albumes.id_album"))




class Genero(BASE):
    __tablename__= "genero"
    id_genero = Column(Integer,primary_key=True)    
    genero = Column(String(50)) 


class Reproducciones(BASE):
    __tablename__ = "reproducciones"
    id_reproduccion = Column(Integer, primary_key=True)
    id_cancion = Column(Integer,ForeignKey("canciones.id_cancion"))
    id_usuario = Column(Integer,ForeignKey("usuarios.id_usuario"))
    fecha_reproduccion = Column(DateTime)

class Derechos_Autor(BASE):
    __tablename__ = "derechos_autor"
    id_registro = Column(Integer, primary_key=True)
    id_cancion = Column(Integer)
    nombre_autor = Column(String(40))
    porcentaje_royalties = Column(DECIMAL(5, 2))
    fecha_acuerdo = Column(Date)
    documento_legal = Column(String(1000))
    activo = Column(Boolean)
    id_usuario_autor = Column(Integer, ForeignKey("usuarios.id_usuario"))

class Listas_Reproducciones(BASE):
    __tablename__ = "lista_reproducciones"
    id_lista = Column(Integer, primary_key=True)
    id_usuario = Column(Integer, ForeignKey("usuarios.id_usuario"))
    nombre_lista = Column(String(100))
    descripcion = Column(String(500))
    privada = Column(Boolean)


class Lista_Canciones(BASE):
    __tablename__ = "lista_canciones"
    id_lista = Column(Integer, primary_key=True)
    id_cancion = Column(Integer, primary_key=True)



class Albumes(BASE):
    __tablename__ = "albumes"
    id_album = Column(Integer, primary_key=True)
    id_usuario = Column(Integer, ForeignKey("usuarios.id_usuario"))
    titulo = Column(String(100))
    descripcion = Column(String(500))
    portada = Column(String(255))
    fecha_lanzamiento = Column(Date)
    precio = Column(DECIMAL(10, 2))


class Productos(BASE):
    __tablename__ = "productos"
    id_producto = Column(Integer, primary_key=True)
    id_usuario = Column(Integer, ForeignKey("usuarios.id_usuario"))
    nombre_producto = Column(String(100))
    descripcion = Column(String(500))
    imagen = Column(String(255))
    precio = Column(DECIMAL(10, 2))
    stock = Column(Integer)
    tipo = Column(Integer)
    fecha_creacion = Column(DateTime)


class Ventas(BASE):
    __tablename__ = "ventas"
    id_venta = Column(Integer, primary_key=True)
    id_producto = Column(Integer, ForeignKey("productos.id_producto"))
    cantidad = Column(Integer)
    precio_unitario = Column(DECIMAL(10, 2))

class En_Vivos(BASE):
    __tablename__ = "en_vivos"
    id_envivo = Column(Integer, primary_key=True)
    id_usuario = Column(Integer, ForeignKey("usuarios.id_usuario"))
    titulo = Column(String(100))
    descripcion = Column(String(500))
    fecha_inicio = Column(DateTime)
    fecha_fin = Column(DateTime)
    url_stream = Column(String(255))
    estado = Column(Integer)

class Chat_Envivos(BASE):
    __tablename__ = "chat_envivos"
    id_chat_envivo = Column(Integer, primary_key=True)
    id_usuario =Column (Integer,ForeignKey("usuarios.id_usuario"))
    id_envivo=Column(Integer, ForeignKey("en_vivos.id_envivo"))
    nombre_chat =Column(String(100))
    descripcion =Column(String(100))
    fecha_creacion =Column(DateTime)


class Comunidades (BASE):
    __tablename__ = "comunidades"
    id_comunidad = Column(Integer,primary_key=True)
    id_usuario = Column(Integer,ForeignKey ("usuarios.id_usuario"))
    descripcion = Column(String(100))
    rangos = Column(Integer)

class Misiones_Comunidades(BASE):
    __tablename__ = "misiones_comunidades"
    id_mision = Column(Integer, primary_key=True)
    id_comunidad =Column(Integer,ForeignKey("comunidades.id_comunidad"))
    id_usuario = Column(Integer,ForeignKey ("usuarios.id_usuario"))
    titulo = Column(String(100))
    descripcion = Column(String(500))
    fecha_inicio = Column(Date)
    fecha_fin = Column(Date)
    recompensa_puntos = Column(Integer)
    estado = Column(Integer)

class Chat_Comunidad(BASE):
    __tablename__ = "chat_comunidad"
    id_chat_comunidad = Column(Integer, primary_key=True)
    id_usuario =Column (Integer,ForeignKey("usuarios.id_usuario"))
    id_comunidad=Column(Integer, ForeignKey("comunidades.id_comunidad"))
    nombre_chat =Column(String(100))
    descripcion =Column(String(100))
    fecha_creacion =Column(DateTime)

class Chat(BASE):
    __tablename__ = "chats"
    id_chat = Column(Integer, primary_key=True)
    id_emisor = Column(Integer, ForeignKey("usuarios.id_usuario"))
    id_receptor = Column(Integer, ForeignKey("usuarios.id_usuario"))
    contenido = Column(String(150))
    fecha_envio = Column(DateTime)
    leido = Column(Boolean)
    
class permisos_reproduccion(BASE):
    __tablename__= "permisos_reproduccion"
    id_permiso = Column(Integer, primary_key=True)
    id_cancion = Column(Integer, ForeignKey("canciones.id_cancion"))
    id_usuario = Column(Integer, ForeignKey("usuarios.id_usuario"))
    permiso = Column(String(50))
    activo = Column(Boolean)


                                                                                                      
        
