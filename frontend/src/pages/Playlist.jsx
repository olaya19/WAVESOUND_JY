import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { obtenerPlaylistsUsuario, crearPlaylist, agregarACancion } from "../services/playlistsService";
import "./Playlist.css";

function Playlist() {
  const [playlists, setPlaylists] = useState([]);
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
    } catch (err) {
      console.error(err);
      setLoading(false);
      Swal.fire("Error", "No se pudieron cargar las playlists", "error");
    }
  };

  const crearNuevaPlaylist = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Crear Nueva Playlist',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Nombre">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Descripción">',
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => [
        document.getElementById('swal-input1').value,
        document.getElementById('swal-input2').value
      ]
    });

    if (!formValues) return;

    try {
      const [nombre, descripcion] = formValues;
      await crearPlaylist(user.id_usuario, nombre, descripcion, false);
      Swal.fire("Éxito", `Playlist "${nombre}" creada`, "success");
      cargarPlaylists();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudo crear la playlist", "error");
    }
  };

  const agregarCancionAPlaylist = async (id_lista) => {
    const { value: id_cancion } = await Swal.fire({
      title: "Agregar canción",
      input: "number",
      inputLabel: "ID de la canción",
      inputPlaceholder: "Ingresa el ID",
      showCancelButton: true
    });

    if (!id_cancion) return;

    try {
      await agregarACancion(id_lista, id_cancion);
      Swal.fire("Éxito", "Canción agregada", "success");
      cargarPlaylists();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudo agregar la canción", "error");
    }
  };

  return (
    <div className="playlist-container">
      <div className="playlist-header">
        <h2>Mis Playlists</h2>
        <button className="crear-btn" onClick={crearNuevaPlaylist}>+ Crear Playlist</button>
      </div>

      {loading && <p>Cargando playlists...</p>}
      {!loading && playlists.length === 0 && <p>No tienes playlists 😢</p>}

      {!loading && playlists.map((pl) => (
        <div key={pl.id_lista} className="playlist-card">
          <div className="playlist-info">
            <h3>{pl.nombre_lista}</h3>
            <p>{pl.descripcion || "Sin descripción"}</p>
            <p>{pl.privada ? "Privada 🔒" : "Pública 🌍"}</p>
          </div>
          <div className="playlist-actions">
            <button onClick={() => agregarCancionAPlaylist(pl.id_lista)}>+ Agregar canción</button>
            {/* Botón eliminar playlist opcional */}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Playlist;
