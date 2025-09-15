import { useEffect, useState } from "react";
import { getCanciones } from "../services/cancionesService";
import SongCard from "./SongCard";

function CancionesList() {
  const [canciones, setCanciones] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCanciones();
      setCanciones(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      {canciones.map((cancion) => (
        <SongCard
          key={cancion.id_cancion}
          usuario={cancion.id_usuario} // puedes cambiar por nombre si tu API lo devuelve
          titulo={cancion.titulo}
          descripcion={cancion.descripcion}
          portada_url={cancion.portada_url}
          archivo_url={cancion.archivo_url}
          likes={0} // implementar luego
        />
      ))}
    </div>
  );
}

export default CancionesList;
