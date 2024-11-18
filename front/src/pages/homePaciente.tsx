import { useEffect, useState } from 'react';

type HistoryItem = {
  _id: string;
  description: string;
  videoUrl: string;
  date: string; // Agregar un campo de fecha si no estaba considerado antes
};

const HomePaciente = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [filteredHistory, setFilteredHistory] = useState<HistoryItem[]>([]);
  const [error, setError] = useState('');
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    const fetchPatientHistory = async () => {
      const patientId = localStorage.getItem('patientId'); // Recupera el patientId del localStorage

      if (!patientId) {
        setError('No se encontró el ID del paciente.');
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/historial-paciente?patientId=${patientId}`, {
          method: 'GET',
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Historial del paciente:', data);
          setHistory(data.data); // Asume que los datos relevantes están en `data.data`
          setFilteredHistory(data.data); // Inicialmente, muestra todos los datos
        } else {
          console.error('Error al obtener el historial del paciente');
          setError('Error al obtener el historial del paciente.');
        }
      } catch (error) {
        console.error('Error:', error);
        setError('Ocurrió un error al cargar el historial del paciente.');
      }
    };

    fetchPatientHistory(); // Llama a la función dentro del useEffect
  }, []);

  // Filtrar los datos cuando cambia la fecha
  useEffect(() => {
    if (!filterDate) {
      // Si no hay filtro, mostrar todos los datos
      setFilteredHistory(history);
    } else {
      // Filtrar los datos según la fecha seleccionada
      const filtered = history.filter((item) =>
        new Date(item.date).toISOString().split('T')[0] === filterDate
      );
      setFilteredHistory(filtered);
    }
  }, [filterDate, history]);

  return (
    <div className="home-paciente-container">
      <h1>Historial Médico</h1>
      <p>Visualiza todos tus exámenes clínicos en video.</p>
      <label htmlFor="filter-date">Filtrar por fecha:</label>
      <input
        type="date"
        id="filter-date"
        value={filterDate}
        onChange={(e) => setFilterDate(e.target.value)} // Actualiza la fecha seleccionada
        className="date-input"
      />
      <div className="video-list">
        {filteredHistory.length > 0 ? (
          filteredHistory.map((video) => (
            <div key={video._id} className="video-item">
              <h3>{video.description}</h3>
              <p><strong>Fecha:</strong> {new Date(video.date).toLocaleDateString()}</p>
              <video width="100%" controls>
                <source src={video.videoUrl} type="video/mp4" />
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
