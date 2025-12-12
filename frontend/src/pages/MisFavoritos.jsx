// src/pages/MisFavoritos.jsx
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import SongCard from "../components/SongCard";
import { obtenerFavoritos } from "../services/favoritosService";
import "./MisFavoritos.css";

function MisFavoritos() {
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavoritos = async () => {
      try {
        const data = await obtenerFavoritos();
        console.log("Favoritos recibidos:", data);
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
            const c = f.cancion || {}; // ← evita romper si falta

            const user = c.usuario || {};

            const userName =
              user.nombre_artista ||
              user.nickname ||
              user.nombre_usuario ||
              "Artista desconocido";

            return (
              <SongCard
                key={c.id_cancion}
                id_cancion={c.id_cancion}
                usuario={userName}
                titulo={c.titulo || "Sin título"}
                duracion={
                  c.duracion
                    ? isNaN(c.duracion)
                      ? c.duracion
                      : `${c.duracion} seg`
                    : "3:00"
                }
                descripcion={c.descripcion || "Sin descripción"}
                archivo_url={c.archivo_url || ""}
                portada_url={c.portada_url || ""}
                foto_perfil={user.foto_perfil || ""}
              />
            );
          })}
      </div>
    </div>
  );
}

export default MisFavoritos;
