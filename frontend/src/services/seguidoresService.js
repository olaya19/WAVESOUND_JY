import axios from "axios";

const API_URL = "http://127.0.0.1:8000/seguidores";

export const seguirUsuario = async (id_usuario) => {
  const token = localStorage.getItem("token");

  return axios.post(`${API_URL}/seguir/${id_usuario}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(res => res.data)
  .catch(err => { throw err.response?.data || err; });
};

export const dejarDeSeguir = async (id_usuario) => {
  const token = localStorage.getItem("token");

  return axios.delete(`${API_URL}/seguir/${id_usuario}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(res => res.data)
  .catch(err => { throw err.response?.data || err; });
};

export const getSeguidos = async () => {
  const token = localStorage.getItem("token");

  return axios.get(`${API_URL}/mis_seguidos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(res => res.data)
  .catch(err => { throw err.response?.data || err; });
};
