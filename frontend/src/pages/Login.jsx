// src/pages/Login.jsx
import React, { useState, useEffect } from "react";
import "../pages/Login.css";
import { useLogin } from "../services/useLogin";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash, FaUser, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import bgImage from "../assets/FONDO.jpeg";
import discoImg from "../assets/disco3.png";

const Login = () => {
  const navigate = useNavigate();
  const {
    username, setUsername,
    password, setPassword,
    errors, loading,
    handleLogin,
    handleGoogleResponse
  } = useLogin();

  const [showPassword, setShowPassword] = useState(false);

  // ----------------------------
  // LOGIN NORMAL
  // ----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await handleLogin();
    if (!res) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Usuario o contraseña incorrectos",
        confirmButtonColor: "#6e00ff",
        background: "#121212",
        color: "#fff",
      });
      return;
    }

    const rolNombre = ["Administrador","Oyente","Artista","Productor"][res.id_rol-1] || "Usuario";

    Swal.fire({
      icon: "success",
      title: `¡Bienvenido, ${res.nombre_usuario}!`,
      text: `Has iniciado sesión como ${rolNombre}`,
      confirmButtonColor: "#6e00ff",
      background: "#121212",
      color: "#fff",
    }).then(() => {
      res.id_rol === 1 ? navigate("/AdminPanel") : navigate("/Home");
    });
  };

  // ----------------------------
  // BOTÓN GOOGLE (popup)
  // ----------------------------
  const handleGoogleButton = () => {
    if (!window.google) {
      Swal.fire("Error", "Google no está disponible", "error");
      return;
    }

    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: (response) =>
        handleGoogleResponse(response.credential, navigate, Swal),
    });

    window.google.accounts.id.prompt();
  };

  return (
    <div className="login-page" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="login-container">
        <div className="vinyl-wrapper">
          <img src={discoImg} className="planet-spin" alt="Disco Bola" />
        </div>

        <form onSubmit={handleSubmit}>
          {/* Usuario */}
          <div className="input-box">
            <span className="icon-circle"><FaUser /></span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Usuario o Email"
            />
          </div>
          {errors.username && <small className="error-text">{errors.username}</small>}

          {/* Contraseña */}
          <div className="input-box password-box">
            <span className="icon-circle"><FaLock /></span>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
            />
            <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.password && <small className="error-text">{errors.password}</small>}

          <div className="links">
            <a>¿Olvidaste tu contraseña?</a>
            <a href="/Register">¿No tienes cuenta? Regístrate</a>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Cargando..." : "INICIAR SESIÓN"}
          </button>

          {/* GOOGLE BUTTON */}
          <button type="button" className="google-btn" onClick={handleGoogleButton}>
            <FcGoogle size={20} style={{ marginRight: "8px" }} />
            Iniciar con Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
