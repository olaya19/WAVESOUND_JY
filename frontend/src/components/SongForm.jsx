import { useState } from "react";
import { postCancion } from "../services/cancionesService";
import "./SongForm.css";

function SongForm() {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    duracion: "",
    archivo_url: "",
    portada_url: "",
    id_genero: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await postCancion(formData);
      alert("✅ Canción subida correctamente");
      console.log("Nueva canción:", response);

      // 🔹 Limpiar formulario
      setFormData({
        titulo: "",
        descripcion: "",
        duracion: "",
        archivo_url: "",
        portada_url: "",
        id_genero: "",
      });
    } catch (err) {
      console.error("❌ Error al subir canción:", err);
      alert("Error al subir la canción. Ver consola.");
    }
  };

  return (
    <form className="song-form" onSubmit={handleSubmit}>
      <h2>Registrar Canción</h2>

      <div className="form-group">
        <label>Título</label>
        <input
          type="text"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Descripción</label>
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Duración (segundos)</label>
        <input
          type="number"
          name="duracion"
          value={formData.duracion}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>URL del archivo MP3</label>
        <input
          type="url"
          name="archivo_url"
          value={formData.archivo_url}
          onChange={handleChange}
          placeholder="https://..."
          required
        />
      </div>

      <div className="form-group">
        <label>URL de portada</label>
        <input
          type="url"
          name="portada_url"
          value={formData.portada_url}
          onChange={handleChange}
          placeholder="https://..."
        />
      </div>

      <div className="form-group">
        <label>Género musical</label>
        <select
          name="id_genero"
          value={formData.id_genero}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona un género</option>
          <option value="1">Balada</option>
          <option value="2">Corridos</option>
          <option value="3">Salsa</option>
          <option value="4">Reggaetón</option>
          <option value="5">Bachata</option>
          <option value="6">Popular</option>
        </select>
      </div>

      <button type="submit">Subir Canción</button>
    </form>
  );
}

export default SongForm;
