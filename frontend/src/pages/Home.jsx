import SidebarLeft from "../components/SidebarLeft";
import SidebarRight from "../components/SidebarRight";
import SongCard from "../components/SongCard";
import "./home.css";

function Home () {
  const canciones = [
    { titulo: "Luz de Luna", duracion: "3:45", likes: 120, imagen: "https://picsum.photos/200" },
    { titulo: "Flow Infinito", duracion: "2:58", likes: 89, imagen: "https://picsum.photos/201" },
    { titulo: "Sueños", duracion: "4:12", likes: 200, imagen: "https://picsum.photos/202" },
  ];

  return (
    <div className="app-container">
      <SidebarLeft />

      <main className="main-content">
        {canciones.map((cancion, i) => (
          <SongCard key={i} {...cancion} />
        ))}
      </main>

      <SidebarRight />
    </div>
  );
}

export default Home ;