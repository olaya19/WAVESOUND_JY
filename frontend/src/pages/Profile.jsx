import React, { useEffect, useState } from "react";
import SongCard from "../components/SongCard";
import { getCancionesByUser } from "../services/cancionesService";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const [canciones, setCanciones] = useState([]);

  // 🔹 Traer canciones reales del usuario
  useEffect(() => {
    const fetchCanciones = async () => {
      if (!user?.id_usuario) return;
      const data = await getCancionesByUser(user.id_usuario);
      setCanciones(data);
    };

    fetchCanciones();
  }, [user?.id_usuario]);

  if (!user.id_rol) {
    return (
      <div className="profile-container">
        <h2>No has iniciado sesión</h2>
        <button onClick={() => navigate("/login")}>Iniciar Sesión</button>
      </div>
    );
  }

  return (
    <div className="profile-page">
      {/* ...tu diseño de perfil igual... */}

      <aside className="profile-right">
        <div className="songs-section">
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
      </aside>
    </div>
  );
}

export default Profile;

