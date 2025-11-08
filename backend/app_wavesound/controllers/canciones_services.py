from sqlalchemy.orm import Session, joinedload
from app_wavesound.models.models import Canciones, Usuarios
from app_wavesound.schemas.Canciones import CancionCreate, CancionBase


# Crear canción
def crear_cancion(db: Session, cancion: CancionCreate):
    nueva_cancion = Canciones(**cancion.dict())
    db.add(nueva_cancion)
    db.commit()
    db.refresh(nueva_cancion)
    return nueva_cancion


# Obtener todas las canciones (con relaciones)
def obtener_canciones(db: Session):
    return db.query(Canciones).options(
        joinedload(Canciones.usuario)
    ).all()


# Obtener canción individual
def obtener_cancion(db: Session, id_cancion: int):
    return db.query(Canciones).filter(Canciones.id_cancion == id_cancion).first()


# Obtener canciones por usuario
def obtener_canciones_por_usuario(db: Session, id_usuario: int):
    return db.query(Canciones).filter(Canciones.id_usuario == id_usuario).all()


# Actualizar canción
def actualizar_cancion(db: Session, id_cancion: int, datos: CancionBase):
    cancion = obtener_cancion(db, id_cancion)
    if not cancion:
        return None
    for key, value in datos.dict(exclude_unset=True).items():
        setattr(cancion, key, value)
    db.commit()
    db.refresh(cancion)
    return cancion


# Eliminar canción
def eliminar_cancion(db: Session, id_cancion: int):
    cancion = obtener_cancion(db, id_cancion)
    if not cancion:
        return None
    db.delete(cancion)
    db.commit()
    return cancion


# 🔹 NUEVA: Obtener canciones públicas (todas, con info del usuario)
def obtener_canciones_publicas(db: Session):
    canciones = (
        db.query(Canciones, Usuarios)
        .join(Usuarios, Canciones.id_usuario == Usuarios.id_usuario)
        .all()
    )

    resultado = []
    for cancion, usuario in canciones:
        resultado.append({
            "id_cancion": cancion.id_cancion,
            "titulo": cancion.titulo,
            "descripcion": cancion.descripcion,
            "duracion": cancion.duracion,
            "likes": cancion.likes,
            "archivo_url": cancion.archivo_url,
            "portada_url": cancion.portada_url,
            "nombre_usuario": usuario.nombre_usuario,
            "rol": usuario.id_rol
        })

    return resultado

