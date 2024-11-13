// import React, { useState } from 'react';
// import PatientSearch from '../components/PatientSearch';
// import Link from 'next/link';

// interface Patient {
//   id: number;
//   cedula: string;
//   nombre: string;
// }

// const BusquedaPacientes: React.FC = () => {
//   const [searchTerm, setSearchTerm] = useState('');
  
//   // Lista simulada de pacientes para demostrar el funcionamiento
//   const pacientes: Patient[] = [
//     { id: 1, cedula: '12345678', nombre: 'Juan Pérez' },
//     { id: 2, cedula: '87654321', nombre: 'Ana Gómez' },
//     { id: 3, cedula: '12348765', nombre: 'Luis Martínez' },
//   ];

//   // Filtrar pacientes por nombre o cédula
//   const filteredPacientes = pacientes.filter(
//     (paciente) =>
//       paciente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       paciente.cedula.includes(searchTerm)
//   );

//   return (
//     <div>
//       <h1>Búsqueda de Pacientes</h1>
//       <Link href="/homeDoctor">
//         <button>Volver</button>
//       </Link>
      
//       <PatientSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
//       <h2>Resultados de la búsqueda</h2>
//       {filteredPacientes.length > 0 ? (
//         <ul>
//           {filteredPacientes.map((paciente) => (
//             <li key={paciente.id}>
//               <p>Nombre: {paciente.nombre}</p>
//               <p>Cédula: {paciente.cedula}</p>
//               <Link href={`/conversorMsg?nombre=${paciente.nombre}&cedula=${paciente.cedula}`}>
//                 <button>Agregar Examen Clínico</button>
//               </Link>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No se encontraron pacientes.</p>
//       )}
//     </div>
//   );
// };

// export default BusquedaPacientes;

import React, { useState } from 'react';
import PatientSearch from '../components/PatientSearch';
import Link from 'next/link';

interface Patient {
  id: number;
  cedula: string;
  nombre: string;
}

const BusquedaPacientes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const pacientes: Patient[] = [
    { id: 1, cedula: '12345678', nombre: 'Juan Pérez' },
    { id: 2, cedula: '87654321', nombre: 'Ana Gómez' },
    { id: 3, cedula: '12348765', nombre: 'Luis Martínez' },
  ];

  const filteredPacientes = pacientes.filter(
    (paciente) =>
      paciente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paciente.cedula.includes(searchTerm)
  );

  return (
    <div className="busqueda-container">
      <h1>Búsqueda de Pacientes</h1>
      <Link href="/homeDoctor">
        <button className="back-button">Volver</button>
      </Link>
      
      <PatientSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      <h2>Resultados de la búsqueda</h2>
      {filteredPacientes.length > 0 ? (
        <ul className="results-list">
          {filteredPacientes.map((paciente) => (
            <li key={paciente.id} className="patient-item">
              <p><strong>Nombre:</strong> {paciente.nombre}</p>
              <p><strong>Cédula:</strong> {paciente.cedula}</p>
              <Link href={`/conversorMsg?nombre=${paciente.nombre}&cedula=${paciente.cedula}`}>
                <button className="add-button">Agregar Examen Clínico</button>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-results">No se encontraron pacientes.</p>
      )}

      <style jsx>{`
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
