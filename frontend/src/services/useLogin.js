// src/services/useLogin.js
import { useState } from "react";
import { loginUsuario, loginConGoogle } from "./authService";

export function useLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // -------------------------------------
  // Validación básica
  // -------------------------------------
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

  // -------------------------------------
  // Login normal Usuario/Password
  // -------------------------------------
  const handleLogin = async () => {
    if (!validate()) return null;

    setLoading(true);
    try {
      const datos = { username, password };
      const res = await loginUsuario(datos);

      const userData = {
        id_usuario: res.id_usuario,
        nombre_usuario: res.nombre_usuario,
        id_rol: res.id_rol,
        token: res.access_token,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", res.access_token);

      return res;
    } catch (err) {
      setErrors({ api: err.response?.data?.detail || "Error de conexión" });
      return null;
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------------
  // Login con Google
  // -------------------------------------
  const handleGoogleResponse = async (credential, navigate, Swal) => {
    try {
      const googlePayload = { credential };

      const res = await loginConGoogle(googlePayload);

      const userData = {
        id_usuario: res.id_usuario,
        nombre_usuario: res.nombre_usuario,
        id_rol: res.id_rol,
        token: res.access_token,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", res.access_token);

      const rolNombre =
        ["Administrador", "Oyente", "Artista", "Productor"][res.id_rol - 1] ||
        "Usuario";

      await Swal.fire({
        icon: "success",
        title: `Bienvenido, ${res.nombre_usuario}!`,
        text: `Has iniciado sesión como ${rolNombre}`,
        confirmButtonColor: "#6e00ff",
        background: "#121212",
        color: "#fff",
      });

      res.id_rol === 1 ? navigate("/AdminPanel") : navigate("/Home");
    } catch (err) {
      console.error("Error Google Login:", err);
      Swal.fire({
        icon: "error",
        title: "Error con Google",
        text: err.response?.data?.detail || "No se pudo iniciar sesión",
        background: "#121212",
        color: "#fff",
      });
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
    handleGoogleResponse,
  };
}
