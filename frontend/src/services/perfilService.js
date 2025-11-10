// src/services/perfilService.js
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/perfiles"; // ✅ usa 127.0.0.1 para mantener coherencia

// 🔹 Crear perfil (sin token porque normalmente es público tras logueo)
export const crearPerfil = async (perfilData) => {
  try {
    const response = await axios.post(`${API_URL}/`, perfilData);
    return response.data;
  } catch (error) {
    console.error("Error al crear perfil:", error.response?.data || error);
    throw error;
  }
};

// 🔹 Obtener el perfil del usuario actual (requiere token)
export const getMiPerfil = async (token) => {
  try {
    if (!token) throw new Error("Token no disponible ❌");
    const response = await axios.get(`${API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ encabezado correcto
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener mi perfil:", error.response?.data || error);
    throw error;
  }
};

// 🔹 Editar perfil (usa FormData porque puede incluir imagen)
export const editarPerfil = async (formData, token) => {
  try {
    if (!token) throw new Error("Token no disponible ❌");
    const response = await axios.put(`${API_URL}/editar`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al editar perfil:", error.response?.data || error);
    throw error;
  }
};

// 🔹 Obtener perfil público por ID de usuario
export const getPerfilByUsuario = async (id_usuario) => {
  try {
    const response = await axios.get(`${API_URL}/${id_usuario}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener perfil público:", error.response?.data || error);
    throw error;
  }
};
