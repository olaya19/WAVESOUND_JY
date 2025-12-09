from sqlalchemy.orm import Session
from sqlalchemy import func
from app_wavesound.models.models import Canciones, Reproducciones, Perfiles, Usuarios
from app_wavesound.schemas.Canciones import CancionCreate, CancionBase
from datetime import datetime
from pathlib import Path

# Crear canción
def crear_cancion(db: Session, cancion_data: CancionCreate):
    nueva_cancion = Canciones(**cancion_data.dict())
    db.add(nueva_cancion)
    db.commit()
    db.refresh(nueva_cancion)
    return nueva_cancion

# Obtener canciones públicas con foto y nombre
def obtener_canciones_publicas(db: Session):
    canciones = (
        db.query(Canciones, Usuarios, Perfiles)
        .join(Usuarios, Usuarios.id_usuario == Canciones.id_usuario)
        .outerjoin(Perfiles, Perfiles.id_usuario == Usuarios.id_usuario)
        .order_by(Canciones.id_cancion.desc())
        .all()
    )

    resultado = []
    for c, u, p in canciones:
        # URL de foto de perfil
        foto = None
        if p and p.foto_perfil:
            foto = p.foto_perfil
            if not foto.startswith("/"):
                foto = f"/{foto}"  # ruta relativa al static
        usuario_data = {
            "nombre_usuario": u.nombre_usuario,
            "nickname": u.nickname,
            "nombre_artista": p.nombre_artista if p else None,
            "foto_perfil": foto
        }

        resultado.append({
            "id_cancion": c.id_cancion,
            "titulo": c.titulo,
            "descripcion": c.descripcion,
            "duracion": c.duracion,
            "archivo_url": c.archivo_url,
            "portada_url": c.portada_url,
            "id_usuario": c.id_usuario,
            "id_genero": c.id_genero,
            "id_album": c.id_album,
            "fecha_creacion": c.fecha_creacion,
            "total_reproducciones": 0,
            "usuario": usuario_data
        })
    return resultado

# Obtener canciones por usuario con foto y nombre
def obtener_canciones_por_usuario(db: Session, id_usuario: int):
    canciones = (
        db.query(Canciones, Usuarios, Perfiles)
        .join(Usuarios, Usuarios.id_usuario == Canciones.id_usuario)
        .outerjoin(Perfiles, Perfiles.id_usuario == Usuarios.id_usuario)
        .filter(Canciones.id_usuario == id_usuario)
        .order_by(Canciones.id_cancion.desc())
        .all()
    )

    resultado = []
    for c, u, p in canciones:
        foto = None
        if p and p.foto_perfil:
            foto = p.foto_perfil
            if not foto.startswith("/"):
                foto = f"/{foto}"
        usuario_data = {
            "nombre_usuario": u.nombre_usuario,
            "nickname": u.nickname,
            "nombre_artista": p.nombre_artista if p else None,
            "foto_perfil": foto
        }

        resultado.append({
            "id_cancion": c.id_cancion,
            "titulo": c.titulo,
            "descripcion": c.descripcion,
            "duracion": c.duracion,
            "archivo_url": c.archivo_url,
            "portada_url": c.portada_url,
            "id_usuario": c.id_usuario,
            "id_genero": c.id_genero,
            "id_album": c.id_album,
            "fecha_creacion": c.fecha_creacion,
            "total_reproducciones": 0,
            "usuario": usuario_data
        })
    return resultado

# Registrar reproducción
def registrar_reproduccion(db: Session, id_cancion: int, id_usuario: int):
    nueva_rep = Reproducciones(
        id_cancion=id_cancion,
        id_usuario=id_usuario,
        fecha_reproduccion=datetime.utcnow()
    )
    db.add(nueva_rep)
    db.commit()
    return nueva_rep

# Total reproducciones
def obtener_total_reproducciones(db: Session, id_cancion: int):
    return db.query(func.count(Reproducciones.id_reproduccion)) \
             .filter(Reproducciones.id_cancion == id_cancion).scalar()


# -----------------------
# Top canciones
# -----------------------
def obtener_top_canciones(db: Session, limite: int = 10):
    resultado = (
        db.query(
            Canciones.titulo,
            func.count(Reproducciones.id_reproduccion).label("total_reproducciones")
        )
        .join(Reproducciones, Canciones.id_cancion == Reproducciones.id_cancion)
        .group_by(Canciones.id_cancion)
        .order_by(func.count(Reproducciones.id_reproduccion).desc())
        .limit(limite)
        .all()
    )
    return [{"titulo": r.titulo, "total_reproducciones": r.total_reproducciones} for r in resultado]
