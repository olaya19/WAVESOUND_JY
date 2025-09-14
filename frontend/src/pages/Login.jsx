import React from "react";
import "../pages/login.css";
import bgImage from "../assets/descarga.jpeg";
import { useLogin } from "../services/useLogin";
import { useNavigate } from "react-router-dom";

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
  const user = await handleLogin();
  if (user) {
    const rol = parseInt(user.rol); // 👈 conviertes a número

    if (rol === 3) navigate("/Home");           // Oyente
    else if (rol === 2) navigate("/Home");  // Productor
    else if (rol === 1) navigate("/Home");    // Artista
};


  };

  return (
    <div>
      <img src={bgImage} className="bg-img" alt="Fondo" />
      <div className="login-container">
        <div className="avatar">
          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            alt="User Icon"
          />
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

