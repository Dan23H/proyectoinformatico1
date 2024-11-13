// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/router';

// const ConversorMsg: React.FC = () => {
//   const router = useRouter();
  
//   // Estados para manejar la información del formulario y los videos convertidos
//   const [nombre, setNombre] = useState('');
//   const [cedula, setCedula] = useState('');
//   const [descripcion, setDescripcion] = useState('');
//   const [archivo, setArchivo] = useState<File | null>(null);
//   const [videos, setVideos] = useState<File[]>([]); // Lista de videos convertidos

//   // Cargar datos desde el header (URL) si están presentes
//   useEffect(() => {
//     if (router.query.nombre) setNombre(router.query.nombre as string);
//     if (router.query.cedula) setCedula(router.query.cedula as string);
//   }, [router.query]);

//   // Manejador para el cambio del archivo
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setArchivo(e.target.files[0]);
//     }
//   };

//   // Función para convertir el archivo
//   const handleConvert = (e: React.FormEvent) => {
//     e.preventDefault(); // Evitar la recarga de la página
//     if (archivo) {
//       setVideos([...videos, archivo]); // Añadir el archivo convertido a la lista de videos
//       setArchivo(null); // Resetear el input de archivo
//     }
//   };

//   // Función para eliminar un video de la lista
//   const handleDeleteVideo = (index: number) => {
//     setVideos(videos.filter((_, i) => i !== index));
//   };

//   return (
//     <div>
//       <h2>Formulario de Conversión de Archivos</h2>
//       <form onSubmit={handleConvert}>
//         <label>
//           Nombre:
//           <input
//             type="text"
//             value={nombre}
//             onChange={(e) => setNombre(e.target.value)}
//             required
//           />
//         </label>
//         <label>
//           Cédula:
//           <input
//             type="text"
//             value={cedula}
//             onChange={(e) => setCedula(e.target.value)}
//             required
//           />
//         </label>
//         <label>
//           Descripción de la cita:
//           <textarea
//             value={descripcion}
//             onChange={(e) => setDescripcion(e.target.value)}
//             required
//           />
//         </label>
//         <label>
//           Archivo:
//           <input
//             type="file"
//             onChange={handleFileChange}
//             accept="video/*"
//             required
//           />
//         </label>
//         <button type="submit" disabled={!archivo}>Convertir archivo</button>
//       </form>

//       <h3>Videos Convertidos:</h3>
//       <ul>
//         {videos.map((video, index) => (
//           <li key={index}>
//             {video.name}
//             <button onClick={() => handleDeleteVideo(index)}>Eliminar</button>
//           </li>
//         ))}
//       </ul>
      
//       <Link href="/homeDoctor">
//         <button disabled={videos.length === 0}>Enviar</button>
//       </Link>
//       <Link href="/homeDoctor">
//         <button>Volver</button>
//       </Link>
//     </div>
//   );
// };

// export default ConversorMsg;

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const ConversorMsg: React.FC = () => {
  const router = useRouter();
  
  const [nombre, setNombre] = useState('');
  const [cedula, setCedula] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [archivo, setArchivo] = useState<File | null>(null);
  const [videos, setVideos] = useState<File[]>([]);

  useEffect(() => {
    if (router.query.nombre) setNombre(router.query.nombre as string);
    if (router.query.cedula) setCedula(router.query.cedula as string);
  }, [router.query]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setArchivo(e.target.files[0]);
    }
  };

  const handleConvert = (e: React.FormEvent) => {
    e.preventDefault();
    if (archivo) {
      setVideos([...videos, archivo]);
      setArchivo(null);
    }
  };

  const handleDeleteVideo = (index: number) => {
    setVideos(videos.filter((_, i) => i !== index));
  };

  return (
    <div className="conversor-container">
      <h2>Formulario de Conversión de Archivos</h2>
      <form onSubmit={handleConvert} className="form-container">
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
      <ul className="videos-list">
        {videos.map((video, index) => (
          <li key={index} className="video-item">
            {video.name}
            <button onClick={() => handleDeleteVideo(index)}>Eliminar</button>
          </li>
        ))}
      </ul>
      
      <div className="actions">
        <Link href="/homeDoctor">
          <button disabled={videos.length === 0}>Enviar</button>
        </Link>
        <Link href="/homeDoctor">
          <button>Volver</button>
        </Link>
      </div>

      <style jsx>{`
        .conversor-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 2rem;
          background-color: #f9fafb;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        h2 {
          text-align: center;
          color: #333;
          margin-bottom: 1.5rem;
        }

        .form-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        label {
          display: flex;
          flex-direction: column;
          font-size: 0.9rem;
          color: #555;
        }

        input[type="text"], textarea, input[type="file"] {
          padding: 0.75rem;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          margin-top: 0.25rem;
        }

        textarea {
          resize: vertical;
          min-height: 80px;
        }

        button[type="submit"] {
          padding: 0.75rem;
          font-size: 1rem;
          color: #fff;
          background-color: #0070f3;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        button[type="submit"]:hover {
          background-color: #005bb5;
        }

        button[type="submit"]:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }

        .videos-list {
          list-style: none;
          padding: 0;
          margin: 1rem 0;
        }

        .video-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem 0;
          border-bottom: 1px solid #e0e0e0;
        }

        .video-item button {
          padding: 0.3rem 0.5rem;
          font-size: 0.8rem;
          color: #fff;
          background-color: #ff5a5f;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .video-item button:hover {
          background-color: #e0484e;
        }

        .actions {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
          justify-content: center;
        }

        .actions button {
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          color: #fff;
          background-color: #0070f3;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .actions button:hover {
          background-color: #005bb5;
        }

        .actions button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }

        @media (max-width: 480px) {
          .conversor-container {
            padding: 1.5rem;
          }

          h2 {
            font-size: 1.5rem;
          }

          input[type="text"], textarea, input[type="file"], .actions button {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ConversorMsg;
