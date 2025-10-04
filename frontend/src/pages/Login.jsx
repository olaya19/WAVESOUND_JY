import React from "react";
import "../pages/login.css";
import { useLogin } from "../services/useLogin";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/FONDO.jpeg";
import discoImg from "../assets/disco3.png"; // 🌍 tu bola disco

const Login = () => {
  const navigate = useNavigate();
  const {
    username,
    setUsername,
    password,
    setPassword,
    errors,
    loading,
    handleLogin,
  } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await handleLogin();

    if (res) {
      switch (res.id_rol) {
        case 1: // Artista
        case 2: // Productor
        case 3: // Oyente
          navigate("/Home");
          break;
        case 4: // Admin
          navigate("/AdminPanel");
          break;
        default:
          navigate("/Home");
          break;
      }
    }
  };

  return (
    <div
      className="login-page"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="login-container">
        {/* 🌍 Bola disco giratoria tipo planeta */}
        <div className="vinyl-wrapper">
          <img src={discoImg} className="planet-spin" alt="Disco Bola" />
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Usuario o Email"
            required
          />
          {errors.username && <small className="error-text">{errors.username}</small>}

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
          />
          {errors.password && <small className="error-text">{errors.password}</small>}

          {errors.api && <small className="error-text">{errors.api}</small>}

          <div className="links">
            <a href="#">¿Olvidaste tu contraseña?</a>
            <a href="/Register">¿No tienes cuenta? Regístrate</a>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Cargando..." : "INICIAR SESIÓN"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
