import { useState } from "react";
import SongForm from "./SongForm";
import AlbumForm from "./AlbumForm";
import "./UploadModule.css";

function UploadModule({ rolUsuario }) {
  const [opcion, setOpcion] = useState("");

  if (rolUsuario !== 1) {
    return (
      <div className="upload-module">
        <p className="upload-module-denied">
          🚫 Solo los artistas pueden subir canciones o álbumes.
        </p>
      </div>
    );
  }

  return (
    <div className="upload-wrapper">
      <div className="upload-module">
        <h1>Subir contenido</h1>
        <div className="upload-options">
          <button
            className={`upload-btn ${opcion === "cancion" ? "active" : ""}`}
            onClick={() => setOpcion("cancion")}
          >
            Registrar Canción
          </button>
          <button
            className={`upload-btn ${opcion === "album" ? "active" : ""}`}
            onClick={() => setOpcion("album")}
          >
            Registrar Álbum
          </button>
        </div>

        {opcion === "cancion" && <SongForm />}
        {opcion === "album" && <AlbumForm />}
      </div>
    </div>
  );
}

export default UploadModule;
