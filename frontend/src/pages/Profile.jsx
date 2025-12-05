import React, { useEffect, useState } from "react";
import SongCard from "../components/SongCard";
import { getCancionesByUser } from "../services/cancionesService";
import { crearPerfil, getMiPerfil, editarPerfil } from "../services/perfilService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const token = user?.token || "";

  const [canciones, setCanciones] = useState([]);
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  const [imgLoaded, setImgLoaded] = useState(false);
  const [previewImg, setPreviewImg] = useState(null);

  const [formData, setFormData] = useState({
    nombre_artista: "",
    biografia: "",
    genero_musical: "",
    foto_perfil: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataCanciones = await getCancionesByUser(user.id_usuario);
        setCanciones(dataCanciones);

        const perfilData = await getMiPerfil(token);
        setPerfil(perfilData);

      } catch {
        console.warn("No hay perfil creado.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user.id_usuario, token]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];

      if (file && !["image/jpeg", "image/png", "image/webp", "image/jpg"].includes(file.type)) {
        Swal.fire({ icon: "error", title: "Formato inválido", text: "Solo JPG, JPEG, PNG o WEBP" });
        return;
      }

      setFormData({ ...formData, [name]: file });

      const preview = URL.createObjectURL(file);
      setPreviewImg(preview);

    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCrearPerfil = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("nombre_artista", formData.nombre_artista);
    fd.append("biografia", formData.biografia);
    fd.append("generos_ids", JSON.stringify([formData.genero_musical]));;
    if (formData.foto_perfil) fd.append("foto_perfil", formData.foto_perfil);

    try {
      await crearPerfil(fd, token);
      Swal.fire({ icon: "success", title: "Perfil creado", timer: 1500, showConfirmButton: false });
      window.location.reload();

    } catch {
      Swal.fire({ icon: "error", title: "Error al crear perfil" });
    }
  };

  const handleEditarPerfil = async (e) => {
    e.preventDefault();

    const fd = new FormData();

    if (formData.nombre_artista) fd.append("nombre_artista", formData.nombre_artista);
    if (formData.biografia) fd.append("biografia", formData.biografia);
    if (formData.genero_musical) fd.append("generos_ids", JSON.stringify([formData.genero_musical]));

    if (formData.foto_perfil) fd.append("foto_perfil", formData.foto_perfil);

    try {
      const updated = await editarPerfil(fd, token);
      setPerfil(updated);
      setEditMode(false);
      setPreviewImg(null);

      Swal.fire({ icon: "success", title: "Perfil actualizado", timer: 1500, showConfirmButton: false });

    } catch {
      Swal.fire({ icon: "error", title: "Error al actualizar perfil" });
    }
  };

  if (loading) return <p className="loading">Cargando...</p>;

  // ===========================
  // CREAR PERFIL
  // ===========================
  if (!perfil) {
    return (
      <div className="create-profile-container">
        <h2>Crear Perfil</h2>

        <form className="profile-form" onSubmit={handleCrearPerfil}>
          <input type="text" name="nombre_artista" placeholder="Nombre artístico" onChange={handleChange} required />
          <textarea name="biografia" placeholder="Biografía" onChange={handleChange} />
          <input type="text" name="genero_musical" placeholder="Género musical" onChange={handleChange} />

          {previewImg && (
            <img src={previewImg} className="preview-image" alt="preview" />
          )}

          <label className="file-label">
            Subir foto de perfil
            <input type="file" name="foto_perfil" accept="image/*" onChange={handleChange} />
          </label>

          <button type="submit" className="btn-crear">Crear</button>
        </form>
      </div>
    );
  }

  const fotoURL = previewImg
    ? previewImg
    : perfil.foto_perfil
      ? `http://127.0.0.1:8000/${perfil.foto_perfil}`
      : "/default-avatar.png";

  // ===========================
  // PERFIL EXISTENTE
  // ===========================
  return (
    <div className="profile-container-main">
      
      <div className="artist-card">

        <div className="artist-header">

          {!imgLoaded && <div className="artist-image-skeleton"></div>}

          <img
            src={fotoURL}
            alt="Foto"
            className="artist-image"
            onLoad={() => setImgLoaded(true)}
            style={{
              opacity: imgLoaded ? 1 : 0,
              transition: "opacity 0.3s ease-in-out"
            }}
          />

          <h2 className="artist-name">{perfil.nombre_artista}</h2>
        </div>

        <button className="btn-editar" onClick={() => setEditMode(true)}>
          Editar Perfil
        </button>
      </div>

      <div className="artist-info">
        {!editMode ? (
          <>
            <h3>Biografía</h3>
            <p>{perfil.biografia || "Sin biografía"}</p>

            <h3>Género Musical</h3>
            <p>{perfil.genero_musical || "No especificado"}</p>
          </>
        ) : (
          <form className="edit-form" onSubmit={handleEditarPerfil}>

            {previewImg && (
              <img src={previewImg} className="preview-image" alt="preview" />
            )}

            <input type="text" name="nombre_artista" placeholder="Nuevo nombre" onChange={handleChange} />
            <textarea name="biografia" placeholder="Actualizar biografía" onChange={handleChange} />
            <input type="text" name="genero_musical" placeholder="Actualizar género" onChange={handleChange} />

            <label className="file-label">
              Subir nueva foto
              <input type="file" name="foto_perfil" accept="image/*" onChange={handleChange} />
            </label>

            <button type="submit" className="btn-guardar">Guardar</button>
            <button type="button" className="btn-cancelar" onClick={() => { setEditMode(false); setPreviewImg(null); }}>
              Cancelar
            </button>
          </form>
        )}
      </div>

      <div className="artist-songs">
        <h3>Canciones Subidas</h3>

        {canciones.length > 0 ? (
          canciones.map((c) => (
            <SongCard key={c.id_cancion} {...c} usuario={user.nombre_usuario} />
          ))
        ) : (
          <p>No tienes canciones registradas.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
