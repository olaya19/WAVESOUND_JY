// app_wavesound/services/favoritosService.js

// Trae el token guardado en localStorage
const getAuthToken = () => localStorage.getItem("token");

// Agregar canción a favoritos
export const agregarFavorito = async (id_cancion) => {
  const token = getAuthToken();
  console.log("Agregar favorito - token:", token, "id_cancion:", id_cancion);

  if (!token) throw new Error("Usuario no autenticado");
  if (!id_cancion) throw new Error("ID de canción inválido");

  const res = await fetch("http://127.0.0.1:8000/favoritos/", {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ id_cancion })
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || "No se pudo agregar a favoritos");
  }

  return await res.json();
};

// Eliminar canción de favoritos
export const eliminarFavorito = async (id_cancion) => {
  const token = getAuthToken();
  console.log("Eliminar favorito - token:", token, "id_cancion:", id_cancion);

  if (!token) throw new Error("Usuario no autenticado");
  if (!id_cancion) throw new Error("ID de canción inválido");

  const res = await fetch(`http://127.0.0.1:8000/favoritos/${id_cancion}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || "No se pudo eliminar de favoritos");
  }

  return await res.json();
};

// Obtener todos los favoritos del usuario
export const obtenerFavoritos = async () => {
  const token = getAuthToken();
  console.log("Obtener favoritos - token:", token);

  if (!token) throw new Error("Usuario no autenticado");

  const res = await fetch("http://127.0.0.1:8000/favoritos/", {
    headers: { "Authorization": `Bearer ${token}` }
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || "No se pudieron obtener los favoritos");
  }

  return await res.json();
};

