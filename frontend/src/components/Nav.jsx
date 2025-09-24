import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Importa para navegación
import "./Nav.css";

function Nav() {
  const [active, setActive] = useState("home");
  const navigate = useNavigate(); // ✅ Hook para redirigir

  // 🔹 Obtener usuario del localStorage
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const rol = user.id_rol; // 1 = Artista, 2 = Productor, 3 = Oyente

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate("/Home")}>
        WaveSound <i className="fa-solid fa-music"></i>
      </div>

      <input className="search" type="text" placeholder="Buscar..." />

      <div className="icons">
        {/* Home */}
        <i
          className={`fa-solid fa-house ${active === "home" ? "active" : ""}`}
          onClick={() => {
            setActive("home");
            navigate("/Home");
          }}
        />

        {/* Perfil */}
        <i
          className={`fa-solid fa-user ${active === "profile" ? "active" : ""}`}
          onClick={() => {
            setActive("profile");
            navigate("/Profile"); // ✅ Ir al componente de perfil
          }}
        />

        {/* Derechos de Autor solo para Artista o Productor */}
        {(rol === 1 || rol === 2) && (
          <i
            className={`fa-solid fa-shield ${active === "shield" ? "active" : ""}`}
            onClick={() => {
              setActive("shield");
              navigate("/WorkRegister");
            }}
          />
        )}

        {/* Menú */}
        <i
          className={`fa-solid fa-bars ${active === "menu" ? "active" : ""}`}
          onClick={() => setActive("menu")}
        />

        {/* Login / Logout */}
        {!user.id_rol ? (
          <i
            className={`fa-solid fa-unlock ${active === "login" ? "active" : ""}`}
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

