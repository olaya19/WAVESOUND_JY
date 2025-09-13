import React, { useState } from "react";
import "./registerWork.css";

const RegistroObra = () => {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    tipoObra: "Álbum",
    genero: "Pop",
    autorPdf: null,
    archivoMp3: null,
    letraPdf: null,
    albumZip: null,
    acepto: false,
  });

  // Manejo de cambios en inputs de texto y selects
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Enviar formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.acepto) {
      alert("Debes aceptar los términos antes de registrar la obra.");
      return;
    }
    console.log("Datos enviados:", formData);
    alert("✅ Registro de obra enviado con éxito");
  };

  return (
    <div className="container">
      {/* Cabecera */}
      <header className="header">
        <h2>🎵 WaveSound - Registro de Obras</h2>
        <p>
          Bienvenido <strong>Mike Cross</strong> | Rol:{" "}
          <span className="tag">Artista</span>
        </p>
      </header>

      <form onSubmit={handleSubmit}>
        <main className="grid">
          {/* Columna izquierda */}
          <section className="card">
            <h3>Información de la Obra</h3>

            <label htmlFor="titulo">Título</label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              placeholder="Ej: Te Amaré Por Siempre"
              value={formData.titulo}
              onChange={handleChange}
              required
            />

            <label htmlFor="descripcion">Descripción</label>
            <textarea
              id="descripcion"
              name="descripcion"
              placeholder="Breve reseña de la obra..."
              value={formData.descripcion}
              onChange={handleChange}
            ></textarea>

            <div className="two-cols">
              <div>
                <label htmlFor="tipoObra">Tipo de Obra</label>
                <select
                  id="tipoObra"
                  name="tipoObra"
                  value={formData.tipoObra}
                  onChange={handleChange}
                >
                  <option>Álbum</option>
                  <option>Canción</option>
                  <option>Letra</option>
                </select>
              </div>
              <div>
                <label htmlFor="genero">Género</label>
                <select
                  id="genero"
                  name="genero"
                  value={formData.genero}
                  onChange={handleChange}
                >
                  <option>Pop</option>
                  <option>Rock</option>
                  <option>Reggaetón</option>
                  <option>Jazz</option>
                  <option>Electrónica</option>
                  <option>Baladas</option>
                  <option>Reggae</option>
                </select>
              </div>
            </div>
          </section>

          {/* Columna derecha */}
          <section className="card">
            <h3>Adjuntar Archivos</h3>
            <div className="uploads">
              <label>Autoría (PDF)</label>
              <input
                type="file"
                name="autorPdf"
                accept=".pdf"
                onChange={handleChange}
              />

              <label>Archivo MP3</label>
              <input
                type="file"
                name="archivoMp3"
                accept=".mp3"
                onChange={handleChange}
              />

              <label>Letra (PDF)</label>
              <input
                type="file"
                name="letraPdf"
                accept=".pdf"
                onChange={handleChange}
              />

              <label>Álbum (ZIP)</label>
              <input
                type="file"
                name="albumZip"
                accept=".zip"
                onChange={handleChange}
              />
            </div>
          </section>
        </main>

        {/* Confirmación */}
        <section className="card confirmacion">
          <h3>Confirmación de Autoría</h3>
          <p>
            Declaro que soy el autor de esta obra y poseo los derechos para
            registrarla en WaveSound. <a href="#">[Ver términos]</a>
          </p>
          <label className="switch">
            <input
              type="checkbox"
              id="acepto"
              name="acepto"
              checked={formData.acepto}
              onChange={handleChange}
            />
            <span className="slider"></span>
          </label>
          <span>
            Acepto los términos y confirmo la veracidad de la información.
          </span>
        </section>

        {/* Botón */}
        <button type="submit" className="submit-btn">
          Guardar Registro
        </button>
      </form>
    </div>
  );
};

export default RegistroObra; 