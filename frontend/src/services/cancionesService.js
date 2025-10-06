import axios from "axios";

const API_URL = "http://127.0.0.1:8000/canciones/"; // 🔹 siempre con /

export const getCanciones = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;
    const res = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("❌ Error al traer canciones:", error.response?.data || error.message);
    return [];
  }
};

export const getCancionesPublic = async () => {
  try {
    const res = await axios.get(`${API_URL}public`);
    return res.data;
  } catch (error) {
    console.error("❌ Error al traer canciones públicas:", error.response?.data || error.message);
    return [];
  }
};

export const postCancion = async (formData) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    // 🔹 Convertir campos numéricos y agregar id_usuario
    const body = {
      ...formData,
      duracion: formData.duracion ? Number(formData.duracion) : undefined,
      id_genero: Number(formData.id_genero),
      id_usuario: user.id_usuario,  // <-- 🔑 AÑADIDO
    };

    const res = await axios.post(API_URL, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (error) {
    console.error("❌ Error al subir canción:", error.response?.data || error.message);
    throw error;
  }
};
