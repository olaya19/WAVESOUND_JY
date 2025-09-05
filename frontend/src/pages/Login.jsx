import React, { useState } from "react";
import "../pages/login.css";
import bgImage from "../public/"; {/*ya se pone la imagen ahorita */}

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí va la lógica de login
    console.log("Usuario:", username);
    console.log("Contraseña:", password);
  };

  return (
    <div>
      {/* Imagen de fondo */}
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
            placeholder="Usuario"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
          />

          <div className="links">
            <a href="#">¿Olvidaste tu contraseña?</a>
            <a href="/register">¿No tienes cuenta? Regístrate</a>
          </div>

          <button type="submit">INICIAR SESIÓN</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
