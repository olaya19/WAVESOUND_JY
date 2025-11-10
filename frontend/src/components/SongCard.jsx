import { useState, useRef, useEffect } from "react";
import { FaUser, FaPlus, FaHeart, FaPlay, FaPause } from "react-icons/fa";
import { agregarFavorito, eliminarFavorito, obtenerFavoritos } from "../services/favoritosService";
import "./SongCard.css";

function SongCard({ id_cancion, usuario, rol, titulo, descripcion, likes, portada_url, archivo_url }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFavorito, setIsFavorito] = useState(false);
  const [likesCount, setLikesCount] = useState(likes || 0);
  const audioRef = useRef(null);

  // 🔹 Revisar si la canción ya está en favoritos al montar el componente
  useEffect(() => {
    const checkFavorito = async () => {
      try {
        if (!id_cancion) return console.warn("ID de canción no definido");
        const favoritos = await obtenerFavoritos();
        const existe = favoritos.some(f => f.id_cancion === id_cancion);
        setIsFavorito(existe);
      } catch (err) {
        console.error("Error al obtener favoritos:", err);
      }
    };
    checkFavorito();
  }, [id_cancion]);

  // 🔹 Manejo de reproducción
  const handlePlayClick = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  // 🔹 Manejo de favoritos
  const toggleFavorito = async () => {
    try {
      if (!id_cancion) return console.warn("ID de canción no definido");

      if (!isFavorito) {
        await agregarFavorito(id_cancion);
        setIsFavorito(true);
        setLikesCount(prev => Math.max(prev + 1, 0));
      } else {
        await eliminarFavorito(id_cancion);
        setIsFavorito(false);
        setLikesCount(prev => Math.max(prev - 1, 0));
      }
    } catch (err) {
      console.error("Error favoritos:", err);
      alert(err.message || "Ocurrió un error, inténtalo de nuevo.");
    }
  };

  // 🔹 Click en usuario
  const handleUserClick = () => {
    if (usuario && usuario !== "Desconocido") {
      window.location.href = `/perfil/${usuario}`;
    }
  };

  return (
    <div className="song-card">
      <div className="card-header">
        <div className="user-info" onClick={handleUserClick}>
          <div className="user-circle"><FaUser /></div>
          <div className="username-container">
            <span className="username">{usuario}</span>
            {rol && <span className="user-role">{rol}</span>}
          </div>
        </div>

        <div className="actions">
          <button className="playlist-btn"><FaPlus /> Playlist</button>
          <button
            id={`like-btn-${id_cancion}`}
            className={`like-btn ${isFavorito ? "favorito" : ""}`}
            onClick={toggleFavorito}
          >
            <FaHeart /> {likesCount}
          </button>
        </div>
      </div>

      <div className="card-body">
        <div className="player-imagen">
          <img src={portada_url || "/default-cover.jpg"} alt={titulo} className="cover-img"
              onError={(e) => (e.target.src = "/default-cover.jpg")} />
          <div className="player-boton">
            <button className="play-btn" onClick={handlePlayClick}>
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
          </div>
        </div>

        <div className="info">
          <div className="song-title">{titulo} <span className="artist">{usuario}</span></div>
          <p className="desc">{descripcion}</p>
          <div className={`waveform ${isPlaying ? "active" : ""}`}>
            {Array.from({ length: 52 }).map((_, i) => (<div key={i} className="bar"></div>))}
          </div>
        </div>
      </div>

      <audio ref={audioRef} src={archivo_url} preload="none" />
    </div>
  );
}

export default SongCard;


