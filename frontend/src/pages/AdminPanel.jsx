import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUsers, FaMusic, FaFileAlt, FaSignOutAlt, FaHome,
  FaUserCheck, FaUserTimes, FaStar, FaClock, FaShieldAlt,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { getUsuariosAdmin } from "../services/adminService";
import "./admin.css";

const AdminPanel = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const [activeTab, setActiveTab] = useState("usuarios");

  const [usuarios, setUsuarios] = useState([]);

  const darkSwal = (options) => {
    Swal.fire({
      background: "#2b0a3d",
      color: "#fff",
      confirmButtonColor: "#00ffcc",
      cancelButtonColor: "#d33",
      ...options,
    });
  };

  // 🔐 Validación admin
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

  // 🔥 Cargar usuarios
  useEffect(() => {
    if (activeTab === "usuarios") {
      getUsuariosAdmin().then(setUsuarios);
    }
  }, [activeTab]);

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

  // 🔥 STATS dinámicos
  const stats = {
    usuarios: [
      {
        title: "Total Usuarios",
        value: usuarios.length,
        icon: <FaUsers />,
        color: "#41DC97"
      },
      {
        title: "Usuarios Activos",
        value: usuarios.length,
        icon: <FaUserCheck />,
        color: "#38115C"
      },
      {
        title: "Usuarios Inactivos",
        value: 0,
        icon: <FaUserTimes />,
        color: "#19486E"
      },
    ],
    canciones: [
      { title: "Canciones Subidas", value: 0, icon: <FaMusic />, color: "#41DC97" },
      { title: "Canciones Populares", value: 0, icon: <FaStar />, color: "#F3C11B" },
      { title: "Pendientes", value: 0, icon: <FaClock />, color: "#38115C" },
    ],
    derechos: [
      { title: "Registros Totales", value: 0, icon: <FaFileAlt />, color: "#41DC97" },
      { title: "Protecciones", value: 0, icon: <FaShieldAlt />, color: "#F3C11B" },
      { title: "Conflictos", value: 0, icon: <FaFileAlt />, color: "#38115C" },
    ],
  };

  // 🔥 Gráfica simulada inteligente
  const actividad = useMemo(() => {
    return [
      { dia: "Lunes", valor: Math.floor(Math.random() * (usuarios.length || 1)) },
      { dia: "Martes", valor: Math.floor(Math.random() * (usuarios.length || 1)) },
      { dia: "Miércoles", valor: Math.floor(Math.random() * (usuarios.length || 1)) },
      { dia: "Jueves", valor: Math.floor(Math.random() * (usuarios.length || 1)) },
      { dia: "Viernes", valor: Math.floor(Math.random() * (usuarios.length || 1)) },
    ];
  }, [usuarios]);

  const maxValor = Math.max(...actividad.map(a => a.valor), 1);

  return (
    <div className="admin-container">
      {/* SIDEBAR */}
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
            <FaFileAlt /> Derechos
          </button>
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Cerrar Sesión
        </button>
      </aside>

      {/* MAIN */}
      <main className="admin-main">
        <h1>
          {activeTab === "usuarios"
            ? "Gestión de Usuarios"
            : activeTab === "canciones"
            ? "Gestión de Canciones"
            : "Derechos de Autor"}
        </h1>

        {/* STATS */}
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

        {/* CONTENIDO */}
        <div className="tab-content">
          {activeTab === "usuarios" && (
            <>
              <h2>Lista de Usuarios</h2>

              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Usuario</th>
                    <th>Seguidores</th>
                    <th>Estado</th>
                  </tr>
                </thead>

                <tbody>
                  {usuarios.map((u) => (
                    <tr key={u.id_usuario}>
                      <td>
                        <div className="user-cell">
                          {u.foto_perfil ? (
                            <img
                              src={`http://127.0.0.1:8000/${u.foto_perfil}`}
                              className="user-avatar"
                              alt="perfil"
                            />
                          ) : (
                            <div className="user-avatar" style={{ background: "#333" }} />
                          )}

                          {u.nombre_usuario}
                        </div>
                      </td>

                      <td>
                        <span className="badge badge-green">
                          {u.seguidores} seguidores
                        </span>
                      </td>

                      <td>
                        <span className="badge badge-green">
                          Activo
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* GRAFICA */}
              <div className="chart-container">
                <h3>Actividad de Usuarios</h3>

                {actividad.map((item) => (
                  <div key={item.dia}>
                    <small>{item.dia}</small>
                    <div
                      className="bar"
                      style={{
                        width: `${(item.valor / maxValor) * 100}%`
                      }}
                    />
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === "canciones" && (
            <p>Panel de canciones próximamente 🎵</p>
          )}

          {activeTab === "derechos" && (
            <p>Panel de derechos próximamente 📄</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;