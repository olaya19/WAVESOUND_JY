import { useState } from "react";
import { loginUsuario } from "./authService";

export function useLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // 🔹 Validación básica
  const validate = () => {
    let valid = true;
    const errs = {};

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

  // 🔹 Función principal de login
  const handleLogin = async () => {
    if (!validate()) return null;

    setLoading(true);
    try {
      const datos = { username, password };
      const res = await loginUsuario(datos);

      // 📦 Guardamos toda la información relevante en localStorage
      const userData = {
        id_usuario: res.id_usuario,      // <-- lo que devuelve el backend
        nombre_usuario: res.nombre_usuario,
        id_rol: res.id_rol,
        token: res.access_token,
      };

      localStorage.setItem("user", JSON.stringify(userData));

      return res; // retornamos todo por si lo necesita el componente
    } catch (err) {
      console.error("❌ Error en login:", err);
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

