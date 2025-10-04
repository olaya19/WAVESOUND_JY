import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./admin.css";

const AdminPanel = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const [activeTab, setActiveTab] = useState("usuarios");

  useEffect(() => {
    if (user.id_rol !== 4) {
      // 🚫 Solo Admin accede aquí
      navigate("/Home");
    }
  }, [navigate, user.id_rol]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/Login");
  };

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <h1>Panel de Administración 👑</h1>

        <div className="admin-actions">
          <button onClick={() => navigate("/Home")}>🏠 Ir al Home</button>
          <button onClick={handleLogout} className="logout-btn">
            🚪 Cerrar Sesión
          </button>
        </div>
      </header>

      <nav className="admin-nav">
        <button
          className={activeTab === "usuarios" ? "active" : ""}
          onClick={() => setActiveTab("usuarios")}
        >
          CRUD Usuarios
        </button>
        <button
          className={activeTab === "canciones" ? "active" : ""}
          onClick={() => setActiveTab("canciones")}
        >
          CRUD Canciones
        </button>
      </nav>

      <main className="admin-content">
        {activeTab === "usuarios" && (
          <div>
            <h2>Gestión de Usuarios</h2>
            <p>Aquí iría el CRUD de usuarios (listar, editar, borrar...)</p>
          </div>
        )}
        {activeTab === "canciones" && (
          <div>
            <h2>Gestión de Canciones</h2>
            <p>Aquí iría el CRUD de canciones (listar, editar, borrar...)</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;
