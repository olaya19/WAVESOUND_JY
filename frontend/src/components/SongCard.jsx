import { useState, useRef, useEffect } from "react"; 
import { FaPlus, FaHeart, FaPlay, FaPause, FaUserCircle } from "react-icons/fa";
import { agregarFavorito, eliminarFavorito } from "../services/favoritosService";
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
      } catch (err) {
        console.error("Error al obtener likes:", err);
      }
    };
    fetchLikes();
  }, [id_cancion]);

  const handlePlayClick = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) audio.pause();
    else audio.play();

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

    } catch (err) {
      console.error("Error toggle favorito:", err);
    }
  };

  const handleUserClick = () => {
    if (usuario) window.location.href = `/perfil/${usuario}`;
  };

  // -----------------------
  // Foto de perfil con icono fallback
  // -----------------------
  const FotoPerfilComponente = () => {
    if (foto_perfil) {
      const srcFinal = foto_perfil.startsWith("http")
        ? foto_perfil
        : `http://127.0.0.1:8000${foto_perfil}`;
      return <img className="user-photo" src={srcFinal} alt="Foto de perfil" />;
    } else {
      return <FaUserCircle className="user-photo-icon" />;
    }
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
          <button className="playlist-btn"><FaPlus /> Playlist</button>

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






