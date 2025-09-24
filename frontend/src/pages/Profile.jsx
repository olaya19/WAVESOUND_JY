import React from "react";
import "./Profile.css";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user")) || {};

  if (!user.id_rol) {
    // Si no hay usuario logueado
    return (
      <div className="profile-container">
        <h2>No has iniciado sesión</h2>
        <button onClick={() => (window.location.href = "/Login")}>
          Iniciar Sesión
        </button>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h1>Perfil de {user.nombre_usuario}</h1>
      <div className="profile-card">
        <p><strong>Correo:</strong> {user.email}</p>
        <p><strong>Rol:</strong> {user.id_rol === 1
          ? "Artista"
          : user.id_rol === 2
          ? "Productor"
          : "Oyente"}
        </p>
        <button
          className="logout-btn"
          onClick={() => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            window.location.href = "/Login";
          }}
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}

export default Profile;
