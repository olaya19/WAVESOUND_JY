import React, { useEffect, useState } from "react";
import SongCard from "../components/SongCard";
import { getCancionesByUser } from "../services/cancionesService";
import { crearPerfil, getMiPerfil, editarPerfil } from "../services/perfilService";
import { getGeneros } from "../services/generosService";
import { getSeguidores } from "../services/seguidoresService";
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

  const [generos, setGeneros] = useState([]);
  const [generosSeleccionados, setGenerosSeleccionados] = useState([]);

  const [seguidoresCount, setSeguidoresCount] = useState(0);

  const [formData, setFormData] = useState({
    nombre_artista: "",
    biografia: "",
    foto_perfil: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cancionesData = await getCancionesByUser(user.id_usuario);
        setCanciones(cancionesData);

        const generosData = await getGeneros();
        setGeneros(generosData);

        const perfilData = await getMiPerfil(token);
        setPerfil(perfilData);

        setFormData({
          nombre_artista: perfilData?.nombre_artista || "",
          biografia: perfilData?.biografia || "",
          foto_perfil: null,
        });

        if (perfilData?.generos_ids) {
          setGenerosSeleccionados(perfilData.generos_ids);
        }

        // Contar seguidores usando servicio corregido
        const seguidores = await getSeguidores();
        setSeguidoresCount(seguidores.length);

      } catch {
        console.warn("No hay perfil creado o error al cargar datos.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user.id_usuario, token]);

  const toggleGenero = (id) => {
    setGenerosSeleccionados((prev) =>
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      setFormData({ ...formData, [name]: file });
      setPreviewImg(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCrearPerfil = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("nombre_artista", formData.nombre_artista);
    fd.append("biografia", formData.biografia);
    fd.append("generos_ids", JSON.stringify(generosSeleccionados));
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
    fd.append("nombre_artista", formData.nombre_artista);
    fd.append("biografia", formData.biografia);
    fd.append("generos_ids", JSON.stringify(generosSeleccionados));
    if (formData.foto_perfil) fd.append("foto_perfil", formData.foto_perfil);

    try {
      await editarPerfil(fd, token);
      Swal.fire({ icon: "success", title: "Perfil actualizado", timer: 1500, showConfirmButton: false });

      setEditMode(false);
      setPreviewImg(null);

      const updatedPerfil = await getMiPerfil(token);
      setPerfil(updatedPerfil);
      setGenerosSeleccionados(updatedPerfil.generos_ids);

      // Actualizar seguidores
      const seguidores = await getSeguidores();
      setSeguidoresCount(seguidores.length);

    } catch {
      Swal.fire({ icon: "error", title: "Error al actualizar perfil" });
    }
  };

  if (loading) return <p className="loading">Cargando...</p>;

  const fotoURL = previewImg
    ? previewImg
    : perfil?.foto_perfil
    ? perfil.foto_perfil
    : "/default-avatar.png";

  // =============================
  // PERFIL NO EXISTE
  // =============================
  if (!perfil) {
    return (
      <div className="create-profile-container">
        <h2>Crear Perfil</h2>
        <form className="profile-form" onSubmit={handleCrearPerfil}>
          <input type="text" name="nombre_artista" placeholder="Nombre artístico" onChange={handleChange} required />
          <textarea name="biografia" placeholder="Biografía" onChange={handleChange} />

          <label>Géneros musicales</label>
          <div className="generos-container">
            {generos.map(g => (
              <div
                key={g.id_genero}
                className={`genero-card ${generosSeleccionados.includes(g.id_genero) ? "selected" : ""}`}
                onClick={() => toggleGenero(g.id_genero)}
              >
                {g.nombre_genero}
              </div>
            ))}
          </div>

          {previewImg && <img src={previewImg} className="preview-image" alt="preview" />}

          <label className="file-label">
            Subir foto de perfil
            <input type="file" name="foto_perfil" accept="image/*" onChange={handleChange} />
          </label>

          <button type="submit" className="btn-crear">Crear</button>
        </form>
      </div>
    );
  }

  // =============================
  // PERFIL EXISTE
  // =============================
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
            style={{ opacity: imgLoaded ? 1 : 0, transition: "opacity 0.3s" }}
          />
          <h2 className="artist-name">{perfil.nombre_artista}</h2>
          <p className="followers-count">{seguidoresCount} seguidores</p>
        </div>
        <button className="btn-editar" onClick={() => setEditMode(true)}>Editar Perfil</button>
      </div>

      <div className="artist-info">
        {!editMode ? (
          <>
            <h3>Biografía</h3>
            <p>{perfil.biografia || "Sin biografía"}</p>

            <h3>Géneros Musicales</h3>
            <p>
              {perfil.generos?.length > 0
                ? perfil.generos.join(", ")
                : "No especificado"}
            </p>
          </>
        ) : (
          <form className="edit-form" onSubmit={handleEditarPerfil}>
            {previewImg && <img src={previewImg} className="preview-image" alt="preview" />}

            <input type="text" name="nombre_artista" value={formData.nombre_artista} onChange={handleChange} />
            <textarea name="biografia" value={formData.biografia} onChange={handleChange} />

            <label>Géneros musicales</label>
            <div className="generos-container">
              {generos.map(g => (
                <div
                  key={g.id_genero}
                  className={`genero-card ${generosSeleccionados.includes(g.id_genero) ? "selected" : ""}`}
                  onClick={() => toggleGenero(g.id_genero)}
                >
                  {g.nombre_genero}
                </div>
              ))}
            </div>

            <label className="file-label">
              Subir nueva foto
              <input type="file" name="foto_perfil" accept="image/*" onChange={handleChange} />
            </label>

            <button type="submit" className="btn-guardar">Guardar</button>
            <button type="button" className="btn-cancelar" onClick={() => { setEditMode(false); setPreviewImg(null); }}>Cancelar</button>
          </form>
        )}
      </div>

      <div className="artist-songs">
        <h3>Canciones Subidas</h3>
        {canciones.length > 0 ? (
          canciones.map(c => <SongCard key={c.id_cancion} {...c} usuario={user.nombre_usuario} />)
        ) : (
          <p>No tienes canciones registradas.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
