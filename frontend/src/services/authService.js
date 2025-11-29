import axios from "axios";

// --------------------- REGISTER ---------------------
const REGISTER_URL = "http://127.0.0.1:8000/usuarios/register";

export const registerUsuario = async (datos) => {
  try {
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
const LOGIN_URL = "http://127.0.0.1:8000/usuarios/login";

export const loginUsuario = async ({ username, password }) => {
  try {
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    const res = await axios.post(LOGIN_URL, formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return res.data; // { access_token, token_type }
  } catch (error) {
    console.error("❌ Error en loginUsuario:", error.response?.data || error.message);
    throw error;
  }
};

// --------------------- LOGIN CON GOOGLE ---------------------
const GOOGLE_LOGIN_URL = "http://127.0.0.1:8000/google/login";

export const loginConGoogle = async (googleData) => {
  try {
    const res = await axios.post(GOOGLE_LOGIN_URL, googleData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error("❌ Error en loginConGoogle:", error.response?.data || error.message);
    throw error;
  }
};


// --------------------- LOGOUT ---------------------
const LOGOUT_URL = "http://127.0.0.1:8000/usuarios/logout";

export const logoutUsuario = async (token) => {
  try {
    const res = await axios.post(LOGOUT_URL, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    return res.data;
  } catch (error) {
    console.error("❌ Error en logoutUsuario:", error.response?.data || error.message);
    throw error;
  }
};
