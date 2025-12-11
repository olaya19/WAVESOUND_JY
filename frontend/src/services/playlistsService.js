const API_URL = "http://127.0.0.1:8000/playlists";

/* =========================================================
   CREAR PLAYLIST
========================================================= */
export const crearPlaylist = async (data) => {
  try {
    const res = await fetch(`${API_URL}/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("No se pudo crear playlist");
    return await res.json();
  } catch (err) {
    console.error("Error al crear playlist:", err);
    throw err;
  }
};

/* =========================================================
   OBTENER TODAS LAS PLAYLISTS DE UN USUARIO
========================================================= */
export const obtenerPlaylistsUsuario = async (id_usuario) => {
  try {
    const res = await fetch(`${API_URL}/usuario/${id_usuario}`);
    if (!res.ok) throw new Error("No se pudieron obtener playlists");
    return await res.json();
  } catch (err) {
    console.error("Error al obtener playlists:", err);
    throw err;
  }
};

/* =========================================================
   AGREGAR CANCIÓN A PLAYLIST
========================================================= */
export const agregarCancionAPlaylist = async (id_lista, id_cancion) => {
  try {
    const res = await fetch(`${API_URL}/${id_lista}/agregar-cancion`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_cancion }),
    });

    if (!res.ok) throw new Error("No se pudo agregar la canción");
    return await res.json();
  } catch (err) {
    console.error("Error al agregar canción a playlist:", err);
    throw err;
  }
};

/* =========================================================
   ELIMINAR CANCIÓN DE PLAYLIST
========================================================= */
export const eliminarCancionDePlaylist = async (id_lista, id_cancion) => {
  try {
    const res = await fetch(`${API_URL}/${id_lista}/eliminar-cancion`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_cancion }),
    });

    if (!res.ok) throw new Error("No se pudo eliminar la canción");
    return await res.json();
  } catch (err) {
    console.error("Error al eliminar canción:", err);
    throw err;
  }
};

/* =========================================================
   OBTENER CANCIONES DE UNA PLAYLIST
========================================================= */
export const obtenerCancionesPlaylist = async (id_lista) => {
  try {
    const res = await fetch(`${API_URL}/${id_lista}/canciones`);
    if (!res.ok) throw new Error("No se pudieron obtener las canciones");
    return await res.json();
  } catch (err) {
    console.error("Error al obtener canciones:", err);
    throw err;
  }
};

/* =========================================================
   ELIMINAR PLAYLIST
========================================================= */
export const eliminarPlaylist = async (id_lista) => {
  try {
    const res = await fetch(`${API_URL}/${id_lista}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("No se pudo eliminar playlist");
    return await res.json();
  } catch (err) {
    console.error("Error al eliminar playlist:", err);
    throw err;
  }
};
