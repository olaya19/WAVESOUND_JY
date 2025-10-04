import { useNavigate, useLocation } from "react-router-dom";
import "./Nav.css";

function Nav() {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔹 Obtener usuario del localStorage
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const rol = user.id_rol; // 1 = Artista, 2 = Productor, 3 = Oyente, 4 = Admin

  // 🔹 Detectar ruta activa
  const currentPath = location.pathname.toLowerCase();

  // 🚨 Si es administrador, no mostrar Nav
  if (rol === 4) {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate("/Home")}>
        WaveSound <i className="fa-solid fa-music"></i>
      </div>

      <input className="search" type="text" placeholder="Buscar..." />

      <div className="icons">
        {/* Home */}
        <i
          className={`fa-solid fa-house ${currentPath === "/home" ? "active" : ""}`}
          onClick={() => navigate("/Home")}
        />

        {/* Perfil */}
        <i
          className={`fa-solid fa-user ${currentPath === "/profile" ? "active" : ""}`}
          onClick={() => navigate("/Profile")}
        />

        {/* Subir música - solo Artistas */}
        {rol === 1 && (
          <i
            className={`fa-solid fa-upload ${currentPath === "/upload" ? "active" : ""}`}
            onClick={() => navigate("/Upload")}
            title="Subir música"
          />
        )}

        {/* Menú */}
        <i
          className={`fa-solid fa-bars ${currentPath === "/menu" ? "active" : ""}`}
          onClick={() => navigate("/Menu")}
        />

        {/* Login / Logout */}
        {!user.id_rol ? (
          <i
            className={`fa-solid fa-unlock ${currentPath === "/login" ? "active" : ""}`}
            onClick={() => navigate("/Login")}
          />
        ) : (
          <i
            className="fa-solid fa-right-from-bracket"
            onClick={() => {
              localStorage.removeItem("user");
              localStorage.removeItem("token");
              navigate("/Login");
            }}
          />
        )}
      </div>

      {/* Mostrar usuario logeado */}
      {user.nombre_usuario && (
        <div className="user-info">
          Hola, <strong>{user.nombre_usuario}</strong>
        </div>
      )}
    </nav>
  );
}

export default Nav;


