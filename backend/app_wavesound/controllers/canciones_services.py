from sqlalchemy.orm import Session
from sqlalchemy import func
from app_wavesound.models.models import Canciones, Reproducciones
from app_wavesound.schemas.Canciones import CancionCreate, CancionOut
from datetime import datetime

# Crear canción
def crear_cancion(db: Session, datos: CancionCreate) -> CancionOut:
    nueva = Canciones(
        id_usuario=datos.id_usuario,
        titulo=datos.titulo,
        descripcion=datos.descripcion,
        duracion=datos.duracion,
        archivo_url=datos.archivo_url,
        portada_url=datos.portada_url,
        id_genero=datos.id_genero,
        id_album=datos.id_album,
        fecha_creacion=datetime.utcnow()
    )
    db.add(nueva)
    db.commit()
    db.refresh(nueva)
    return CancionOut.model_validate(nueva)


# Obtener todas las canciones
def obtener_canciones(db: Session):
    canciones = db.query(Canciones).all()
    resultado = []
    for c in canciones:
        total_reps = db.query(func.count(Reproducciones.id_reproduccion))\
            .filter(Reproducciones.id_cancion == c.id_cancion)\
            .scalar() or 0
        resultado.append({
            "id_cancion": c.id_cancion,
            "titulo": c.titulo,
            "descripcion": c.descripcion,
            "archivo_url": c.archivo_url,
            "portada_url": c.portada_url,
            "total_reproducciones": total_reps
        })
    return resultado


# Obtener canción por ID
def obtener_cancion(db: Session, id_cancion: int):
    cancion = db.query(Canciones).filter(Canciones.id_cancion == id_cancion).first()
    if not cancion:
        return None

    total_reps = db.query(func.count(Reproducciones.id_reproduccion))\
        .filter(Reproducciones.id_cancion == id_cancion)\
        .scalar() or 0

    return {
        "id_cancion": cancion.id_cancion,
        "titulo": cancion.titulo,
        "descripcion": cancion.descripcion,
        "archivo_url": cancion.archivo_url,
        "portada_url": cancion.portada_url,
        "total_reproducciones": total_reps
    }


# Registrar reproducción (cada vez que se escucha una canción)
def registrar_reproduccion(db: Session, id_cancion: int, id_usuario: int):
    nueva_rep = Reproducciones(
        id_cancion=id_cancion,
        id_usuario=id_usuario,
        fecha_reproduccion=datetime.utcnow()
    )
    db.add(nueva_rep)
    db.commit()
    db.refresh(nueva_rep)
    return {"mensaje": "Reproducción registrada"}


# Obtener canciones más reproducidas
def obtener_top_canciones(db: Session, limite: int = 10):
    top = (
        db.query(Canciones, func.count(Reproducciones.id_reproduccion).label("total_reproducciones"))
        .join(Reproducciones, Reproducciones.id_cancion == Canciones.id_cancion)
        .group_by(Canciones.id_cancion)
        .order_by(func.count(Reproducciones.id_reproduccion).desc())
        .limit(limite)
        .all()
    )

    return [
        {
            "id_cancion": c.id_cancion,
            "titulo": c.titulo,
            "archivo_url": c.archivo_url,
            "portada_url": c.portada_url,
            "total_reproducciones": total
        }
        for c, total in top
    ]
