import { useState, useRef } from "react";
import { FaUser, FaPlus, FaHeart, FaPlay, FaPause } from "react-icons/fa";
import "./SongCard.css";

function SongCard({ usuario, titulo, descripcion, likes, portada_url, archivo_url }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleUserClick = () => {
    window.location.href = `/perfil/${usuario}`;
  };

  const handlePlayClick = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
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
          <img src={portada_url} alt={titulo} className="cover-img" />
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

      <audio ref={audioRef} src={archivo_url} />
    </div>
  );
}

export default SongCard;
