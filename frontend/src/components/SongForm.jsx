import { useState } from "react";
import "./SongForm.css";

function SongForm() {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    duracion: "",
    archivoUrl: "",
    portadaUrl: "",
    letra: null,
    documentoLegal: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Canción registrada:", formData);
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
        <label>Duración</label>
        <input
          type="text"
          name="duracion"
          value={formData.duracion}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>URL del archivo MP3</label>
        <input
          type="url"
          name="archivoUrl"
          value={formData.archivoUrl}
          onChange={handleChange}
          placeholder="https://..."
          required
        />
      </div>

      <div className="form-group">
        <label>URL de portada</label>
        <input
          type="url"
          name="portadaUrl"
          value={formData.portadaUrl}
          onChange={handleChange}
          placeholder="https://..."
        />
      </div>

      <div className="form-group">
        <label>Letra (archivo)</label>
        <input type="file" name="letra" onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Documento legal</label>
        <input type="file" name="documentoLegal" onChange={handleChange} />
      </div>

      <button type="submit">Subir Canción</button>
    </form>
  );
}

export default SongForm;
