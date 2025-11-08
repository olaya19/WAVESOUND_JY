import React from "react";
import "./Register.css";
import { FaUser, FaCrown, FaAt, FaUsers, FaLock } from "react-icons/fa";
import { useRegister } from "../services/useRegister";
import { registerUsuario } from "../services/authService";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/FONDO.jpeg"; // 🎯 Fondo importado

const Register = () => {
  const navigate = useNavigate();
  const { formData, errors, handleChange, validateForm, getApiPayload } = useRegister();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("Revisa los errores en el formulario");
      return;
    }
    try {
      const payload = getApiPayload();
      const respuesta = await registerUsuario(payload);
      alert("Usuario registrado con éxito 🎉");
      navigate("/Login");
    } catch (error) {
      alert("Error al registrar usuario. Intenta de nuevo.");
      console.error("❌ Error en registro:", error);
    }
  };

  return (
    <div
      className="register-wrapper"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="register-container">
        <h2>Crear Cuenta</h2>
        <form onSubmit={handleSubmit}>
          {/* Nombre real */}
          <div className="input-box">
            <span className="icon-circle"><FaUser /></span>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Nombre"
              required
            />
          </div>
          {errors.username && <small className="error-text">{errors.username}</small>}

          {/* Nickname */}
          <div className="input-box">
            <span className="icon-circle"><FaCrown /></span>
            <input
              type="text"
              id="nickname"
              value={formData.nickname}
              onChange={handleChange}
              placeholder="Usuario"
              required
            />
          </div>
          {errors.nickname && <small className="error-text">{errors.nickname}</small>}

          {/* Correo */}
          <div className="input-box">
            <span className="icon-circle"><FaAt /></span>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Correo Electrónico"
              required
            />
          </div>
          {errors.email && <small className="error-text">{errors.email}</small>}

          {/* Rol */}
          <div className="input-box">
            <span className="icon-circle"><FaUsers /></span>
            <select
              id="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar Rol</option>
              <option value="1">Artista</option>
              <option value="2">Productor</option>
              <option value="3">Oyente</option>
            </select>
          </div>
          {errors.role && <small className="error-text">{errors.role}</small>}

          {/* Contraseña */}
          <div className="input-box">
            <span className="icon-circle"><FaLock /></span>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Crea una Contraseña"
              required
            />
          </div>
          {errors.password && <small className="error-text">{errors.password}</small>}

          {/* Botón */}
          <button type="submit">REGISTRARSE</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
