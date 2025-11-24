from sqlalchemy.orm import Session
from app_wavesound.models.models import Albumes
from app_wavesound.schemas.Albumes import AlbumCreate, AlbumBase

def crear_album(db: Session, album_data: AlbumCreate, id_usuario: int):
    nuevo_album = Albumes(
        titulo=album_data.titulo,
        descripcion=album_data.descripcion,
        portada_url=album_data.portada_url,
        id_usuario=id_usuario
    )
    db.add(nuevo_album)
    db.commit()
    db.refresh(nuevo_album)
    return nuevo_album


def listar_albumes(db: Session):
    return db.query(Albumes).all()


def listar_albumes_usuario(db: Session, id_usuario: int):
    return db.query(Albumes).filter(Albumes.id_usuario == id_usuario).all()


def obtener_album(db: Session, id_album: int):
    return db.query(Albumes).filter(Albumes.id_album == id_album).first()


def actualizar_album(db: Session, id_album: int, datos: AlbumBase):
    album = db.query(Albumes).filter(Albumes.id_album == id_album).first()
    if not album:
        return None

    album.titulo = datos.titulo
    album.descripcion = datos.descripcion
    album.portada_url = datos.portada_url

    db.commit()
    db.refresh(album)
    return album


def eliminar_album(db: Session, id_album: int):
    album = db.query(Albumes).filter(Albumes.id_album == id_album).first()
    if not album:
        return None

    db.delete(album)
    db.commit()
    return album
