from sqlalchemy.orm import Session
from app_wavesound.models.models import Canciones
from app_wavesound.schemas.Canciones import CancionCreate, CancionBase

def crear_cancion(db: Session, cancion: CancionCreate):
    nueva_cancion = Canciones(**cancion.dict())
    db.add(nueva_cancion)
    db.commit()
    db.refresh(nueva_cancion)
    return nueva_cancion

def obtener_canciones(db: Session):
    return db.query(Canciones).all()

def obtener_cancion(db: Session, id_cancion: int):
    return db.query(Canciones).filter(Canciones.id_cancion == id_cancion).first()

def obtener_canciones_por_usuario(db: Session, id_usuario: int):
    return db.query(Canciones).filter(Canciones.id_usuario == id_usuario).all()


def actualizar_cancion(db: Session, id_cancion: int, datos: CancionBase):
    cancion = obtener_cancion(db, id_cancion)
    if not cancion:
        return None
    for key, value in datos.dict(exclude_unset=True).items():
        setattr(cancion, key, value)
    db.commit()
    db.refresh(cancion)
    return cancion

def eliminar_cancion(db: Session, id_cancion: int):
    cancion = obtener_cancion(db, id_cancion)
    if not cancion:
        return None
    db.delete(cancion)
    db.commit()
    return cancion
