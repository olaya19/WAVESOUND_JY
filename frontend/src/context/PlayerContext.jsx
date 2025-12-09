import { createContext, useContext, useRef, useState, useEffect } from "react";

const PlayerContext = createContext();
export const usePlayer = () => useContext(PlayerContext);

export function PlayerProvider({ children }) {
  const audioRef = useRef(null);

  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  // cargar canción cuando cambia el index
  useEffect(() => {
    if (queue.length === 0) return;

    const song = queue[currentIndex];
    setCurrentSong(song);

    if (audioRef.current) {
      audioRef.current.src = song.archivo_url;
      audioRef.current.play();
      setIsPlaying(true);

      registrarReproduccion(song.id_cancion); // ⬅ registra reproducción
    }
  }, [currentIndex]);

  // progreso
  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setProgress(audio.currentTime);
    setDuration(audio.duration || 0);
  };

  const seek = (value) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = value;
    setProgress(value);
  };

  // reproducir canción
  const playSong = (song, list = []) => {
    if (list.length > 0) {
      setQueue(list);
      const idx = list.findIndex((s) => s.id_cancion === song.id_cancion);
      setCurrentIndex(idx >= 0 ? idx : 0);
    } else {
      setQueue([song]);
      setCurrentIndex(0);
    }

    setCurrentSong(song);

    if (audioRef.current) {
      audioRef.current.src = song.archivo_url;
      audioRef.current.play();
      setIsPlaying(true);

      registrarReproduccion(song.id_cancion);
    }
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) audio.pause();
    else audio.play();

    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    if (currentIndex < queue.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSong = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // registrar reproducciones SIN visualizer
  const registrarReproduccion = async (id_cancion) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.id_usuario) return;

    try {
      const response = await fetch("http://127.0.0.1:8000/reproducciones/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          id_cancion,
          id_usuario: user.id_usuario,
          fecha_reproduccion: new Date().toISOString()
        })
      });

      console.log("🔥 Reproducción registrada:", id_cancion);

      window.dispatchEvent(new CustomEvent("reproduccion-registrada", {
        detail: { id_cancion, mensaje: "Registrada" }
      }));

    } catch (error) {
      console.error("Error registrando reproducción:", error);
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        audioRef,
        queue,
        currentSong,
        currentIndex,
        isPlaying,
        progress,
        duration,
        playSong,
        togglePlay,
        nextSong,
        prevSong,
        seek,
      }}
    >
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={nextSong}
      />

      {children}
    </PlayerContext.Provider>
  );
}
