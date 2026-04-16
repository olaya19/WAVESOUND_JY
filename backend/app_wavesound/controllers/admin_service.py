from sqlalchemy.orm import Session
from app_wavesound.models.models import Usuarios, Seguidores
from app_wavesound.controllers.perfil_service import obtener_perfil_completo

def obtener_usuarios_admin(db: Session):
    usuarios = db.query(Usuarios).all()

    resultado = []

    for u in usuarios:
        perfil = obtener_perfil_completo(db, u.id_usuario)

        seguidores_count = db.query(Seguidores).filter(
            Seguidores.id_seguido == u.id_usuario
        ).count()

        resultado.append({
            "id_usuario": u.id_usuario,
            "nombre_usuario": u.nombre_usuario,
            "foto_perfil": perfil["foto_perfil"] if perfil else None,
            "seguidores": seguidores_count
        })

    return resultado