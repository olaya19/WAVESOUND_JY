import axios from "axios";

const API_URL = "http://127.0.0.1:8000/canciones";

// 🔹 Traer todas las canciones
export const getCanciones = async () => {
  try {
    const token = localStorage.getItem("token"); // auth 🔒
    const res = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("❌ Error al traer canciones:", error);
    return [];
  }
};

// 🔹 Traer todas las canciones sin login
export const getCancionesPublic = async () => {
  try {
    const res = await axios.get(`${API_URL}/public`);
    return res.data;
  } catch (error) {
    console.error("❌ Error al traer canciones públicas:", error);
    return [];
  }
};

