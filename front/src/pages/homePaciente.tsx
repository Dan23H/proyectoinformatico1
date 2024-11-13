// import React, { useState, useEffect } from 'react';
// interface Video {
//   id: string;
//   titulo: string;
//   fecha: string;
//   url: string;
//   descripcion: string;
// }

// const HomePaciente: React.FC = () => {
//   const [videos, setVideos] = useState<Video[]>([]);  // Estado para almacenar videos
//   const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);  // Estado para almacenar videos filtrados
//   const [filterDate, setFilterDate] = useState('');   // Estado para el filtro de fechas

//   useEffect(() => {
//     // Lógica para cargar los videos desde la base de datos a través de una API.
//     // Ejemplo de cómo integrarlo en el backend:
//     // fetch('/api/videos')
//     //   .then((response) => response.json())
//     //   .then((data) => setVideos(data));

//     // Ejemplo de datos simulados
//     const mockData: Video[] = [
//       { id: '1', titulo: 'Examen 1', fecha: '2023-10-15', url: '/videos/exam1.mp4', descripcion: 'Descripción 1' },
//       { id: '2', titulo: 'Examen 2', fecha: '2023-11-01', url: '/videos/exam2.mp4', descripcion: 'Descripción 2' },
//     ];
//     setVideos(mockData);
//     setFilteredVideos(mockData);
//   }, []);

//   const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFilterDate(e.target.value);
//     const filtered = videos.filter((video) => video.fecha.includes(e.target.value));
//     setFilteredVideos(filtered);
//   };

//   return (
//     <div>
//       <h1>Historial Médico</h1>
//       <p>Visualiza todos tus exámenes clínicos en video.</p>
//       <label htmlFor="filter-date">Filtrar por fecha:</label>
//       <input
//         type="date"
//         id="filter-date"
//         value={filterDate}
//         onChange={handleDateChange}
//       />
//       <div className="video-list">
//         {filteredVideos.length > 0 ? (
//           filteredVideos.map((video) => (
//             <div key={video.id} className="video-item">
//               <h3>{video.titulo}</h3>
//               <p>{video.fecha}</p>
//               <p>{video.descripcion}</p>
//               <video width="320" height="240" controls>
//                 <source src={video.url} type="video/mp4" />
//                 Tu navegador no soporta el elemento de video.
//               </video>
//             </div>
//           ))
//         ) : (
//           <p>No se encontraron videos para la fecha seleccionada.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HomePaciente;
import React, { useState, useEffect } from 'react';

interface Video {
  id: string;
  titulo: string;
  fecha: string;
  url: string;
  descripcion: string;
}

const HomePaciente: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    const mockData: Video[] = [
      { id: '1', titulo: 'Examen 1', fecha: '2023-10-15', url: '/videos/exam1.mp4', descripcion: 'Descripción 1' },
      { id: '2', titulo: 'Examen 2', fecha: '2023-11-01', url: '/videos/exam2.mp4', descripcion: 'Descripción 2' },
    ];
    setVideos(mockData);
    setFilteredVideos(mockData);
  }, []);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterDate(e.target.value);
    const filtered = videos.filter((video) => video.fecha.includes(e.target.value));
    setFilteredVideos(filtered);
  };

  return (
    <div className="home-paciente-container">
      <h1>Historial Médico</h1>
      <p>Visualiza todos tus exámenes clínicos en video.</p>
      <label htmlFor="filter-date">Filtrar por fecha:</label>
      <input
        type="date"
        id="filter-date"
        value={filterDate}
        onChange={handleDateChange}
        className="date-input"
      />
      <div className="video-list">
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video) => (
            <div key={video.id} className="video-item">
              <h3>{video.titulo}</h3>
              <p><strong>Fecha:</strong> {video.fecha}</p>
              <p>{video.descripcion}</p>
              <video width="100%" controls>
                <source src={video.url} type="video/mp4" />
                Tu navegador no soporta el elemento de video.
              </video>
            </div>
          ))
        ) : (
          <p className="no-results">No se encontraron videos para la fecha seleccionada.</p>
        )}
      </div>

      <style jsx>{`
        .home-paciente-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
          background-color: #f9fafb;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        h1 {
          text-align: center;
          color: #333;
          margin-bottom: 1rem;
        }

        p {
          color: #555;
          margin-bottom: 1rem;
          text-align: center;
        }

        label {
          font-weight: bold;
          margin-right: 0.5rem;
        }

        .date-input {
          display: block;
          margin: 0.5rem auto 1.5rem;
          padding: 0.5rem;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          max-width: 200px;
          text-align: center;
        }

        .video-list {
          display: grid;
          gap: 1.5rem;
          grid-template-columns: 1fr;
        }

        .video-item {
          padding: 1rem;
          background-color: #fff;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          text-align: center;
        }

        .video-item h3 {
          margin: 0.5rem 0;
          color: #0070f3;
        }

        .video-item p {
          color: #666;
          margin: 0.5rem 0;
        }

        .video-item video {
          max-width: 100%;
          border-radius: 8px;
          margin-top: 0.5rem;
        }

        .no-results {
          text-align: center;
          color: #888;
          font-size: 1.1rem;
          margin-top: 1.5rem;
        }

        @media (min-width: 600px) {
          .video-list {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (min-width: 900px) {
          .video-list {
            grid-template-columns: 1fr 1fr 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePaciente;
