import { useState } from "react";
import { FaUser, FaPlus, FaHeart, FaPlay, FaPause } from "react-icons/fa";
import "./SongCard.css";

function SongCard({ usuario, titulo, duracion, likes, descripcion }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleUserClick = () => {
    window.location.href = `/perfil/${usuario}`; // redirige al perfil
  };

  const handlePlayClick = () => {
    setIsPlaying(!isPlaying); // alterna entre play/pause
  };

  return (
    <div className="song-card">
      <div className="card-header">
        <div className="user-info">
          <div className="user-circle" onClick={handleUserClick}>
            <FaUser />
          </div>
          <span className="username">{usuario}</span>
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

      <div className="card-body">
        <div className="player-imagen">
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

          {/* Descripción primero */}
          <p className="desc">{descripcion}</p>

          {/* Waveform dinámico */}
          <div className={`waveform ${isPlaying ? "active" : ""}`}>
            {Array.from({ length: 52 }).map((_, i) => (
              <div key={i} className="bar"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SongCard;

