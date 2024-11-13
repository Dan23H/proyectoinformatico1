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
  
  // Lista simulada de pacientes para demostrar el funcionamiento
  const pacientes: Patient[] = [
    { id: 1, cedula: '12345678', nombre: 'Juan Pérez' },
    { id: 2, cedula: '87654321', nombre: 'Ana Gómez' },
    { id: 3, cedula: '12348765', nombre: 'Luis Martínez' },
  ];

  // Filtrar pacientes por nombre o cédula
  const filteredPacientes = pacientes.filter(
    (paciente) =>
      paciente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paciente.cedula.includes(searchTerm)
  );

  return (
    <div>
      <h1>Búsqueda de Pacientes</h1>
      <Link href="/homeDoctor">
        <button>Volver</button>
      </Link>
      
      <PatientSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      <h2>Resultados de la búsqueda</h2>
      {filteredPacientes.length > 0 ? (
        <ul>
          {filteredPacientes.map((paciente) => (
            <li key={paciente.id}>
              <p>Nombre: {paciente.nombre}</p>
              <p>Cédula: {paciente.cedula}</p>
              <Link href={`/conversorMsg?nombre=${paciente.nombre}&cedula=${paciente.cedula}`}>
                <button>Agregar Examen Clínico</button>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No se encontraron pacientes.</p>
      )}
    </div>
  );
};

export default BusquedaPacientes;
