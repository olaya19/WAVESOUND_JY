import { useEffect, useState } from "react";
import SongCard from "../components/SongCard";
import SideLeft from "../components/SideLeft";
import { getCancionesPublic } from "../services/cancionesService";
import "./home.css";

function Home() {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const [canciones, setCanciones] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 función para traducir id_rol a texto legible
  const getRolName = (idRol) => {
    switch (idRol) {
      case 1:
        return "Artista";
      case 2:
        return "Productor";
      case 3:
        return "Oyente";
      case 4:
        return "Admin";
      default:
        return "Invitado";
    }
  };

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
      });
  }, []);

  return (
    <div className="home-container">
      {/* 🟣 Sidebar izquierda */}
      <SideLeft />

      {/* 🟢 Contenido principal */}
      <main className="feed">
        <div className="welcome-section">
          <h2>Bienvenido, {user.nombre_usuario || "Invitado"}</h2>
        </div>

        <div className="songs-feed">
          {loading && <p>Cargando canciones...</p>}
          {!loading && canciones.length === 0 && (
            <p>No hay canciones disponibles por ahora 🎧</p>
          )}

          {/* 🔹 Mostramos cada canción con los datos del artista real */}
          {!loading &&
            canciones.map((c) => (
              <SongCard
                key={c.id_cancion}
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
        <button className="upload-btn">Subir Tema</button>

        <div className="extras">
          <p>⭐ Tus playlist</p>
          <p>💜 Tus Me Gusta</p>
        </div>
      </aside>
    </div>
  );
}

export default Home;
