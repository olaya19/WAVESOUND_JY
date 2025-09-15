import Nav from "../components/Nav";
import SideLeft from "../components/SideLeft";
import SideRight from "../components/SideRight";
import SongCard from "../components/SongCard";

import "../App.css";
import "./home.css"; // asegúrate que este archivo exista

function Home() {
  // Obtenemos usuario logeado desde localStorage
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const canciones = [
    {
      usuario: "Artista Demo",
      titulo: "Acoustic Breeze",
      duracion: "2:37",
      likes: 25,
      descripcion: "Una canción acústica suave para relajarse.",
      archivo_url:
        "https://www.bensound.com/bensound-music/bensound-acousticbreeze.mp3",
      portada_url: "https://picsum.photos/200/200?random=1",
    },
    {
      usuario: "Artista Demo",
      titulo: "Sunny",
      duracion: "2:20",
      likes: 40,
      descripcion: "Melodía alegre con toques de jazz y pop.",
      archivo_url: "https://www.bensound.com/bensound-music/bensound-sunny.mp3",
      portada_url: "https://picsum.photos/200/200?random=2",
    },
  ];

  return (
    <div className="app-container">
      {/* NAV siempre arriba */}
      <Nav />

      <div className="main-layout">
        {/* Sidebar Izquierda */}
        <SideLeft />

        {/* Contenido principal */}
        <main className="main-content">
          <div className="welcome-section">
            <h3>Bienvenido, {user.nombre_usuario || "Invitado"}</h3>
          </div>

          <div className="songs-feed">
            {canciones.map((c, i) => (
              <SongCard key={i} {...c} />
            ))}
          </div>
        </main>


        {/* Sidebar Derecha */}
        <SideRight />
      </div>
    </div>
  );
}

export default Home;



