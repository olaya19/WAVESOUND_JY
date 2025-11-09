import React, { useState } from "react";
import "./Register.css";
import { FaUser, FaCrown, FaAt, FaUsers, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useRegister } from "../services/useRegister";
import { registerUsuario } from "../services/authService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import bgImage from "../assets/FONDO.jpeg";

const Register = () => {
  const navigate = useNavigate();
  const { formData, errors, handleChange, validateForm, getApiPayload } = useRegister();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Revisa los errores en el formulario",
        confirmButtonColor: "#6e00ff",
        background: "#121212",
        color: "#fff",
      });
      return;
    }
    try {
      const payload = getApiPayload();
      await registerUsuario(payload);
      Swal.fire({
        icon: "success",
        title: "¡Registro exitoso!",
        text: "Usuario registrado correctamente 🎉",
        confirmButtonColor: "#6e00ff",
        background: "#121212",
        color: "#fff",
      }).then(() => navigate("/Login"));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo registrar el usuario",
        confirmButtonColor: "#6e00ff",
        background: "#121212",
        color: "#fff",
      });
      console.error("❌ Error en registro:", error);
    }
  };

  return (
    <div className="register-wrapper" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="register-container">
        <h2>Crear Cuenta</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <span className="icon-circle"><FaUser /></span>
            <input type="text" id="username" value={formData.username} onChange={handleChange} placeholder="Nombre" required />
          </div>
          {errors.username && <small className="error-text">{errors.username}</small>}

          <div className="input-box">
            <span className="icon-circle"><FaCrown /></span>
            <input type="text" id="nickname" value={formData.nickname} onChange={handleChange} placeholder="Usuario" required />
          </div>
          {errors.nickname && <small className="error-text">{errors.nickname}</small>}

          <div className="input-box">
            <span className="icon-circle"><FaAt /></span>
            <input type="email" id="email" value={formData.email} onChange={handleChange} placeholder="Correo Electrónico" required />
          </div>
          {errors.email && <small className="error-text">{errors.email}</small>}

          <div className="input-box">
            <span className="icon-circle"><FaUsers /></span>
            <select id="role" value={formData.role} onChange={handleChange} required>
              <option value="">Seleccionar Rol</option>
              <option value="2">Oyente</option>
              <option value="3">Artista</option>
              <option value="4">Productor</option>
            </select>
          </div>
          {errors.role && <small className="error-text">{errors.role}</small>}

          <div className="input-box password-box">
            <span className="icon-circle"><FaLock /></span>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Crea una Contraseña"
              required
            />
            <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.password && <small className="error-text">{errors.password}</small>}

          <button type="submit">REGISTRARSE</button>
        </form>
      </div>
    </div>
  );
};

export default Register;

