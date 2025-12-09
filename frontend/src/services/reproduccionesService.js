// src/services/reproduccionesService.js
export const registrarReproduccion = async (id_cancion) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!user?.id_usuario || !token) {
      console.warn("⛔ No hay usuario logueado o token.");
      return;
    }

    const res = await fetch("http://127.0.0.1:8000/reproducciones/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        id_cancion,
        id_usuario: user.id_usuario,
        fecha_reproduccion: new Date().toISOString()
      })
    });

    if (!res.ok) {
      console.error(`❌ Error registrando reproducción: ${res.status}`);
      return;
    }

    const data = await res.json();
    console.log("🔥 Reproducción registrada:", data.id_reproduccion);

    // 👉 PANEL DEBUG: Dispara evento global
    window.dispatchEvent(
      new CustomEvent("reproduccion-registrada", {
        detail: {
          id_cancion,
          id_reproduccion: data.id_reproduccion,
          mensaje: "Registrada"
        }
      })
    );

  } catch (error) {
    console.error("⛔ Error registrando reproducción:", error);
  }
};
