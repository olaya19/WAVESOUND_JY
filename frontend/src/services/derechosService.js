import axios from "axios";

// URL base
const API_URL_DERECHOS = "http://127.0.0.1:8000/derechos-autor/";

// Endpoints
export const CREAR_REGISTRO = API_URL_DERECHOS; // POST directo a /derechos-autor/
export const SUBIR_DOCUMENTO = API_URL_DERECHOS + "documento/"; // POST /derechos-autor/documento
export const GENERAR_CERTIFICADO = (id_registro) =>
  `${API_URL_DERECHOS}generar-certificado/${id_registro}`; // POST /generar_certificado/{id_registro}
export const OBTENER_REGISTROS_USUARIO = (id_usuario) =>
  `${API_URL_DERECHOS}usuario/${id_usuario}`; // GET /usuario/{id_usuario}
export const OBTENER_DOCUMENTOS_REGISTRO = (id_registro) =>
  `${API_URL_DERECHOS}documentos/${id_registro}`; // GET /documentos/{id_registro}
export const DESCARGAR_DOCUMENTO = (id_documento) =>
  `${API_URL_DERECHOS}documento/${id_documento}/descargar/`; // GET /documento/{id_documento}/descargar

// 🔹 Obtener token del usuario logueado
const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  return user?.token || "";
};

// ===============================
// 📌 Crear registro de derecho de autor
// ===============================
export const crearRegistro = async (datos) => {
  try {
    const res = await axios.post(CREAR_REGISTRO, datos, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error crear registro:", error.response?.data || error);
    throw error;
  }
};

// ===============================
// 📌 Generar certificado automáticamente
// ===============================
export const generarCertificado = async (id_registro) => {
  try {
    const res = await axios.post(GENERAR_CERTIFICADO(id_registro), {}, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error generar certificado:", error.response?.data || error);
    throw error;
  }
};

// ===============================
// 📌 Subir documento PDF manual (opcional)
// ===============================
export const subirDocumento = async (id_registro, tipo_documento, archivo) => {
  try {
    const fd = new FormData();
    fd.append("id_registro", id_registro);
    fd.append("tipo_documento", tipo_documento);
    fd.append("archivo", archivo);

    const res = await axios.post(SUBIR_DOCUMENTO, fd, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error subir documento:", error.response?.data || error);
    throw error;
  }
};

// ===============================
// 📌 Obtener registros de un usuario
// ===============================
export const obtenerRegistrosUsuario = async (id_usuario) => {
  try {
    const res = await axios.get(OBTENER_REGISTROS_USUARIO(id_usuario), {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return res.data;
  } catch (error) {
    console.error("Error obtener registros:", error.response?.data || error);
    return [];
  }
};

// ===============================
// 📌 Obtener documentos de un registro
// ===============================
export const obtenerDocumentosRegistro = async (id_registro) => {
  try {
    const res = await axios.get(OBTENER_DOCUMENTOS_REGISTRO(id_registro), {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return res.data;
  } catch (error) {
    console.error("Error obtener documentos:", error.response?.data || error);
    return [];
  }
};

// ===============================
// 📌 Descargar documento PDF
// ===============================
export const descargarDocumento = async (id_documento) => {
  try {
    const res = await axios.get(DESCARGAR_DOCUMENTO(id_documento), {
      headers: { Authorization: `Bearer ${getToken()}` },
      responseType: "blob",
    });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "certificado.pdf");
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Error descargar documento:", error.response?.data || error);
    throw error;
  }
};
