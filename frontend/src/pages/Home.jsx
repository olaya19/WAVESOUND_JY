import { useEffect, useState } from "react";
import SongCard from "../components/SongCard";
import { getCancionesPublic } from "../services/cancionesService";
import "./home.css";

function Home() {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const [canciones, setCanciones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCancionesPublic()
      .then((data) => {
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
      {/* 🟣 SIDEBAR IZQUIERDA */}
      <aside className="sidebar-left">
        <h3>Artistas a seguir</h3>
        <ul>
          <li>🎤 Martista</li>
          <li>🎶 Lucita</li>
          <li>🎧 Luker</li>
        </ul>

        <h3>Productores a seguir</h3>
        <ul>
          <li>🎛️ Martista</li>
          <li>🎚️ Lucita</li>
          <li>🎵 Luker</li>
        </ul>
      </aside>

      {/* 🟢 CONTENIDO CENTRAL */}
      <main className="feed">
        <div className="welcome-section">
          <h2>Bienvenido, {user.nombre_usuario || "Invitado"}</h2>
        </div>

        <div className="songs-feed">
          {loading && <p>Cargando canciones...</p>}
          {!loading && canciones.length === 0 && (
            <p>No hay canciones disponibles por ahora 🎧</p>
          )}

          {canciones.map((c) => (
            <SongCard
              key={c.id_cancion}
              usuario={c.id_usuario || "Artista"}
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

      {/* 🟡 SIDEBAR DERECHA */}
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





