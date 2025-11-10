import React, { useState, useEffect } from "react";
import "./Derechos.css";
import Swal from "sweetalert2";

function Derechos() {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const rol = user.id_rol;

  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Simulación de fetch de registros (luego conectar con backend real)
  useEffect(() => {
    const fetchRegistros = async () => {
      try {
        // Aquí se haría un fetch real a la API
        const data = [
          { id: 1, titulo: "Canción 1", usuario: "Artista1", certificado: true },
          { id: 2, titulo: "Álbum 1", usuario: "Productor1", certificado: false },
          { id: 3, titulo: "Canción 2", usuario: "Artista2", certificado: true },
        ];
        setRegistros(data);
      } catch (error) {
        console.error("Error al traer registros:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRegistros();
  }, []);

  const handleGenerarCertificado = (registro) => {
    Swal.fire({
      title: "Certificado generado ✅",
      text: `Se ha generado el certificado para "${registro.titulo}" de ${registro.usuario}`,
      icon: "success",
      confirmButtonText: "Ok",
    });
  };

  return (
    <div className="derechos-container">
      <h1>📜 Derechos de Autor</h1>
      <p>Gestión de registros y certificados de música</p>

      {loading ? (
        <p>Cargando registros...</p>
      ) : registros.length === 0 ? (
        <p>No hay registros disponibles.</p>
      ) : (
        <table className="derechos-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Usuario</th>
              <th>Certificado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {registros.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.titulo}</td>
                <td>{r.usuario}</td>
                <td>{r.certificado ? "✅ Sí" : "❌ No"}</td>
                <td>
                  {!r.certificado && (
                    <button
                      className="cert-btn"
                      onClick={() => handleGenerarCertificado(r)}
                    >
                      Generar Certificado
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Derechos;
