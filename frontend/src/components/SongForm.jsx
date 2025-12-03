import { useState } from "react";
import { postCancion } from "../services/cancionesService";
import Swal from "sweetalert2"; // 🔹 Importar SweetAlert2
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

      // 🔹 SweetAlert2 de éxito
      Swal.fire({
        icon: "success",
        title: "¡Canción subida con éxito!",
        text: `La canción "${formData.titulo}" se ha registrado correctamente.`,
        showConfirmButton: true,
        confirmButtonColor: "#3085d6",
      });

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

      // 🔹 SweetAlert2 de error
      Swal.fire({
        icon: "error",
        title: "Error al subir la canción",
        text: "Revisa la consola para más detalles.",
        showConfirmButton: true,
        confirmButtonColor: "#d33",
      });
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
          <option value="1">Bachata</option>
          <option value="2">Balada</option>
          <option value="3">corridos tumbados</option>
          <option value="4">Hip Hop</option>
          <option value="5">Jazz</option>
          <option value="6">Merengue</option>
          <option value="7">Pop</option>
          <option value="8">Pop Latino</option>
          <option value="9">Reggaetón</option>
          <option value="10">Rock</option>
          <option value="11">Salsa</option>
          <option value="12">Vallenato</option>
        </select>
      </div>

      <button type="submit">Subir Canción</button>
    </form>
  );
}

export default SongForm;


