import React, { useEffect, useState } from "react";
import SongMiniCard from "../components/SongMiniCard";
import Swal from "sweetalert2";

// Servicios
import {
  crearRegistro,
  generarCertificado,
  obtenerDocumentosRegistro,
  descargarDocumento,
  obtenerRegistrosUsuario
} from "../services/derechosService";

import { getCancionesByUser } from "../services/cancionesService";
import "./Derechos.css";

export default function DerechosAutor() {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const id_usuario = user?.id_usuario;

  const [canciones, setCanciones] = useState([]);
  const [registros, setRegistros] = useState([]);
  const [selectedCancion, setSelectedCancion] = useState(null);
  const [documentos, setDocumentos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    nombre_autor: user?.nombre_usuario || "",
    fecha_acuerdo: new Date().toISOString().slice(0, 10),
    documento_legal: "Acuerdo de Certificacion Autoria Musical",
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [cancionForm, setCancionForm] = useState(null);

  // ➕ NUEVO estado para ver todos los certificados
  const [mostrarTodos, setMostrarTodos] = useState(false);
  const [todosDocumentos, setTodosDocumentos] = useState([]);

  // Cargar canciones y registros del usuario
  useEffect(() => {
    if (!id_usuario) return;
    Promise.all([
      getCancionesByUser(id_usuario),
      obtenerRegistrosUsuario(id_usuario)
    ])
      .then(([cancionesData, registrosData]) => {
        setCanciones(cancionesData);
        setRegistros(registrosData);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id_usuario]);

  // Cargar documentos de la canción seleccionada
  useEffect(() => {
    if (!selectedCancion || !selectedCancion.id_registro) return;
    obtenerDocumentosRegistro(selectedCancion.id_registro)
      .then(data => setDocumentos(data))
      .catch(err => console.error(err));
  }, [selectedCancion]);

  if (!id_usuario) return <p>Debes iniciar sesión para ver tus derechos de autor.</p>;

  // Abrir modal con formulario
  const handleAbrirFormulario = (cancion) => {
    setCancionForm(cancion);
    setFormData({
      nombre_autor: user?.nombre_usuario || "",
      fecha_acuerdo: new Date().toISOString().slice(0, 10),
      documento_legal: "Acuerdo de Certificacion Autoria Musical",
    });
    setModalVisible(true);
  };

  // Generar certificado
  const handleGenerarCertificado = async () => {
    try {
      Swal.fire({
        title: "Generando certificado...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading()
      });

      const registro = await crearRegistro({
        id_cancion: cancionForm.id_cancion,
        ...formData,
        id_usuario_autor: id_usuario,
      });

      await generarCertificado(registro.id_registro);

      Swal.close();
      Swal.fire({
        icon: "success",
        title: "Certificado generado",
        text: `El certificado de "${cancionForm.titulo}" se generó correctamente.`,
        timer: 2000,
        showConfirmButton: false,
      });

      // Actualizar registros
      setRegistros([...registros, registro]);
      setSelectedCancion({ ...cancionForm, id_registro: registro.id_registro });
      setModalVisible(false);

    } catch (err) {
      Swal.close();
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo generar el certificado.",
      });
    }
  };

  const handleVerCertificado = (cancion) => {
    const registro = registros.find(r => r.id_cancion === cancion.id_cancion);
    if (registro) setSelectedCancion({ ...cancion, id_registro: registro.id_registro });
  };

  const handleDescargar = (id_documento) => {
    descargarDocumento(id_documento)
      .catch(() => Swal.fire("Error", "No se pudo descargar el documento", "error"));
  };

  // ➕ FUNCIÓN NUEVA: ver todos los certificados del usuario
  const handleVerTodos = async () => {
    try {
      setMostrarTodos(true);
      const documentosUsuario = [];

      for (const reg of registros) {
        const docs = await obtenerDocumentosRegistro(reg.id_registro);
        documentosUsuario.push(...docs);
      }

      setTodosDocumentos(documentosUsuario);
    } catch (err) {
      Swal.fire("Error", "No se pudieron cargar los certificados", "error");
    }
  };

  return (
    <div className="derechos-container">
      <h1>Derechos de Autor</h1>
      <p>Gestiona tus canciones y certificados aquí.</p>

      {/* ➕ Botón nuevo */}
      <button className="btn-todos" onClick={handleVerTodos}>
        Ver Todos los Certificados
      </button>

      {/* LISTA DE CANCIONES */}
      <div className="canciones-lista">
        {loading && <p>Cargando canciones...</p>}
        {!loading && canciones.length === 0 && <p>No tienes canciones subidas.</p>}

        {!loading && canciones.map(c => {
          const tieneRegistro = registros.some(r => r.id_cancion === c.id_cancion);
          return (
            <div key={c.id_cancion} className="cancion-fila">
              <SongMiniCard
                titulo={c.titulo}
                archivo_url={c.archivo_url}
                portada_url={c.portada_url}
              />
              {tieneRegistro ? (
                <button className="cert-btn" onClick={() => handleVerCertificado(c)}>
                  Ver Certificado
                </button>
              ) : (
                <button className="cert-btn" onClick={() => handleAbrirFormulario(c)}>
                  Crear Certificado
                </button>
              )}
            </div>
          )
        })}
      </div>

      {/* MODAL */}
      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <h3>Crear Certificado para "{cancionForm.titulo}"</h3>

            <label>
              Nombre del Autor:
              <input
                type="text"
                value={formData.nombre_autor}
                onChange={e => setFormData({...formData, nombre_autor: e.target.value})}
              />
            </label>

            <label>
              Fecha de Acuerdo:
              <input
                type="date"
                value={formData.fecha_acuerdo}
                onChange={e => setFormData({...formData, fecha_acuerdo: e.target.value})}
              />
            </label>

            <label>
              Documento Legal:
              <input
                type="text"
                value={formData.documento_legal}
                onChange={e => setFormData({...formData, documento_legal: e.target.value})}
              />
            </label>

            <div className="modal-buttons">
              <button onClick={handleGenerarCertificado}>Generar Certificado</button>
              <button onClick={() => setModalVisible(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* DOCUMENTOS DEL REGISTRO SELECCIONADO */}
      {selectedCancion && documentos.length > 0 && (
        <div className="documentos-lista">
          <h2>Certificados de "{selectedCancion.titulo}"</h2>

          <table className="derechos-table">
            <thead>
              <tr>
                <th>Tipo Documento</th>
                <th>Fecha</th>
                <th>Descargar</th>
              </tr>
            </thead>
            <tbody>
              {documentos.map(doc => (
                <tr key={doc.id_documento}>
                  <td>{doc.tipo_documento}</td>
                  <td>{new Date(doc.fecha_subida).toLocaleDateString()}</td>
                  <td>
                    <button className="cert-btn" onClick={() => handleDescargar(doc.id_documento)}>
                      Descargar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ➕ LISTADO GLOBAL */}
      {mostrarTodos && todosDocumentos.length > 0 && (
        <div className="documentos-lista">
          <h2>Todos tus Certificados</h2>

          <table className="derechos-table">
            <thead>
              <tr>
                <th>Documento</th>
                <th>Fecha</th>
                <th>Descargar</th>
              </tr>
            </thead>
            <tbody>
              {todosDocumentos.map(doc => (
                <tr key={doc.id_documento}>
                  <td>Cettificado de Autor </td>
                  <td>{new Date(doc.fecha_subida).toLocaleDateString()}</td>
                  <td>
                    <button className="cert-btn" onClick={() => handleDescargar(doc.id_documento)}>
                      Descargar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}
