import { useEffect, useState } from "react";
import { getUsuariosPorRol } from "../services/usuariosService";


function SideLeft() {
  const [artistas, setArtistas] = useState([]);
  const [productores, setProductores] = useState([]);

  const goToProfile = (username) => {
    window.location.href = `/perfil/${username}`;
  };

  useEffect(() => {
    getUsuariosPorRol(1).then(setArtistas); // Artistas
    getUsuariosPorRol(2).then(setProductores); // Productores
  }, []);

  return (
    <aside className="sidebar-left">
      <div className="box">
        <h3>Artistas a seguir</h3>
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
      </div>

      <div className="box">
        <h3>Productores a seguir</h3>
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
      </div>
    </aside>
  );
}

export default SideLeft;
