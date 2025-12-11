// src/pages/MisFavoritos.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SongCard from "../components/SongCard";
import { obtenerFavoritos } from "../services/favoritosService";
import "./MisFavoritos.css";

function MisFavoritos() {
  const navigate = useNavigate();
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavoritos = async () => {
      try {
        const data = await obtenerFavoritos();
        setFavoritos(data);
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
            const c = f.cancion; // Asegurarse que la API retorna la canción completa
            const userName =
              c.usuario?.nombre_artista ||
              c.usuario?.nickname ||
              c.usuario?.nombre_usuario ||
              "Desconocido";

            return (
              <SongCard
                key={c.id_cancion}
                id_cancion={c.id_cancion}
                usuario={userName}
                titulo={c.titulo}
                duracion={c.duracion ? `${c.duracion} seg` : "3:00"}
                descripcion={c.descripcion || "Sin descripción"}
                archivo_url={c.archivo_url}
                portada_url={c.portada_url || ""}
                foto_perfil={c.usuario?.foto_perfil || ""}
              />
            );
          })}
      </div>
    </div>
  );
}

export default MisFavoritos;
