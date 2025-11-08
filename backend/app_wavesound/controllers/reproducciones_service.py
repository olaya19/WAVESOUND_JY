from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime
from app_wavesound.models.models import Reproducciones, Canciones
from app_wavesound.schemas.Reproducciones import ReproduccionCreate, ReproduccionOut

def registrar_reproduccion(db: Session, datos: ReproduccionCreate) -> ReproduccionOut:
    nueva_rep = Reproducciones(
        id_cancion=datos.id_cancion,
        id_usuario=datos.id_usuario,
        fecha_reproduccion=datos.fecha_reproduccion or datetime.utcnow()
    )
    db.add(nueva_rep)
    db.commit()
    db.refresh(nueva_rep)
    return ReproduccionOut.model_validate(nueva_rep)


def obtener_reproducciones(db: Session):
    reproducciones = db.query(Reproducciones).all()
    return [ReproduccionOut.model_validate(r) for r in reproducciones]


def contar_reproducciones_cancion(db: Session, id_cancion: int) -> int:
    return db.query(Reproducciones).filter(Reproducciones.id_cancion == id_cancion).count()


def canciones_mas_reproducidas(db: Session, limite: int = 10):
    resultados = (
        db.query(
            Canciones.id_cancion,
            Canciones.titulo,
            func.count(Reproducciones.id_reproduccion).label("total_reproducciones")
        )
        .join(Reproducciones, Canciones.id_cancion == Reproducciones.id_cancion)
        .group_by(Canciones.id_cancion, Canciones.titulo)
        .order_by(func.count(Reproducciones.id_reproduccion).desc())
        .limit(limite)
        .all()
    )
    return [
        {"id_cancion": r.id_cancion, "titulo": r.titulo, "total_reproducciones": r.total_reproducciones}
        for r in resultados
    ]
