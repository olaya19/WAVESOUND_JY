const API_URL = "http://127.0.0.1:8000/playlists";

// Crear una playlist
export const crearPlaylist = async (data) => {
  try {
    const res = await fetch(`${API_URL}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("No se pudo crear playlist");
    return await res.json();
  } catch (err) {
    console.error("Error al crear playlist:", err);
    throw err;
  }
};

// Obtener todas las playlists del usuario
export const obtenerPlaylistsUsuario = async (id_usuario) => {
  const res = await fetch(`${API_URL}/usuario/${id_usuario}`);
  return await res.json();
};

// Agregar canción a playlist
export const agregarCancionAPlaylist = async (id_lista, id_cancion) => {
  const res = await fetch(`${API_URL}/${id_lista}/agregar-cancion`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id_cancion }),
  });

  if (!res.ok) throw new Error("No se pudo agregar la canción");
  return await res.json();
};

// Obtener canciones de una playlist
export const obtenerCancionesPlaylist = async (id_lista) => {
  const res = await fetch(`${API_URL}/${id_lista}/canciones`);
  return await res.json();
};
