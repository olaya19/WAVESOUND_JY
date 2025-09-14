import axios from "axios";

// --------------------- REGISTER ---------------------
const REGISTER_URL = "http://127.0.0.1:8000/register/";

export const registerUsuario = async (datos) => {
  try {
    // Aquí mandamos JSON
    const res = await axios.post(REGISTER_URL, datos, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error("❌ Error en registerUsuario:", error.response?.data || error.message);
    throw error;
  }
};

// --------------------- LOGIN ---------------------
const LOGIN_URL = "http://127.0.0.1:8000/login/";

export const loginUsuario = async ({ email_constraseña, contraseña }) => {
  try {
    // Aquí mandamos como form-data
    const formData = new URLSearchParams();
    formData.append("email_constraseña", email_constraseña);
    formData.append("contraseña", contraseña);

    const res = await axios.post(LOGIN_URL, formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return res.data; // { id_usuario, nombre_usuario, rol }
  } catch (error) {
    console.error("❌ Error en loginUsuario:", error.response?.data || error.message);
    throw error;
  }
};
