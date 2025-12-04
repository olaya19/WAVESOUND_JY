from sqlalchemy.orm import Session
from app_wavesound.models.models import Seguidores, Usuarios, Perfiles, Generos
from datetime import datetime


def seguir_usuario(db: Session, seguidor_id: int, seguido_id: int):

    if seguidor_id == seguido_id:
        return None, "No puedes seguirte a ti mismo"

    seguidor = db.query(Usuarios).filter_by(id_usuario=seguidor_id).first()
    seguido = db.query(Usuarios).filter_by(id_usuario=seguido_id).first()

    if not seguidor or not seguido:
        return None, "Usuario no encontrado"

    ya_sigue = db.query(Seguidores).filter_by(
        id_seguidor=seguidor_id,
        id_seguido=seguido_id
    ).first()

    if ya_sigue:
        return None, "Ya sigues a este usuario"

    nuevo = Seguidores(
        id_seguidor=seguidor_id,
        id_seguido=seguido_id,
        fecha_seguimiento=datetime.utcnow()
    )

    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)

    return nuevo, None


def dejar_de_seguir(db: Session, seguidor_id: int, seguido_id: int):
    registro = db.query(Seguidores).filter_by(
        id_seguidor=seguidor_id,
        id_seguido=seguido_id
    ).first()

    if not registro:
        return None, "No sigues a este usuario"

    db.delete(registro)
    db.commit()

    return True, None


def obtener_seguidores(db: Session, user_id: int):
    return db.query(Seguidores).filter_by(id_seguido=user_id).all()


def obtener_seguidos(db: Session, user_id: int):
    return db.query(Seguidores).filter_by(id_seguidor=user_id).all()


def obtener_sugerencias_de_usuarios(db: Session, id_usuario: int):

    # IDs de los usuarios que ya sigo
    seguidos_ids = {
        s.id_seguido
        for s in db.query(Seguidores).filter(Seguidores.id_seguidor == id_usuario).all()
    }

    # No sugerirme a mí mismo
    seguidos_ids.add(id_usuario)

    perfil = db.query(Perfiles).filter(Perfiles.id_usuario == id_usuario).first()

    sugerencias = []

    
    if perfil and perfil.generos:
        generos_ids = [g.id_genero for g in perfil.generos]

        por_genero = (
            db.query(Usuarios)
            .join(Perfiles)
            .join(Perfiles.generos)
            .filter(
                Perfiles.id_usuario != id_usuario,
                Usuarios.id_usuario.notin(seguidos_ids),
                Perfiles.generos.any(Generos.id_genero.in_(generos_ids))
            )
            .limit(10)
            .all()
        )

        sugerencias.extend(por_genero)

    amigos_mis_amigos = (
        db.query(Usuarios)
        .join(Seguidores, Seguidores.id_seguido == Usuarios.id_usuario)
        .filter(
            Seguidores.id_seguidor.in_(seguidos_ids),
            Usuarios.id_usuario.notin(seguidos_ids)
        )
        .limit(10)
        .all()
    )

    sugerencias.extend(amigos_mis_amigos)

  
    otros = (
        db.query(Usuarios)
        .filter(Usuarios.id_usuario.notin(seguidos_ids))
        .limit(10)
        .all()
    )

    sugerencias.extend(otros)

    vistos = set()
    resultado = []

    for usuario in sugerencias:
        if usuario.id_usuario not in vistos:
            vistos.add(usuario.id_usuario)
            resultado.append({
                "id_usuario": usuario.id_usuario,
                "nickname": usuario.nickname,
                "nombre_usuario": usuario.nombre_usuario
            })

    return resultado
