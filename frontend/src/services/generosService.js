import axios from "axios";
const URL = "http://127.0.0.1:8000/generos/";

export const getGeneros = async () => {
  try {
    const res = await axios.get(URL);
    return res.data;
  } catch (error) {
    console.error("❌ Error cargando géneros:", error);
    return [];
  }
};
