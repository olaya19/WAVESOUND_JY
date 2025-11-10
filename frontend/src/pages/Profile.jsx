// src/pages/Profile.jsx
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
  const [formData, setFormData] = useState({
    nombre_artista: "",
    biografia: "",
    genero_musical: "",
    foto_perfil: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user?.id_usuario) {
          console.warn("⚠️ No hay usuario logueado, no se puede cargar perfil.");
          return;
        }

        console.log("🔍 Cargando datos del usuario:", user.nombre_usuario);

        const dataCanciones = await getCancionesByUser(user.id_usuario);
        setCanciones(dataCanciones);
        console.log(`🎵 Se cargaron ${dataCanciones.length} canciones del usuario.`);

        const perfilData = await getMiPerfil(token);
        setPerfil(perfilData);
        console.log("✅ Perfil cargado correctamente:", perfilData);
      } catch (err) {
        console.warn("⚠️ El usuario aún no tiene perfil creado o el token es inválido.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.id_usuario, token]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
      console.log(`📸 Imagen seleccionada: ${files[0].name}`);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCrearPerfil = async (e) => {
    e.preventDefault();
    try {
      const perfilData = {
        id_usuario: user.id_usuario,
        nombre_artista: formData.nombre_artista,
        biografia: formData.biografia,
        genero_musical: formData.genero_musical,
        foto_perfil: formData.foto_perfil ? formData.foto_perfil.name : null,
      };

      console.log("🆕 Creando perfil con datos:", perfilData);
      await crearPerfil(perfilData);

      Swal.fire({
        icon: "success",
        title: "Perfil creado con éxito",
        showConfirmButton: false,
        timer: 1500,
        background: "#121212",
        color: "#fff",
      });

      console.log("✅ Perfil creado correctamente.");
      window.location.reload();
    } catch (err) {
      console.error("❌ Error al crear perfil:", err);
      Swal.fire({
        icon: "error",
        title: "Error al crear perfil",
        text: "Verifica los datos e intenta nuevamente.",
        background: "#121212",
        color: "#fff",
      });
    }
  };

  const handleEditarPerfil = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) fd.append(key, value);
    });

    try {
      console.log("✏️ Enviando actualización de perfil:", formData);
      const updated = await editarPerfil(fd, token);
      setPerfil(updated);
      setEditMode(false);

      Swal.fire({
        icon: "success",
        title: "Perfil actualizado correctamente",
        showConfirmButton: false,
        timer: 1500,
        background: "#121212",
        color: "#fff",
      });

      console.log("✅ Perfil actualizado:", updated);
    } catch (err) {
      console.error("❌ Error al actualizar perfil:", err);
      Swal.fire({
        icon: "error",
        title: "Error al actualizar",
        text: "Intenta nuevamente.",
        background: "#121212",
        color: "#fff",
      });
    }
  };

  if (!user.id_rol) {
    console.warn("🚫 Usuario no logueado, redirigiendo al login...");
    return (
      <div className="profile-container not-logged">
        <h2>No has iniciado sesión</h2>
        <button
          className="login-btn"
          onClick={() => {
            Swal.fire({
              icon: "info",
              title: "Inicia sesión para continuar",
              text: "Debes iniciar sesión para acceder a tu perfil.",
              confirmButtonText: "Ir al login",
              confirmButtonColor: "#6e00ff",
              background: "#121212",
              color: "#fff",
            }).then(() => {
              navigate("/login");
              window.location.reload();
            });
          }}
        >
          Iniciar Sesión
        </button>
      </div>
    );
  }

  if (loading) {
    console.log("⏳ Cargando perfil...");
    return <p className="loading">Cargando perfil...</p>;
  }

  if (!perfil) {
    console.log("🆕 No hay perfil, mostrando formulario de creación.");
    return (
      <div className="create-profile-container">
        <h2>🎤 Crea tu perfil de artista</h2>
        <form className="profile-form" onSubmit={handleCrearPerfil}>
          <input type="text" name="nombre_artista" placeholder="Nombre artístico" onChange={handleChange} required />
          <textarea name="biografia" placeholder="Escribe una biografía corta..." onChange={handleChange} />
          <input type="text" name="genero_musical" placeholder="Género musical" onChange={handleChange} />
          <input type="file" name="foto_perfil" accept="image/*" onChange={handleChange} />
          <button type="submit" className="btn-crear">Crear perfil</button>
        </form>
      </div>
    );
  }

  console.log("👤 Mostrando perfil en pantalla:", perfil);

  return (
    <div className="profile-container-main">
      <div className="artist-card">
        <div className="artist-header">
          <img
            src={
              perfil.foto_perfil
                ? `http://localhost:8000/${perfil.foto_perfil}`
                : "/default-avatar.png"
            }
            alt="Foto del artista"
            className="artist-image"
            onError={(e) => {
              e.target.src = "/default-avatar.png";
              console.warn("⚠️ No se pudo cargar la foto de perfil, se usa imagen por defecto.");
            }}
          />
          <h2 className="artist-name">{perfil.nombre_artista || user.nombre_usuario}</h2>
          <button className="follow-btn">seguir</button>
        </div>

        <div className="artist-stats">
          <div>
            <h4>9</h4>
            <p>seguidores</p>
          </div>
          <div>
            <h4>25</h4>
            <p>reproducciones</p>
          </div>
        </div>
      </div>

      <div className="artist-info">
        <h3>Artista</h3>
        <p className="artist-bio">{perfil.biografia || "Sin biografía"}</p>

        <div className="artist-section">
          <h4>Géneros</h4>
          <p>{perfil.genero_musical || "Género no especificado"}</p>
        </div>

        <div className="artist-section">
          <h4>Perfil Oficial – Artista Verificado ✅</h4>
          <p>
            Este es el perfil auténtico del/la artista en WaveSound. La verificación garantiza su identidad y ofrece a los fans acceso directo a su música, lanzamientos y contenido exclusivo.
          </p>
        </div>

        {!editMode ? (
          <button className="btn-editar" onClick={() => setEditMode(true)}>Editar Perfil</button>
        ) : (
          <form className="edit-form" onSubmit={handleEditarPerfil}>
            <input type="text" name="nombre_artista" placeholder="Nuevo nombre artístico" onChange={handleChange} />
            <textarea name="biografia" placeholder="Actualizar biografía" onChange={handleChange} />
            <input type="text" name="genero_musical" placeholder="Actualizar género musical" onChange={handleChange} />
            <input type="file" name="foto_perfil" accept="image/*" onChange={handleChange} />
            <button type="submit" className="btn-guardar">Guardar cambios</button>
            <button type="button" className="btn-cancelar" onClick={() => setEditMode(false)}>Cancelar</button>
          </form>
        )}
      </div>

      <div className="artist-songs">
        <h3>🎵 Canciones del artista</h3>
        {canciones.length > 0 ? (
          canciones.map((c) => (
            <SongCard
              key={c.id_cancion}
              usuario={user.nombre_usuario}
              titulo={c.titulo}
              duracion={c.duracion}
              likes={c.likes}
              descripcion={c.descripcion}
              archivo_url={c.archivo_url}
              portada_url={c.portada_url}
            />
          ))
        ) : (
          <p>No tienes canciones registradas aún.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;

