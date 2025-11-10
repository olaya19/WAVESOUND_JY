from sqlalchemy.orm import Session
from sqlalchemy import func
from app_wavesound.models.models import Canciones, Reproducciones, Perfiles
from app_wavesound.schemas.Canciones import CancionCreate, CancionBase
from datetime import datetime

# Crear canción
def crear_cancion(db: Session, cancion_data: CancionCreate):
    nueva_cancion = Canciones(**cancion_data.dict())
    db.add(nueva_cancion)
    db.commit()
    db.refresh(nueva_cancion)
    return nueva_cancion


# Obtener todas las canciones
def obtener_canciones(db: Session):
    canciones = db.query(Canciones).all()
    resultado = []
    for c in canciones:
        total = db.query(func.count(Reproducciones.id_reproduccion))\
                  .filter(Reproducciones.id_cancion == c.id_cancion).scalar()
        resultado.append({
            **c.__dict__,
            "total_reproducciones": total or 0
        })
    return resultado


# Obtener canciones públicas
def obtener_canciones_publicas(db: Session):
    return obtener_canciones(db)


# Obtener canciones por usuario
def obtener_canciones_por_usuario(db: Session, id_usuario: int):
    return db.query(Canciones).filter(Canciones.id_usuario == id_usuario).all()


# Obtener canción por ID
def obtener_cancion(db: Session, id_cancion: int):
    return db.query(Canciones).filter(Canciones.id_cancion == id_cancion).first()


# Actualizar canción
def actualizar_cancion(db: Session, id_cancion: int, datos: CancionBase):
    cancion = db.query(Canciones).filter(Canciones.id_cancion == id_cancion).first()
    if hasattr(id_usuario, "id"):
        id_usuario = id_usuario.id
        perfil = db.query(Perfiles).filter(Perfiles.id_usuario == id_usuario).first()
    if not cancion:
        return None
    for key, value in datos.dict(exclude_unset=True).items():
        setattr(cancion, key, value)
    db.commit()
    db.refresh(cancion)
    return cancion


# Eliminar canción
def eliminar_cancion(db: Session, id_cancion: int):
    cancion = db.query(Canciones).filter(Canciones.id_cancion == id_cancion).first()
    if not cancion:
        return None
    db.delete(cancion)
    db.commit()
    return cancion


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


# Obtener total de reproducciones
def obtener_total_reproducciones(db: Session, id_cancion: int):
    return db.query(func.count(Reproducciones.id_reproduccion))\
             .filter(Reproducciones.id_cancion == id_cancion).scalar()


# Obtener top canciones (más reproducidas)
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
