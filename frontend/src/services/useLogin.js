// src/services/useLogin.js
import { useState } from "react";
import { loginUsuario } from "./authService";

export function useLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let valid = true;
    let errs = {};

    if (!username.trim()) {
      errs.username = "Este campo es obligatorio";
      valid = false;
    }
    if (!password.trim()) {
      errs.password = "Este campo es obligatorio";
      valid = false;
    }

    setErrors(errs);
    return valid;
  };

  const handleLogin = async () => {
    if (!validate()) return null;

    setLoading(true);
    try {
      // 👇 Ajuste importante: el backend espera "email_constraseña" y "contraseña"
      const datos = { email_constraseña: username, contraseña: password };
      const user = await loginUsuario(datos);

      // Guardamos el usuario en localStorage
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (err) {
      setErrors({ api: err.response?.data?.detail || "Error de conexión" });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    errors,
    loading,
    handleLogin,
  };
}
