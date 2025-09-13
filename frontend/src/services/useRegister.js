import { useState } from "react";

export function useRegister() {
  const [formData, setFormData] = useState({
    name: "",
    user: "",
    email: "",
    role: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // Validaciones
  const validateField = (id, value) => {
    let error = "";

    if (!value.trim()) {
      error = "Este campo es obligatorio";
    } else {
      switch (id) {
        case "name":
          if (!/^[A-Za-zÁ-ÿ\s]+$/.test(value)) {
            error = "Solo se permiten letras y espacios";
          }
          break;

        case "user":
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

  // Manejo de cambios
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    validateField(id, value);
  };

  // Validar todo el formulario
  const validateForm = () => {
    Object.entries(formData).forEach(([id, value]) => {
      validateField(id, value);
    });
    return Object.values(errors).every((err) => err === "");
  };

  return { formData, errors, handleChange, validateForm };
}
