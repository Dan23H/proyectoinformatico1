import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const ConversorMsg: React.FC = () => {
  const router = useRouter();
  
  // Estados para manejar la información del formulario y los videos convertidos
  const [nombre, setNombre] = useState('');
  const [cedula, setCedula] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [archivo, setArchivo] = useState<File | null>(null);
  const [videos, setVideos] = useState<File[]>([]); // Lista de videos convertidos

  // Cargar datos desde el header (URL) si están presentes
  useEffect(() => {
    if (router.query.nombre) setNombre(router.query.nombre as string);
    if (router.query.cedula) setCedula(router.query.cedula as string);
  }, [router.query]);

  // Manejador para el cambio del archivo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setArchivo(e.target.files[0]);
    }
  };

  // Función para convertir el archivo
  const handleConvert = (e: React.FormEvent) => {
    e.preventDefault(); // Evitar la recarga de la página
    if (archivo) {
      setVideos([...videos, archivo]); // Añadir el archivo convertido a la lista de videos
      setArchivo(null); // Resetear el input de archivo
    }
  };

  // Función para eliminar un video de la lista
  const handleDeleteVideo = (index: number) => {
    setVideos(videos.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2>Formulario de Conversión de Archivos</h2>
      <form onSubmit={handleConvert}>
        <label>
          Nombre:
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </label>
        <label>
          Cédula:
          <input
            type="text"
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
            required
          />
        </label>
        <label>
          Descripción de la cita:
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </label>
        <label>
          Archivo:
          <input
            type="file"
            onChange={handleFileChange}
            accept="video/*"
            required
          />
        </label>
        <button type="submit" disabled={!archivo}>Convertir archivo</button>
      </form>

      <h3>Videos Convertidos:</h3>
      <ul>
        {videos.map((video, index) => (
          <li key={index}>
            {video.name}
            <button onClick={() => handleDeleteVideo(index)}>Eliminar</button>
          </li>
        ))}
      </ul>
      
      <Link href="/homeDoctor">
        <button disabled={videos.length === 0}>Enviar</button>
      </Link>
      <Link href="/homeDoctor">
        <button>Volver</button>
      </Link>
    </div>
  );
};

export default ConversorMsg;
