import React, { useEffect, useState } from "react";
import SongCard from "../components/SongCard"; // ✅ Reutilizar el mismo del home
import "./Profile.css";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const [canciones, setCanciones] = useState([]);

  useEffect(() => {
    // Simulación de canciones del usuario (más adelante vendrá del backend)
    setCanciones([
      {
        id_cancion: 1,
        titulo: "Mar de emociones",
        descripcion: "Una balada emotiva que expresa lo que siento.",
        duracion: "2:30",
        archivo_url: "",
        portada_url: "",
        likes: 12,
        id_usuario: user.nombre_usuario || "Artista",
      },
      {
        id_cancion: 2,
        titulo: "Luna Gris",
        descripcion: "Un tema profundo con sonidos melódicos.",
        duracion: "1:50",
        archivo_url: "",
        portada_url: "",
        likes: 8,
        id_usuario: user.nombre_usuario || "Artista",
      },
    ]);
  }, [user]);

  if (!user.id_rol) {
    return (
      <div className="profile-container">
        <h2>No has iniciado sesión</h2>
        <button onClick={() => (window.location.href = "/Login")}>
          Iniciar Sesión
        </button>
      </div>
    );
  }

  return (
    <div className="profile-page">
      {/* Sidebar izquierda - Datos del usuario */}
      <aside className="profile-left">
        <div className="profile-card">
          <div className="profile-avatar">
            <i className="fa-solid fa-user"></i>
          </div>
          <h2>{user.nombre_usuario}</h2>
          <button className="follow-btn">Seguir</button>
          <div className="stats">
            <p><strong>9</strong> seguidores</p>
            <p><strong>25</strong> reproducciones</p>
          </div>
        </div>
      </aside>

      {/* Sección central - Bio */}
      <section className="profile-center">
        <h3>Artista</h3>
        <p className="bio">
          Holaaa, escribo e interpreto lo que siento, lo que veo y lo que a veces no me atrevo a decir. 
          Bienvenid@ a mi mundo sonoro 🎶✨
        </p>

        <div className="profile-info">
          <p><strong>Géneros:</strong> Balada • Pop • Rock</p>
          <p><strong>Habilidades:</strong> Baterista • Compositor • Guitarrista</p>
          <p><strong>Perfil Oficial:</strong> Artista Verificado ✅</p>
        </div>
      </section>

      {/* Sección derecha - Música y álbumes */}
      <aside className="profile-right">
        <div className="songs-section">
          <h3>🎵 Destacadas del Artista</h3>
          {canciones.map((c) => (
            <SongCard
              key={c.id_cancion}
              usuario={c.id_usuario}
              titulo={c.titulo}
              duracion={c.duracion}
              likes={c.likes}
              descripcion={c.descripcion}
              archivo_url={c.archivo_url}
              portada_url={c.portada_url}
            />
          ))}
        </div>

        <div className="albums-section">
          <h3>Álbumes</h3>
          <p>Aún no hay álbumes publicados...</p>
        </div>
      </aside>
    </div>
  );
}

export default Profile;

