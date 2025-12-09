import { usePlayer } from "../context/PlayerContext";
import "./MiniPlayer.css";
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from "react-icons/fa";

export default function MiniPlayer() {
  const {
    currentSong,
    isPlaying,
    togglePlay,
    nextSong,
    prevSong,
    audioRef,
    canvasRef
  } = usePlayer();

  if (!currentSong) return null;

  return (
    <div className="mini-player">
      {/* Canción */}
      <div className="mp-info">
        <img
          src={currentSong.portada_url}
          alt="cover"
          className="mp-cover"
        />
        <div className="mp-text">
          <h4>{currentSong.titulo}</h4>
          <p>{currentSong.artista}</p>
        </div>
      </div>

      {/* Controles */}
      <div className="mp-controls">
        <FaStepBackward className="mp-btn" onClick={prevSong} />

        {isPlaying ? (
          <FaPause className="mp-btn" onClick={togglePlay} />
        ) : (
          <FaPlay className="mp-btn" onClick={togglePlay} />
        )}

        <FaStepForward className="mp-btn" onClick={nextSong} />
      </div>

      {/* Visualizer real */}
      <canvas className="mp-visualizer" ref={canvasRef} width="200" height="40"></canvas>
    </div>
  );
}
