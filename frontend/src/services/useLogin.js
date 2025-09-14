import { useState } from "react";
import { loginUsuario } from "./authService";

export function useLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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

  const handleLogin = async () => {
    if (!validate()) return null;

    setLoading(true);
    try {
      const datos = { username, password };
      const res = await loginUsuario(datos);

      // Guardamos token y datos del usuario en localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          nombre_usuario: res.nombre_usuario,
          id_rol: res.id_rol,
          token: res.access_token,
        })
      );

      return res;
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

