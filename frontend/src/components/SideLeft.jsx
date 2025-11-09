import { useEffect, useState } from "react";
import { getUsuariosPorRol } from "../services/usuariosService";
import Swal from "sweetalert2";

function SideLeft() {
  const [artistas, setArtistas] = useState([]);
  const [productores, setProductores] = useState([]);
  const [loading, setLoading] = useState(true);

  const goToProfile = (username) => {
    window.location.href = `/perfil/${username}`;
  };

  useEffect(() => {
    const fetchUsuarios = async () => {
      setLoading(true);
      try {
        const artistasData = await getUsuariosPorRol(3); // Artistas
        const productoresData = await getUsuariosPorRol(4); // Productores
        setArtistas(artistasData);
        setProductores(productoresData);
      } catch (error) {
        console.error("❌ Error cargando usuarios:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se pudieron cargar los usuarios.",
          confirmButtonColor: "#6e00ff",
          background: "#121212",
          color: "#fff",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  if (loading) return <p style={{ color: "#fff" }}>Cargando usuarios...</p>;

  return (
    <aside className="sidebar-left">
      {/* Artistas */}
      <div className="box">
        <h3>Artistas a seguir</h3>
        {artistas.length > 0 ? (
          <ul>
            {artistas.map((u) => (
              <li key={u.id_usuario}>
                <span className="icon-circle" onClick={() => goToProfile(u.nombre_usuario)}>
                  <i className="fa-solid fa-user"></i>
                </span>
                {u.nombre_usuario}
                <button className="btn-circle">
                  <i className="fa-solid fa-user-plus"></i>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay artistas disponibles.</p>
        )}
      </div>

      {/* Productores */}
      <div className="box">
        <h3>Productores a seguir</h3>
        {productores.length > 0 ? (
          <ul>
            {productores.map((u) => (
              <li key={u.id_usuario}>
                <span className="icon-circle" onClick={() => goToProfile(u.nombre_usuario)}>
                  <i className="fa-solid fa-user"></i>
                </span>
                {u.nombre_usuario}
                <button className="btn-circle">
                  <i className="fa-solid fa-user-plus"></i>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay productores disponibles.</p>
        )}
      </div>
    </aside>
  );
}

export default SideLeft;

