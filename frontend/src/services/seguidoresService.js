import axios from "axios";

const API_URL = "http://127.0.0.1:8000/seguidores";

const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  return user.token || "";
};

export const seguirUsuario = async (id_usuario) => {
  const token = getToken();

  return axios.post(`${API_URL}/seguir/${id_usuario}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  })
  .then(res => res.data)
  .catch(err => { throw err.response?.data || err; });
};

export const dejarDeSeguir = async (id_usuario) => {
  const token = getToken();

  return axios.delete(`${API_URL}/seguir/${id_usuario}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  .then(res => res.data)
  .catch(err => { throw err.response?.data || err; });
};

export const getSeguidos = async () => {
  const token = getToken();

  return axios.get(`${API_URL}/mis_seguidos`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  .then(res => res.data)
  .catch(err => { throw err.response?.data || err; });
};

// ============================
// Solo seguidores del usuario logueado
// ============================
export const getSeguidores = async () => {
  const token = getToken();

  return axios.get(`${API_URL}/mis_seguidores`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  .then(res => res.data)
  .catch(err => { throw err.response?.data || err; });
};
