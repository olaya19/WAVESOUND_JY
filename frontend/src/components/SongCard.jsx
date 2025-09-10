import "./SongCard.css";

function SongCard({ usuario, titulo, duracion, likes, descripcion }) {
  return (
    <div className="song-card">
      <div className="card-header">
        <span>👤 {usuario}</span>
        <div className="actions">
          <button>➕</button>
          <button>❤️ {likes}</button>
        </div>
      </div>

      <div className="card-body">
        <div className="player-imagen">
          <div className="player-boton">
            <button>▶</button>
          </div>
        </div>

        <div className="info">
          <div className="song-title">
            {titulo} <span className="artist">{usuario}</span>
          </div>

          {/* Primero descripción */}
          <p className="desc">{descripcion}</p>

          {/* Luego las olas */}
          <div className="waveform">
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

