import Nav from "../components/Nav";
import SideLeft from "../components/SideLeft";
import SideRight from "../components/SideRight";
import SongCard from "../components/SongCard";

import "../App.css";

function Home() {
  // Obtenemos usuario logeado desde localStorage
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const canciones = [
    {
      usuario: "Mike Cross",
      titulo: "Mar de Emociones",
      duracion: "1:50",
      likes: 10,
      descripcion: "Nueva canción de pepito perez .......",
    },
    {
      usuario: "Mike Cross",
      titulo: "Mar de Emociones",
      duracion: "1:50",
      likes: 10,
      descripcion: "Nueva canción de pepito perez .......",
    },
  ];

  return (
    <div className="app-container">
      <Nav />

      <div className="main-layout">
        <SideLeft />

        <main className="main-content">
          <h3>Bienvenido, {user.nombre_usuario || "Invitado"}</h3>

          {canciones.map((c, i) => (
            <SongCard key={i} {...c} />
          ))}
        </main>

        <SideRight />
      </div>
    </div>
  );
}

export default Home;



