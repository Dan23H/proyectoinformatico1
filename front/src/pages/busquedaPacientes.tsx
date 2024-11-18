import React, { useState, useEffect } from 'react';
import PatientSearch from '../components/PatientSearch';


const BusquedaPacientes = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await api.get('/obtener-pacientes');
        setPatients(response.data);
        setFilteredPatients(response.data);
      } catch (error) {
        setError('Error al cargar la lista de pacientes');
      }
    };

    fetchPatients();
  }, []);

  const handleSearch = (query: string) => {
    const filtered = patients.filter((patient) =>
      patient.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPatients(filtered);
  };

  return (
    <div>
      <h1>Búsqueda de Pacientes</h1>
      {error && <p>{error}</p>}
      <PatientSearch onSearch={handleSearch} />
      <ul>
        {filteredPatients.map((patient) => (
          <li key={patient._id}>
            <p>{patient.name}</p>
            <p>{patient.email}</p>
            <p>{patient.identification}</p>
          </li>
        ))}
      </ul>
      <style jsx>
        {
          `
      .busqueda-container {
        max-width: 600px;
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

      .back-button {
        display: block;
        margin: 0 auto 1.5rem;
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
        color: #fff;
        background-color: #0070f3;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        }
        
        .back-button:hover {
          background-color: #005bb5;
          }
          
          h2 {
            color: #333;
        margin-top: 1.5rem;
        margin-bottom: 1rem;
        font-size: 1.2rem;
        text-align: center;
        }
        
        .results-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .patient-item {
          padding: 1rem;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          margin-bottom: 1rem;
          background-color: #fff;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .patient-item p {
          margin: 0.5rem 0;
          color: #555;
        }

        .add-button {
          display: block;
          width: 100%;
          padding: 0.5rem;
          font-size: 1rem;
          color: #fff;
          background-color: #28a745;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          text-align: center;
        }

        .add-button:hover {
          background-color: #218838;
        }

        .no-results {
          text-align: center;
          color: #888;
          margin-top: 1.5rem;
        }

        @media (max-width: 480px) {
          .busqueda-container {
            padding: 1.5rem;
          }

          h1 {
            font-size: 1.5rem;
          }

          .back-button, .add-button {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
};

export default BusquedaPacientes;
