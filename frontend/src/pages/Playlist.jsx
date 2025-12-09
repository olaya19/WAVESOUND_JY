import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  obtenerPlaylistsUsuario,
  crearPlaylist,
  agregarCancionAPlaylist,
  obtenerCancionesPlaylist
} from "../services/playlistsService";

import SongMiniCard from "../components/SongMiniCard";
import "./Playlist.css";

function Playlist() {
  const [playlists, setPlaylists] = useState([]);
  const [cancionesPorPlaylist, setCancionesPorPlaylist] = useState({});
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user")) || {};

  useEffect(() => {
    if (!user.id_usuario) return;
    cargarPlaylists();
  }, []);

  const cargarPlaylists = async () => {
    try {
      const data = await obtenerPlaylistsUsuario(user.id_usuario);
      setPlaylists(data);
      setLoading(false);

      // Cargar canciones de cada playlist
      for (const pl of data) {
        const canciones = await obtenerCancionesPlaylist(pl.id_lista);
        setCancionesPorPlaylist((prev) => ({
          ...prev,
          [pl.id_lista]: canciones,
        }));
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudieron cargar las playlists", "error");
    }
  };

  const crearNuevaPlaylist = async () => {
    const { value: values } = await Swal.fire({
      title: "Nueva Playlist",
      html: `
        <input id="swal-nombre" class="swal2-input" placeholder="Nombre de la playlist">
        <textarea id="swal-desc" class="swal2-textarea" placeholder="Descripción opcional"></textarea>
      `,
      showCancelButton: true,
      preConfirm: () => {
        const nombre = document.getElementById("swal-nombre").value;
        const descripcion = document.getElementById("swal-desc").value;

        if (!nombre) {
          Swal.showValidationMessage("El nombre es obligatorio");
          return;
        }
        return { nombre, descripcion };
      },
    });

    if (!values) return;

    try {
      await crearPlaylist({
        id_usuario: user.id_usuario,
        nombre: values.nombre,
        descripcion: values.descripcion || "",
        privada: false,
      });

      Swal.fire("Éxito", "Playlist creada correctamente", "success");
      cargarPlaylists();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudo crear la playlist", "error");
    }
  };

  const agregarCancion = async (id_lista) => {
    const { value: id_cancion } = await Swal.fire({
      title: "Agregar canción",
      input: "number",
      inputLabel: "ID de la canción",
      inputPlaceholder: "Ingresa el ID",
      showCancelButton: true,
    });

    if (!id_cancion) return;

    try {
      await agregarCancionAPlaylist(id_lista, id_cancion);

      Swal.fire("Éxito", "Canción agregada", "success");

      const canciones = await obtenerCancionesPlaylist(id_lista);
      setCancionesPorPlaylist((prev) => ({
        ...prev,
        [id_lista]: canciones,
      }));
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudo agregar la canción", "error");
    }
  };

  return (
    <div className="playlist-container">

      <div className="playlist-header">
        <h2>Mis Playlists</h2>
        <button className="crear-btn" onClick={crearNuevaPlaylist}>
          + Crear Playlist
        </button>
      </div>

      {loading && <p>Cargando playlists...</p>}
      {!loading && playlists.length === 0 && <p>No tienes playlists 😢</p>}

      {!loading &&
        playlists.map((pl) => (
          <div key={pl.id_lista} className="playlist-card">

            {/* INFO */}
            <div className="playlist-info">
              <h3>{pl.nombre_lista}</h3>
              <p>{pl.descripcion || "Sin descripción"}</p>
            </div>

            {/* BOTÓN */}
            <div className="playlist-actions">
              <button onClick={() => agregarCancion(pl.id_lista)}>
                + Agregar canción
              </button>
            </div>

            {/* CANCIONES DENTRO DE LA TARJETA */}
            <div className="playlist-canciones">
              {(cancionesPorPlaylist[pl.id_lista] || []).length === 0 && (
                <p style={{ color: "#aaa", fontSize: "13px" }}>
                  No hay canciones en esta playlist
                </p>
              )}

              {(cancionesPorPlaylist[pl.id_lista] || []).map((can) => (
                <SongMiniCard
                  key={can.id_cancion}
                  titulo={can.titulo}
                  archivo_url={can.archivo_url}
                  portada_url={can.portada_url}
                />
              ))}
            </div>

          </div>
        ))}
    </div>
  );
}

export default Playlist;

