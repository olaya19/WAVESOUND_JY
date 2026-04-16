import axios from "axios";

const API_URL = "http://127.0.0.1:8000/admin";

export const getUsuariosAdmin = async () => {
  try {
    const res = await axios.get(`${API_URL}/usuarios`);
    return res.data;
  } catch (error) {
    console.error("Error admin usuarios:", error);
    return [];
  }
};