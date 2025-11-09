import React from "react";
import { useNavigate } from "react-router-dom";
import "./Menu.css"; // Puedes crear tu CSS propio

function Menu() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const rol = user.id_rol;

  return (
    <div className="menu-container">
      <h2>Bienvenido al Menú, {user.nombre_usuario || "Invitado"}</h2>

      <div className="menu-sections">

        {/* Sección de perfil */}
        <div className="menu-card" onClick={() => navigate("/profile")}>
          <h3>👤 Mi Perfil</h3>
          <p>Gestiona tus datos, foto de perfil y preferencias.</p>
        </div>

        {/* Solo artistas/productores pueden gestionar canciones */}
        {(rol === 3 || rol === 4) && (
          <div className="menu-card" onClick={() => navigate("/mis-canciones")}>
            <h3>🎵 Mis Canciones</h3>
            <p>Ver, editar o eliminar las canciones que has subido.</p>
          </div>
        )}

        {/* Para todos los usuarios: se puede mostrar algo como derechos de autor */}
        <div className="menu-card" onClick={() => navigate("/derechos-autor")}>
          <h3>📝 Derechos de Autor</h3>
          <p>Revisa tus registros y protección de contenido.</p>
        </div>

        {/* Más adelante: otros apartados */}
        <div className="menu-card" onClick={() => navigate("/playlist")}>
          <h3>🎧 Mis Playlists</h3>
          <p>Crea y administra tus playlists favoritas.</p>
        </div>

        <div className="menu-card" onClick={() => navigate("/favoritos")}>
          <h3>💜 Mis Favoritos</h3>
          <p>Accede rápidamente a tus canciones favoritas.</p>
        </div>
      </div>
    </div>
  );
}

export default Menu;
