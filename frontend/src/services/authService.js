import axios from "axios";

const API_URL = "http://127.0.0.1:8000/register/"; // Cambia esto por la URL de tu API

export const registerUsuario = async (datos) => {
  try {
    const res = await axios.post(API_URL, datos);
    return res.data;
  } catch (error) {
    console.error("❌ Error en registerUsuario:", error.response?.data || error.message);
    throw error;
  }
};