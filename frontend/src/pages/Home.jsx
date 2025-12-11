import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SongCard from "../components/SongCard";
import SideLeft from "../components/SideLeft";
import { getCancionesPublic } from "../services/cancionesService";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const [canciones, setCanciones] = useState([]);
  const [loading, setLoading] = useState(true);

  const getRolName = (idRol) => {
    switch (idRol) {
      case 1: return "Administrador";
      case 2: return "Oyente";
      case 3: return "Artista";
      case 4: return "Productor";
      default: return "Invitado";
    }
  };

  useEffect(() => {
    getCancionesPublic()
      .then((data) => {
        setCanciones(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        Swal.fire({
          title: "Error",
          text: "No se pudieron cargar las canciones.",
          icon: "error",
        });
      });
  }, []);

  const handleClick = (action) => {
    if (!user.id_usuario) {
      Swal.fire({
        title: "Inicia sesión",
        text: "Debes iniciar sesión para acceder.",
        icon: "info",
        confirmButtonText: "Ir al Login",
      }).then(() => navigate("/login"));
      return;
    }

    const rol = user.id_rol;

    if (action === "subir") {
      if (rol === 2) {
        Swal.fire({
          title: "Acceso denegado",
          text: "Los oyentes no pueden subir canciones 🎧",
          icon: "warning",
        });
      } else if (rol === 1) {
        Swal.fire({
          title: "Función restringida",
          text: "El administrador no puede subir canciones 🎵",
          icon: "info",
        });
      } else {
        navigate("/upload"); // Redirige a SongForm / Upload
      }
    }

    if (action === "playlist") navigate("/playlist");
    if (action === "likes") navigate("/mis-favoritos"); // Redirige a favoritos
  };

  return (
    <div className="home-container">
      <SideLeft />

      <main className="feed">
        <div className="welcome-section">
          <h2 className="titulo-bienvenida">
            Bienvenido, {user.nombre_usuario || "Invitado"}{" "}
            <span className="rol-usuario">({getRolName(user.id_rol)})</span>
          </h2>
        </div>

        <div className="songs-feed">
          {loading && <p>Cargando canciones...</p>}

          {!loading && canciones.length === 0 && (
            <p>No hay canciones disponibles 🎧</p>
          )}

          {!loading &&
            canciones.map((c) => {
              const userName =
                c.usuario?.nombre_artista ||
                c.usuario?.nickname ||
                c.usuario?.nombre_usuario ||
                "Desconocido";

              const rolName = c.usuario?.id_rol
                ? getRolName(c.usuario.id_rol)
                : "Invitado";

              let fotoPerfil = c.usuario?.foto_perfil || null;
              if (c.usuario?.foto_perfil) {
                fotoPerfil = c.usuario.foto_perfil.startsWith("http")
                  ? c.usuario.foto_perfil
                  : `http://127.0.0.1:8000${c.usuario.foto_perfil}`;
              }

              return (
                <SongCard
                  key={c.id_cancion}
                  id_cancion={c.id_cancion}
                  usuario={userName}
                  rol={rolName}
                  titulo={c.titulo}
                  duracion={c.duracion ? `${c.duracion} seg` : "3:00"}
                  descripcion={c.descripcion || "Sin descripción"}
                  archivo_url={c.archivo_url}
                  portada_url={c.portada_url || ""}
                  foto_perfil={fotoPerfil}
                />
              );
            })}
        </div>
      </main>

      <aside className="sidebar-right">
        <h3>La Música Es Vida</h3>
        <p>🎧 Comparte tu talento con el mundo</p>

        <button className="upload-btn" onClick={() => handleClick("subir")}>
          🎤 Subir Tema
        </button>

        <div className="extras">
          <button className="right-btn" onClick={() => handleClick("playlist")}>
            ⭐ Mis Playlist
          </button>
          <button className="right-btn" onClick={() => handleClick("likes")}>
            💜 Mis Me Gusta
          </button>
        </div>
      </aside>
    </div>
  );
}

export default Home;
