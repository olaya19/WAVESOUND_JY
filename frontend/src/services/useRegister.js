// src/services/useRegister.js
import { useState } from "react";

export function useRegister() {
  const [formData, setFormData] = useState({
    username: "",
    nickname: "",
    email: "",
    role: "", // id del rol: 1, 2, 3...
    password: "",
  });

  const [errors, setErrors] = useState({});

  // Validaciones por campo
  const validateField = (id, value) => {
    let error = "";

    if (!value.trim()) {
      error = "Este campo es obligatorio";
    } else {
      switch (id) {
        case "username":
          if (!/^[A-Za-zÁ-ÿ\s]+$/.test(value)) {
            error = "Solo se permiten letras y espacios";
          }
          break;

        case "nickname":
          if (!/^[A-Za-z0-9._]+$/.test(value)) {
            error = "Solo letras, números, . y _ (sin espacios)";
          }
          break;

        case "email":
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            error = "Correo no válido";
          }
          break;

        case "password":
          if (value.length < 8 || value.length > 10) {
            error = "Debe tener entre 8 y 10 caracteres";
          }
          if (/\s/.test(value)) {
            error = "No puede contener espacios";
          }
          break;

        default:
          break;
      }
    }

    setErrors((prev) => ({ ...prev, [id]: error }));
  };

  // Manejo de cambios en el formulario
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    validateField(id, value);
  };

  // Validar todo el formulario
  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Validación de campos
    Object.entries(formData).forEach(([id, value]) => {
      let error = "";

      if (!value.trim()) {
        error = "Este campo es obligatorio";
        valid = false;
      } else {
        switch (id) {
          case "username":
            if (!/^[A-Za-zÁ-ÿ\s]+$/.test(value)) {
              error = "Solo se permiten letras y espacios";
              valid = false;
            }
            break;
          case "nickname":
            if (!/^[A-Za-z0-9._]+$/.test(value)) {
              error = "Solo letras, números, . y _ (sin espacios)";
              valid = false;
            }
            break;
          case "email":
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
              error = "Correo no válido";
              valid = false;
            }
            break;
          case "password":
            if (value.length < 8 || value.length > 10) {
              error = "Debe tener entre 8 y 10 caracteres";
              valid = false;
            }
            if (/\s/.test(value)) {
              error = "No puede contener espacios";
              valid = false;
            }
            break;
          default:
            break;
        }
      }

      newErrors[id] = error;
    });

    // Validación de rol
    if (!formData.role) {
      newErrors.role = "Debes seleccionar un rol";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Transformar formData al formato que espera FastAPI
  const getApiPayload = () => ({
    nombre_usuario: formData.username,
    nickname: formData.nickname,
    email: formData.email,
    contraseña: formData.password,
    id_rol: parseInt(formData.role, 10),
  });

  return { formData, errors, handleChange, validateForm, getApiPayload };
}
