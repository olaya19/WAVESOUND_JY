from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app_wavesound.db.database import get_db
from app_wavesound.schemas.Albumes import AlbumCreate, AlbumOut, AlbumBase
from app_wavesound.schemas.Canciones import CancionOut
from app_wavesound.models.models import Canciones
from app_wavesound.controllers import albumes_services
from app_wavesound.auth.auth import get_current_user

router = APIRouter(prefix="/albumes", tags=["Álbumes"])

# -----------------------
# Crear álbum
# -----------------------
@router.post("/", response_model=AlbumOut)
def crear_album(
    album: AlbumCreate,
    db: Session = Depends(get_db),
    usuario_actual=Depends(get_current_user)
):
    return albumes_services.crear_album(db, album, usuario_actual.id_usuario)


# -----------------------
# Listar todos los álbumes
# -----------------------
@router.get("/", response_model=List[AlbumOut])
def listar_albumes(db: Session = Depends(get_db)):
    return albumes_services.listar_albumes(db)

# -----------------------
# Listar todas las canciones de un álbum
# -----------------------
@router.get("/{id_album}/canciones", response_model=List[CancionOut])
def obtener_canciones_album(id_album: int, db: Session = Depends(get_db)):
    return (
        db.query(Canciones)
        .filter(Canciones.id_album == id_album)
        .all()
    )


# -----------------------
# Listar álbumes por usuario
# -----------------------
@router.get("/usuario/{id_usuario}", response_model=List[AlbumOut])
def listar_albumes_usuario(id_usuario: int, db: Session = Depends(get_db)):
    return albumes_services.listar_albumes_usuario(db, id_usuario)



# -----------------------
# Obtener álbum por ID
# -----------------------
@router.get("/{id_album}", response_model=AlbumOut)
def obtener_album(id_album: int, db: Session = Depends(get_db)):
    album = albumes_services.obtener_album(db, id_album)
    if not album:
        raise HTTPException(status_code=404, detail="Álbum no encontrado")
    return album


# -----------------------
# Actualizar álbum
# -----------------------
@router.put("/{id_album}", response_model=AlbumOut)
def actualizar_album(
    id_album: int,
    datos: AlbumBase,
    db: Session = Depends(get_db),
    usuario_actual=Depends(get_current_user)
):
    album = albumes_services.actualizar_album(db, id_album, datos)
    if not album:
        raise HTTPException(status_code=404, detail="Álbum no encontrado")
    return album


# -----------------------
# Eliminar álbum
# -----------------------
@router.delete("/{id_album}")
def eliminar_album(
    id_album: int,
    db: Session = Depends(get_db),
    usuario_actual=Depends(get_current_user)
):
    album = albumes_services.eliminar_album(db, id_album)
    if not album:
        raise HTTPException(status_code=404, detail="Álbum no encontrado")
    return {"msg": "Álbum eliminado correctamente"}
