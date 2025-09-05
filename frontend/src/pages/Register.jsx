import React, { useState } from "react";
import "../styles/register.css";
import bgImage from "../assets/descarga.jpeg";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    user: "",
    email: "",
    role: "",
    password: "",
  });

  // Manejo de cambios en los inputs
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos de registro:", formData);

    // Aquí luego conectas tu API con fetch/axios
  };

  return (
    <div>
      {/* Imagen de fondo */}
      <img src={bgImage} className="bg-img" alt="Fondo" />

      <div className="register-container">
        <form onSubmit={handleSubmit}>
          {/* Nombre */}
          <div className="input-box">
            <span className="icon">👤</span>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nombre"
              required
            />
          </div>

          {/* Usuario */}
          <div className="input-box">
            <span className="icon">👑</span>
            <input
              type="text"
              id="user"
              value={formData.user}
              onChange={handleChange}
              placeholder="Usuario"
              required
            />
          </div>

          {/* Correo */}
          <div className="input-box">
            <span className="icon">@</span>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Correo Electrónico"
              required
            />
          </div>

          {/* Rol */}
          <div className="input-box">
            <span className="icon">👥</span>
            <select
              id="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar Rol</option>
              <option value="productor">Productor</option>
              <option value="oyente">Oyente</option>
              <option value="artista">Artista</option>
            </select>
          </div>

          {/* Contraseña */}
          <div className="input-box">
            <span className="icon">🔒</span>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Crea una Contraseña"
              required
            />
          </div>

          {/* Botón */}
          <button type="submit">REGISTRARSE</button>
        </form>
      </div>
    </div>
  );
};

export default Register;