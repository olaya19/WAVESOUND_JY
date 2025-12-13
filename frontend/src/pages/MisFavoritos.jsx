// src/pages/MisFavoritos.jsx
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import SongMiniCard from "../components/SongMiniCard";
import { obtenerFavoritos } from "../services/favoritosService";
import "./MisFavoritos.css";

function MisFavoritos() {
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavoritos = async () => {
      try {
        const data = await obtenerFavoritos();
        setFavoritos(Array.isArray(data) ? data : []);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudieron cargar tus favoritos",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFavoritos();
  }, []);

  return (
    <div className="favoritos-container">
      <h2>Mis Canciones Favoritas</h2>

      {loading && <p>Cargando favoritos...</p>}

      {!loading && favoritos.length === 0 && (
        <p>No tienes canciones favoritas aún 🎧</p>
      )}

      <div className="favoritos-grid">
        {!loading &&
          favoritos.map((f) => {
            const c = f.cancion || {};

            return (
              <SongMiniCard
                key={c.id_cancion}
                titulo={c.titulo}
                archivo_url={c.archivo_url}
                portada_url={c.portada_url}
              />
            );
          })}
      </div>
    </div>
  );
}

export default MisFavoritos;
