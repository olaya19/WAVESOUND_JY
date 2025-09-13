import React from "react";
import "./register.css";
import { FaUser, FaCrown, FaAt, FaUsers, FaLock } from "react-icons/fa";
import { useRegister } from "../services/useRegister";
import { registerUsuario } from "../services/authService";

const Register = () => {
  const { formData, errors, handleChange, validateForm } = useRegister();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("Revisa los errores en el formulario");
      return;
    }

    try {
      console.log("📤 Enviando datos a la API:", formData);

      const respuesta = await registerUsuario(formData);

      console.log("✅ Usuario registrado:", respuesta);
      alert("Usuario registrado con éxito 🎉");

      // Aquí podrías redirigir al login si quieres:
      // navigate("/login");

    } catch (error) {
      alert("Error al registrar usuario. Ver consola.");
      console.error("❌ Error en registro:", error);
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-container">
        <h2>Crear Cuenta</h2>
        <form onSubmit={handleSubmit}>
          {/* Nombre */}
          <div className="input-box">
            <span className="icon-circle"><FaUser /></span>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nombre"
              required
            />
          </div>
          {errors.name && <small className="error-text">{errors.name}</small>}

          {/* Usuario */}
          <div className="input-box">
            <span className="icon-circle"><FaCrown /></span>
            <input
              type="text"
              id="user"
              value={formData.user}
              onChange={handleChange}
              placeholder="Usuario"
              required
            />
          </div>
          {errors.user && <small className="error-text">{errors.user}</small>}

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
              <option value="productor">Productor</option>
              <option value="oyente">Oyente</option>
              <option value="artista">Artista</option>
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
