import "./SongCard.css";

function SongCard({ titulo, duracion, likes, imagen }) {
  return (
    <div className="song-card">
      <img src={imagen} alt={titulo} />
      <div className="song-info">
        <h4>{titulo}</h4>
        <p>{duracion}</p>
        <div className="song-actions">
          <button>▶</button>
          <span>❤️ {likes}</span>
        </div>
      </div>
    </div>
  );
}

export default SongCard;