import { useState, useRef, useEffect } from "react"; 
import { FaPlus, FaHeart, FaPlay, FaPause, FaUserCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import { agregarFavorito, eliminarFavorito } from "../services/favoritosService";
import { obtenerPlaylistsUsuario, agregarACancion, crearPlaylist } from "../services/playlistsService";
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFavorito, setIsFavorito] = useState(false);
  const [isEnPlaylist, setIsEnPlaylist] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/favoritos/likes/${id_cancion}`, {
          headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
        });
        const data = await res.json();
        setLikesCount(data.total_likes);
        setIsFavorito(data.mi_favorito);
      } catch (err) { console.error(err); }
    };
    fetchLikes();
  }, [id_cancion]);

  const handlePlayClick = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) audio.pause(); else audio.play();
    setIsPlaying(!isPlaying);
  };

  const toggleFavorito = async () => {
    try {
      if (!isFavorito) await agregarFavorito(id_cancion);
      else await eliminarFavorito(id_cancion);

      const likesRes = await fetch(`http://127.0.0.1:8000/favoritos/likes/${id_cancion}`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
      });
      const likesData = await likesRes.json();
      setLikesCount(likesData.total_likes);
      setIsFavorito(likesData.mi_favorito);

    } catch (err) { console.error(err); }
  };

  const handleUserClick = () => { if (usuario) window.location.href = `/perfil/${usuario}`; };

  const handlePlaylistClick = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.id_usuario) {
      Swal.fire("Inicia sesión", "Debes iniciar sesión para agregar a playlist", "info");
      return;
    }

    try {
      let playlists = await obtenerPlaylistsUsuario(user.id_usuario);

      let playlistId;

      // Preguntar al usuario si quiere crear nueva playlist
      const { isConfirmed, value: opcion } = await Swal.fire({
        title: 'Playlist',
        input: 'select',
        inputOptions: playlists.reduce((acc, p) => ({ ...acc, [p.id_lista]: p.nombre_lista }), { "crear": "Crear nueva playlist..." }),
        inputPlaceholder: 'Selecciona o crea nueva',
        showCancelButton: true
      });

      if (!isConfirmed) return;

      if (opcion === "crear") {
        // Modal para nueva playlist
        const { value: formValues } = await Swal.fire({
          title: 'Nueva Playlist',
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

        const [nombre, descripcion] = formValues;
        const nueva = await crearPlaylist(user.id_usuario, nombre, descripcion, false);
        playlistId = nueva.id_lista;
        Swal.fire("Playlist creada", `"${nombre}" creada con éxito`, "success");
      } else {
        playlistId = opcion;
      }

      // Agregar canción
      await agregarACancion(playlistId, id_cancion);
      setIsEnPlaylist(true);
      Swal.fire("Éxito", "Canción agregada a playlist", "success");

    } catch (err) { console.error(err); Swal.fire("Error", "No se pudo agregar la canción", "error"); }
  };

  const FotoPerfilComponente = () => {
    if (foto_perfil) {
      const srcFinal = foto_perfil.startsWith("http") ? foto_perfil : `http://127.0.0.1:8000${foto_perfil}`;
      return <img className="user-photo" src={srcFinal} alt="Foto de perfil" />;
    } else return <FaUserCircle className="user-photo-icon" />;
  };

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
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
          </div>
        </div>

        <div className="info">
          <h3 className="song-title">{titulo}</h3>
          <p className="desc">{descripcion}</p>
          <div className={`waveform ${isPlaying ? "active" : ""}`}>
            {Array.from({ length: 45 }).map((_, i) => <div key={i} className="bar"></div>)}
          </div>
        </div>
      </div>

      <audio ref={audioRef} src={archivo_url} preload="none" />
    </div>
  );
}

export default SongCard;
