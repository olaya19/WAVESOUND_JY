import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import SideLeft from "../components/SideLeft";
import SideRight from "../components/SideRight";
import SongCard from "../components/SongCard";
import Profile from "./Profile"; 
import WorkRegister from "./WorkRegister";
import { getCancionesPublic } from "../services/cancionesService"; // ✅ Nuevo servicio público

import "../App.css";
import "./home.css"; // asegúrate que este archivo exista

function Home() {
  // Usuario logueado (si existe)
  const user = JSON.parse(localStorage.getItem("user")) || {};

  // Estado para las canciones del backend
  const [canciones, setCanciones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Llamar al endpoint público
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
    <div className="app-container">
      {/* NAV siempre arriba */}
      <Nav />

      <div className="main-layout">
        {/* Sidebar Izquierda */}
        <SideLeft />

        {/* Contenido principal */}
        <main className="main-content">
          <div className="welcome-section">
            <h3>Bienvenido, {user.nombre_usuario || "Invitado"}</h3>
          </div>

          <div className="songs-feed">
            {loading && <p>Cargando canciones...</p>}

            {!loading && canciones.length === 0 && (
              <p>No hay canciones disponibles por ahora 🎧</p>
            )}

            {/* ✅ Canciones reales del backend */}
            {canciones.map((c) => (
              <SongCard
                key={c.id_cancion}
                usuario={c.id_usuario || "Artista"}
                titulo={c.titulo}
                duracion={c.duracion ? `${c.duracion} seg` : "3:00"}
                likes={c.likes || 0} // si luego agregas likes
                descripcion={c.descripcion || "Sin descripción"}
                archivo_url={c.archivo_url} // 🔗 Dropbox directo (terminado en ?dl=1)
                portada_url={
                  c.portada_url || ""
                }
              />
            ))}
          </div>
        </main>

        {/* Sidebar Derecha */}
        <SideRight />
      </div>
    </div>
  );
}

export default Home;



