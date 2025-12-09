const API_URL = "http://127.0.0.1:8000/playlists";

export const agregarACancion = async (id_lista, id_cancion) => {
  try {
    const res = await fetch(`${API_URL}/${id_lista}/agregar-cancion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ id_cancion })
    });
    return await res.json();
  } catch (err) {
    console.error("Error al agregar canción:", err);
    throw err;
  }
};

export const obtenerPlaylistsUsuario = async (id_usuario) => {
  try {
    const res = await fetch(`${API_URL}/usuario/${id_usuario}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });
    return await res.json();
  } catch (err) {
    console.error("Error al obtener playlists:", err);
    throw err;
  }
};

export const crearPlaylist = async (id_usuario, nombre, descripcion = "", privada = false) => {
  try {
    const res = await fetch(`${API_URL}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ id_usuario, nombre, descripcion, privada })
    });
    if (!res.ok) throw new Error("No se pudo crear playlist");
    return await res.json();
  } catch (err) {
    console.error("Error al crear playlist:", err);
    throw err;
  }
};
