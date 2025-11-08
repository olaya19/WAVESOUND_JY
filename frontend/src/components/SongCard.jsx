import { useState, useRef } from "react";
import { FaUser, FaPlus, FaHeart, FaPlay, FaPause } from "react-icons/fa";
import "./SongCard.css";

function SongCard({ usuario, rol, titulo, descripcion, likes, portada_url, archivo_url }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleUserClick = () => {
    if (usuario && usuario !== "Desconocido") {
      window.location.href = `/perfil/${usuario}`;
    }
  };

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

  return (
    <div className="song-card">
      {/* 🔹 ENCABEZADO */}
      <div className="card-header">
        <div className="user-info" onClick={handleUserClick}>
          <div className="user-circle">
            <FaUser />
          </div>
          <div className="username-container">
            <span className="username">{usuario}</span>
            {rol && <span className="user-role">{rol}</span>}
          </div>
        </div>

        <div className="actions">
          <button className="playlist-btn">
            <FaPlus /> Playlist
          </button>
          <button className="like-btn">
            <FaHeart /> {likes}
          </button>
        </div>
      </div>

      {/* 🔹 CUERPO */}
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
          <div className="song-title">
            {titulo} <span className="artist">{usuario}</span>
          </div>
          <p className="desc">{descripcion}</p>

          <div className={`waveform ${isPlaying ? "active" : ""}`}>
            {Array.from({ length: 52 }).map((_, i) => (
              <div key={i} className="bar"></div>
            ))}
          </div>
        </div>
      </div>

      <audio ref={audioRef} src={archivo_url} preload="none" />
    </div>
  );
}

export default SongCard;
