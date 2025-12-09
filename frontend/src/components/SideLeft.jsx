// SideLeft.jsx
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getUsuariosPorRolConPerfil } from "../services/usuariosService";
import { seguirUsuario, dejarDeSeguir, getSeguidos } from "../services/seguidoresService";

function SideLeft() {
  const [artistas, setArtistas] = useState([]);
  const [productores, setProductores] = useState([]);
  const [seguidos, setSeguidos] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user")) || {};

  const goToProfile = (username) => {
    window.location.href = `/perfil/${username}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const artistasData = await getUsuariosPorRolConPerfil(3);
        const productoresData = await getUsuariosPorRolConPerfil(4);

        const userId = user.id_usuario;

        setArtistas(artistasData.filter(u => u.id_usuario !== userId));
        setProductores(productoresData.filter(u => u.id_usuario !== userId));

        const seguidosData = await getSeguidos();
        setSeguidos(seguidosData.map(s => s.id_seguido));

      } catch (err) {
        Swal.fire({ icon: "error", title: "Oops...", text: "No se pudieron cargar los usuarios." });
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const toggleFollow = async (id_usuario) => {
    if (!user.id_usuario) {
      Swal.fire({
        title: "Inicia sesión",
        text: "Debes iniciar sesión para seguir usuarios.",
        icon: "info",
      });
      return;
    }

    const yaSigo = seguidos.includes(id_usuario);

    try {
      if (yaSigo) {
        await dejarDeSeguir(id_usuario);
        setSeguidos(seguidos.filter(id => id !== id_usuario));
      } else {
        await seguirUsuario(id_usuario);
        setSeguidos([...seguidos, id_usuario]);
      }
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error", text: "No se pudo procesar la acción" });
    }
  };

  const renderList = (lista) => (
    <ul className="sideleft-list">
      {lista.map((u) => {
        const siguiendo = seguidos.includes(u.id_usuario);

        return (
          <li key={u.id_usuario} className="sideleft-item">
            <div
              className="sideleft-user"
              onClick={() => goToProfile(u.nombre_usuario)}
            >
              <img
                src={u.foto_perfil || "/default-avatar.png"}
                className="sideleft-avatar"
                alt="avatar"
              />
              <span className="sideleft-username">{u.nombre_usuario}</span>
            </div>

            <button
              className={`sideleft-follow-btn ${siguiendo ? "siguiendo" : ""}`}
              onClick={() => toggleFollow(u.id_usuario)}
            >
              {siguiendo ? "✔ Siguiendo" : "➕ Seguir"}
            </button>
          </li>
        );
      })}
    </ul>
  );

  if (loading) return <p style={{ color: "#fff" }}>Cargando usuarios...</p>;

  return (
    <aside className="sidebar-left">
      <div className="sideleft-box">
        <h3 className="sideleft-title">Artistas para seguir</h3>
        {artistas.length > 0 ? renderList(artistas) : <p>No hay artistas disponibles.</p>}
      </div>

      <div className="sideleft-box">
        <h3 className="sideleft-title">Productores para seguir</h3>
        {productores.length > 0 ? renderList(productores) : <p>No hay productores disponibles.</p>}
      </div>
    </aside>
  );
}

export default SideLeft;


