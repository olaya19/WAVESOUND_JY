import { useState, useRef, useEffect } from "react";
import { FaUser, FaPlus, FaHeart, FaPlay, FaPause } from "react-icons/fa";
import { agregarFavorito, eliminarFavorito } from "../services/favoritosService";
import "./SongCard.css";

function SongCard({ id_cancion, usuario, rol, titulo, descripcion, portada_url, archivo_url }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFavorito, setIsFavorito] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const audioRef = useRef(null);

  // 🔹 Traer likes totales y si el usuario ya dio like
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        if (!id_cancion) return;

        const res = await fetch(`http://127.0.0.1:8000/favoritos/likes/${id_cancion}`, {
          headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
        });
        const data = await res.json();
        setLikesCount(data.total_likes);
        setIsFavorito(data.mi_favorito);
      } catch (err) {
        console.error("Error al obtener likes:", err);
      }
    };
    fetchLikes();
  }, [id_cancion]);

  // 🔹 Manejo de reproducción
  const handlePlayClick = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) audio.pause();
    else audio.play();

    setIsPlaying(!isPlaying);
  };

  // 🔹 Manejo de favoritos
  const toggleFavorito = async () => {
    try {
      if (!id_cancion) return;

      if (!isFavorito) {
        await agregarFavorito(id_cancion);
      } else {
        await eliminarFavorito(id_cancion);
      }

      // 🔹 Actualizar contador de likes después de cambiar favorito
      const likesRes = await fetch(`http://127.0.0.1:8000/favoritos/likes/${id_cancion}`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
      });
      const likesData = await likesRes.json();
      setLikesCount(likesData.total_likes);
      setIsFavorito(likesData.mi_favorito);

    } catch (err) {
      console.error("Error toggle favorito:", err);
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



