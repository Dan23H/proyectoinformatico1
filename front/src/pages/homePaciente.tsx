import React, { useState, useEffect } from 'react';
interface Video {
  id: string;
  titulo: string;
  fecha: string;
  url: string;
  descripcion: string;
}

const HomePaciente: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);  // Estado para almacenar videos
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);  // Estado para almacenar videos filtrados
  const [filterDate, setFilterDate] = useState('');   // Estado para el filtro de fechas

  useEffect(() => {
    // Lógica para cargar los videos desde la base de datos a través de una API.
    // Ejemplo de cómo integrarlo en el backend:
    // fetch('/api/videos')
    //   .then((response) => response.json())
    //   .then((data) => setVideos(data));

    // Ejemplo de datos simulados
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
    <div>
      <h1>Historial Médico</h1>
      <p>Visualiza todos tus exámenes clínicos en video.</p>
      <label htmlFor="filter-date">Filtrar por fecha:</label>
      <input
        type="date"
        id="filter-date"
        value={filterDate}
        onChange={handleDateChange}
      />
      <div className="video-list">
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video) => (
            <div key={video.id} className="video-item">
              <h3>{video.titulo}</h3>
              <p>{video.fecha}</p>
              <p>{video.descripcion}</p>
              <video width="320" height="240" controls>
                <source src={video.url} type="video/mp4" />
                Tu navegador no soporta el elemento de video.
              </video>
            </div>
          ))
        ) : (
          <p>No se encontraron videos para la fecha seleccionada.</p>
        )}
      </div>
    </div>
  );
};

export default HomePaciente;
