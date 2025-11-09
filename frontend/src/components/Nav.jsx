import { useNavigate, useLocation } from "react-router-dom";
import "./Nav.css";
import logo from "../assets/LOGO1.1.jpeg";

function Nav() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const rol = user.id_rol;
  const currentPath = location.pathname.toLowerCase();

  // 🔒 Ocultar Nav en Login y Register
  if (currentPath === "/login" || currentPath === "/register") {
    return null;
  }

  // 🔒 Ocultar Nav en panel de administrador
  if (rol === 1) return null; // si tu admin es id_rol 1, ajusta según corresponda

  return (
    <nav className="navbar">
      <div className="logo-container" onClick={() => navigate("/Home")}>
        <img src={logo} alt="WaveSound Logo" className="logo-img" />
        <h1 className="logo-text">WaveSound</h1>
      </div>

      <div className="search-container">
        <input
          className="search"
          type="text"
          placeholder="Buscar artistas, canciones..."
        />
      </div>

      <div className="icons">
        <i
          className={`fa-solid fa-house ${currentPath === "/home" ? "active" : ""}`}
          onClick={() => navigate("/Home")}
          title="Inicio"
        />

        <i
          className={`fa-solid fa-user ${currentPath === "/profile" ? "active" : ""}`}
          onClick={() => navigate("/Profile")}
          title="Perfil"
        />

        {rol === 3 && (
          <i
            className={`fa-solid fa-upload ${currentPath === "/upload" ? "active" : ""}`}
            onClick={() => navigate("/Upload")}
            title="Subir música"
          />
        )}

        <i
          className={`fa-solid fa-bars ${currentPath === "/menu" ? "active" : ""}`}
          onClick={() => navigate("/Menu")}
          title="Menú"
        />

        {!user.id_rol ? (
          <i
            className={`fa-solid fa-unlock ${currentPath === "/login" ? "active" : ""}`}
            onClick={() => navigate("/Login")}
            title="Iniciar sesión"
          />
        ) : (
          <i
            className="fa-solid fa-right-from-bracket"
            title="Cerrar sesión"
            onClick={() => {
              localStorage.removeItem("user");
              localStorage.removeItem("token");
              navigate("/Login");
            }}
          />
        )}
      </div>

      {user.nombre_usuario && (
        <div className="user-info">
          <span>Hola, </span>
          <strong>{user.nombre_usuario}</strong>
        </div>
      )}
    </nav>
  );
}

export default Nav;

