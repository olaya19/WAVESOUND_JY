import axios from "axios";
const API_URL = "http://127.0.0.1:8000/usuarios/";

export const getUsuariosPorRol = async (rol_id) => {
  try {
    const res = await axios.get(`${API_URL}rol/${rol_id}`);
    return res.data;
  } catch (error) {
    console.error("❌ Error al traer usuarios por rol:", error.response?.data || error.message);
    return [];
  }
};
