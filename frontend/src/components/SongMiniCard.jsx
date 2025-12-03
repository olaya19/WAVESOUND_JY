import React, { useState, useRef } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import "./SongMiniCard.css";

export default function SongMiniCard({ titulo, archivo_url, portada_url, certificado, onCrearCertificado }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handlePlayClick = () => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="song-card-mini">
      <img
        src={portada_url || "/default-cover.jpg"}
        alt={titulo}
        className="cover-mini"
      />
      <div className="info-mini">
        <span className="titulo">{titulo}</span>
        <div className="botones">
          <button onClick={handlePlayClick} className="play-btn">
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
        </div>
      </div>
      <audio ref={audioRef} src={archivo_url} preload="none" />
    </div>
  );
}


