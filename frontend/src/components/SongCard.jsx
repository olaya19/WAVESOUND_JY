import { useState, useEffect } from "react";
import { FaPlus, FaHeart, FaPlay, FaPause, FaUserCircle } from "react-icons/fa";
import Swal from "sweetalert2";

import { usePlayer } from "../context/PlayerContext";

import { agregarFavorito, eliminarFavorito } from "../services/favoritosService";
import {
  obtenerPlaylistsUsuario,
  agregarCancionAPlaylist,
  crearPlaylist
} from "../services/playlistsService";

import "./SongCard.css";

function SongCard({
  id_cancion,
  usuario,
  rol,
  artista,
  foto_perfil,
  titulo,
  descripcion,
  portada_url,
  archivo_url
}) {
  const { playSong, currentSong, isPlaying } = usePlayer();

  const [isFavorito, setIsFavorito] = useState(false);
  const [isEnPlaylist, setIsEnPlaylist] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const estaSonando = currentSong?.id_cancion === id_cancion;

  // -----------------------------
  // Cargar likes
  // -----------------------------
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/favoritos/likes/${id_cancion}`,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );

        const data = await res.json();
        setLikesCount(data.total_likes);
        setIsFavorito(data.mi_favorito);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLikes();
  }, [id_cancion]);

  // -----------------------------
  // Play
  // -----------------------------
  const handlePlayClick = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    playSong(
      {
        id_cancion,
        titulo,
        artista,
        portada_url,
        archivo_url
      },
      [],
      user?.id_usuario
    );
  };

  // -----------------------------
  // Favoritos
  // -----------------------------
  const toggleFavorito = async () => {
    try {
      if (!isFavorito) await agregarFavorito(id_cancion);
      else await eliminarFavorito(id_cancion);

      const res = await fetch(
        `http://127.0.0.1:8000/favoritos/likes/${id_cancion}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      const data = await res.json();

      setLikesCount(data.total_likes);
      setIsFavorito(data.mi_favorito);
    } catch (err) {
      console.error(err);
    }
  };

  // -----------------------------
  // Perfil del artista
  // -----------------------------
  const handleUserClick = () => {
    if (usuario) window.location.href = `/perfil/${usuario}`;
  };

  // -----------------------------
  // Playlists
  // -----------------------------
  const handlePlaylistClick = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.id_usuario) {
      Swal.fire("Inicia sesión", "Debes iniciar sesión para agregar a playlists", "info");
      return;
    }

    try {
      let playlists = await obtenerPlaylistsUsuario(user.id_usuario);
      let playlistId;

      const { isConfirmed, value: opcion } = await Swal.fire({
        title: "Playlist",
        input: "select",
        inputOptions: playlists.reduce(
          (acc, p) => ({ ...acc, [p.id_lista]: p.nombre_lista }),
          { crear: "➕ Crear nueva playlist..." }
        ),
        inputPlaceholder: "Selecciona una playlist",
        showCancelButton: true
      });

      if (!isConfirmed) return;

      if (opcion === "crear") {
        const { value: formValues } = await Swal.fire({
          title: "Nueva Playlist",
          html:
            '<input id="swal-input1" class="swal2-input" placeholder="Nombre">' +
            '<input id="swal-input2" class="swal2-input" placeholder="Descripción">',
          focusConfirm: false,
          showCancelButton: true,
          preConfirm: () => [
            document.getElementById("swal-input1").value,
            document.getElementById("swal-input2").value
          ]
        });

        if (!formValues) return;

        const [nombre, descripcion] = formValues;

        const nueva = await crearPlaylist(
          user.id_usuario,
          nombre,
          descripcion,
          false
        );

        playlistId = nueva.id_lista;

        Swal.fire("Playlist creada", `"${nombre}" ahora existe.`, "success");
      } else {
        playlistId = opcion;
      }

      await agregarCancionAPlaylist(playlistId, id_cancion);
      setIsEnPlaylist(true);

      Swal.fire("Agregada", "La canción fue agregada a la playlist.", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudo agregar la canción", "error");
    }
  };

  // -----------------------------
  // Foto de artista
  // -----------------------------
  const FotoPerfilComponente = () => {
    if (foto_perfil) {
      const ruta =
        foto_perfil.startsWith("http")
          ? foto_perfil
          : `http://127.0.0.1:8000${foto_perfil}`;

      return <img className="user-photo" src={ruta} alt="Foto de perfil" />;
    }
    return <FaUserCircle className="user-photo-icon" />;
  };

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <div className="song-card">
      <div className="card-header">
        <div className="user-info" onClick={handleUserClick}>
          <FotoPerfilComponente />
          <div className="username-container">
            <span className="username">{artista || usuario}</span>
            <span className="user-role">{rol || "Invitado"}</span>
          </div>
        </div>

        <div className="actions">
          <button
            className={`playlist-btn ${isEnPlaylist ? "en-playlist" : ""}`}
            onClick={handlePlaylistClick}
          >
            <FaPlus /> Playlist
          </button>

          <button
            className={`like-btn ${isFavorito ? "favorito" : ""}`}
            onClick={toggleFavorito}
          >
            <FaHeart /> {likesCount}
          </button>
        </div>
      </div>

      <div className="card-body">
        <div className="player-imagen">
          <img
            src={portada_url || "/default-cover.jpg"}
            alt={titulo}
            className="cover-img"
            onError={(e) => (e.target.src = "/default-cover.jpg")}
          />

          <div className="player-boton">
            <button className="play-btn" onClick={handlePlayClick}>
              {estaSonando && isPlaying ? <FaPause /> : <FaPlay />}
            </button>
          </div>
        </div>

        <div className="info">
          <h3 className="song-title">{titulo}</h3>
          <p className="desc">{descripcion}</p>

          <div className={`waveform ${estaSonando && isPlaying ? "active" : ""}`}>
            {Array.from({ length: 45 }).map((_, i) => (
              <div key={i} className="bar"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SongCard;
