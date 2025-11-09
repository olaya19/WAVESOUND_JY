import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUsers, FaMusic, FaFileAlt, FaSignOutAlt, FaHome,
  FaUserCheck, FaUserTimes, FaStar, FaClock, FaShieldAlt,
} from "react-icons/fa";
import Swal from "sweetalert2";
import "./Admin.css";

const AdminPanel = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const [activeTab, setActiveTab] = useState("usuarios");

  const darkSwal = (options) => {
    Swal.fire({
      background: "#2b0a3d",
      color: "#fff",
      confirmButtonColor: "#00ffcc",
      cancelButtonColor: "#d33",
      ...options,
    });
  };

  useEffect(() => {
    if (user.id_rol !== 1) {
      darkSwal({
        icon: "warning",
        title: "Acceso denegado",
        text: "Solo los administradores pueden acceder a este panel.",
        confirmButtonText: "Ir al inicio",
      }).then(() => navigate("/Home"));
    }
  }, [navigate, user.id_rol]);

  const handleLogout = () => {
    darkSwal({
      title: "¿Cerrar sesión?",
      text: "Tu sesión será cerrada.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, salir",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/Login");
        darkSwal({
          icon: "success",
          title: "Sesión cerrada",
          text: "Has salido del sistema correctamente.",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  const stats = {
    usuarios: [
      { title: "Total Usuarios", value: 1200, icon: <FaUsers />, color: "#41DC97" },
      { title: "Usuarios Activos", value: 980, icon: <FaUserCheck />, color: "#38115C" },
      { title: "Usuarios Inactivos", value: 220, icon: <FaUserTimes />, color: "#19486E" },
    ],
    canciones: [
      { title: "Canciones Subidas", value: 540, icon: <FaMusic />, color: "#41DC97" },
      { title: "Canciones Populares", value: 120, icon: <FaStar />, color: "#F3C11B" },
      { title: "Pendientes Revisión", value: 30, icon: <FaClock />, color: "#38115C" },
    ],
    derechos: [
      { title: "Registros Totales", value: 350, icon: <FaFileAlt />, color: "#41DC97" },
      { title: "Protecciones Activas", value: 300, icon: <FaShieldAlt />, color: "#F3C11B" },
      { title: "Conflictos Reportados", value: 12, icon: <FaFileAlt />, color: "#38115C" },
    ],
  };

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>WaveSound Admin</h2>
          <p>{user.nombre_usuario || "Administrador"}</p>
        </div>
        <nav className="sidebar-nav">
          <button onClick={() => navigate("/Home")} className="home-btn">
            <FaHome /> Home
          </button>
          <button
            className={activeTab === "usuarios" ? "active" : ""}
            onClick={() => setActiveTab("usuarios")}
          >
            <FaUsers /> Usuarios
          </button>
          <button
            className={activeTab === "canciones" ? "active" : ""}
            onClick={() => setActiveTab("canciones")}
          >
            <FaMusic /> Canciones
          </button>
          <button
            className={activeTab === "derechos" ? "active" : ""}
            onClick={() => setActiveTab("derechos")}
          >
            <FaFileAlt /> Derechos de Autor
          </button>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Cerrar Sesión
        </button>
      </aside>

      <main className="admin-main">
        <h1>
          {activeTab === "usuarios"
            ? "Gestión de Usuarios"
            : activeTab === "canciones"
            ? "Gestión de Canciones"
            : "Derechos de Autor"}
        </h1>

        <div className="stats-grid">
          {stats[activeTab].map((stat) => (
            <div
              key={stat.title}
              className="stat-card"
              style={{ borderTop: `4px solid ${stat.color}` }}
            >
              <div className="stat-icon" style={{ color: stat.color }}>
                {stat.icon}
              </div>
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
            </div>
          ))}
        </div>

        <div className="tab-content">
          <p>
            {activeTab === "usuarios"
              ? "Aquí puedes listar, editar o eliminar usuarios."
              : activeTab === "canciones"
              ? "Aquí puedes gestionar canciones."
              : "Aquí puedes gestionar registros y protecciones de derechos de autor."}
          </p>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;


