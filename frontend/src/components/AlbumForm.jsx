import { useState } from "react";
import "./AlbumForm.css";

function AlbumForm() {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    portadaUrl: "",
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
    console.log("Álbum registrado:", formData);
  };

  return (
    <form className="album-form" onSubmit={handleSubmit}>
      <h2>Registrar Álbum</h2>

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
        <label>Documento legal</label>
        <input
          type="file"
          name="documentoLegal"
          onChange={handleChange}
        />
      </div>

      <button type="submit">Subir Álbum</button>
    </form>
  );
}

export default AlbumForm;
