import axios from "axios";

const API_URL = "http://127.0.0.1:8000/perfiles";

// ===============================
// 📌 Crear perfil
// ===============================
export const crearPerfil = async (formData, token) => {
  try {
    const response = await axios.post(`${API_URL}/`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear perfil:", error.response?.data || error);
    throw error;
  }
};

// ===============================
// 📌 Obtener mi perfil
// ===============================
export const getMiPerfil = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener mi perfil:", error.response?.data || error);
    throw error;
  }
};

// ===============================
// 📌 Editar perfil
// ===============================
export const editarPerfil = async (formData, token) => {
  try {
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

// ===============================
// 📌 Obtener perfil público
// ===============================
export const getPerfilByUsuario = async (id_usuario) => {
  try {
    const response = await axios.get(`${API_URL}/${id_usuario}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener perfil público:", error.response?.data || error);
    throw error;
  }
};
