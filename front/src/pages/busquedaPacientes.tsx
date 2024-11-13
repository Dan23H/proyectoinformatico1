import React, { useState } from 'react';
import PatientSearch from '../components/PatientSearch';

const BusquedaPacientes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div>
      <h1>Búsqueda de Pacientes</h1>
      <PatientSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {/* Aquí se integrará la lógica para mostrar los resultados de búsqueda */}
      <p>Resultados de la búsqueda...</p>
      <button>Agregar Examen Clínico</button>
    </div>
  );
};

export default BusquedaPacientes;
