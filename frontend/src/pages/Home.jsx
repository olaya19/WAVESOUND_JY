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

  // ✅ Traducción de roles
  const getRolName = (idRol) => {
    switch (idRol) {
      case 1:
        return "Administrador";
      case 2:
        return "Oyente";
      case 3:
        return "Artista";
      case 4:
        return "Productor";
      default:
        return "Invitado";
    }
  };

  // 🔹 Cargar canciones públicas
  useEffect(() => {
    getCancionesPublic()
      .then((data) => {
        console.log("🎵 Canciones recibidas:", data);
        setCanciones(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error al cargar canciones:", err);
        setLoading(false);
        Swal.fire({
          title: "Error",
          text: "No se pudieron cargar las canciones.",
          icon: "error",
          confirmButtonColor: "#6C63FF",
        });
      });
  }, []);

  // 🔸 Lógica para botones
  const handleClick = (action) => {
    if (!user.id_usuario) {
      Swal.fire({
        title: "Inicia sesión",
        text: "Debes iniciar sesión para acceder a esta función.",
        icon: "info",
        confirmButtonText: "Ir al Login",
        confirmButtonColor: "#6C63FF",
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
          confirmButtonColor: "#FF5757",
        });
      } else if (rol === 1) {
        Swal.fire({
          title: "Función restringida",
          text: "El administrador no puede subir canciones 🎵",
          icon: "info",
          confirmButtonColor: "#6C63FF",
        });
      } else {
        Swal.fire({
          title: "Redirigiendo...",
          text: "Prepárate para subir tu nuevo tema 🎶",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => navigate("/subir-cancion"), 1500);
      }
    }

    if (action === "playlist") {
      Swal.fire({
        title: "Tus playlists",
        text: "Cargando tus listas de reproducción...",
        icon: "info",
        showConfirmButton: false,
        timer: 1000,
      });
      setTimeout(() => navigate("/playlist"), 1000);
    }

    if (action === "likes") {
      Swal.fire({
        title: "Cargando tus Me Gusta 💜",
        text: "Un momento...",
        icon: "info",
        showConfirmButton: false,
        timer: 1000,
      });
      setTimeout(() => navigate("/me-gusta"), 1000);
    }
  };

  return (
    <div className="home-container">
      {/* 🟣 Sidebar izquierda */}
      <SideLeft />

      {/* 🟢 Contenido principal */}
      <main className="feed">
        <div className="welcome-section">
          <h2>
            Bienvenido, {user.nombre_usuario || "Invitado"}{" "}
            <span style={{ fontWeight: "normal", color: "#888" }}>
              ({getRolName(user.id_rol)})
            </span>
          </h2>
        </div>

        <div className="songs-feed">
          {loading && <p>Cargando canciones...</p>}
          {!loading && canciones.length === 0 && (
            <p>No hay canciones disponibles por ahora 🎧</p>
          )}

          {!loading &&
            canciones.map((c) => (
              <SongCard
                key={c.id_cancion}
                id_cancion={c.id_cancion}  // <-- ahora sí se pasa
                usuario={c.usuario?.nombre_usuario || "Desconocido"}
                rol={getRolName(c.usuario?.id_rol)}
                titulo={c.titulo}
                duracion={c.duracion ? `${c.duracion} seg` : "3:00"}
                likes={c.likes || 0}
                descripcion={c.descripcion || "Sin descripción"}
                archivo_url={c.archivo_url}
                portada_url={c.portada_url || ""}
              />
            ))}
        </div>
      </main>

      {/* 🟡 Sidebar derecha */}
      <aside className="sidebar-right">
        <h3>La Música Es Vida</h3>
        <p>📢 Novedad: Sube tu primera canción y compártela</p>

        <button className="upload-btn" onClick={() => handleClick("subir")}>
          🎤 Subir Tema
        </button>

        <div className="extras">
          <p
            className="clickable"
            onClick={() => handleClick("playlist")}
            style={{ cursor: "pointer" }}
          >
            ⭐ Tus playlist
          </p>
          <p
            className="clickable"
            onClick={() => handleClick("likes")}
            style={{ cursor: "pointer" }}
          >
            💜 Tus Me Gusta
          </p>
        </div>
      </aside>
    </div>
  );
}

export default Home;


