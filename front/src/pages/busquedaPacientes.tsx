import { useEffect, useState } from 'react';

const BusquedaPacientes = () => {
  const [patients, setPatients] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/obtener-pacientes`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => setPatients(data))
      .catch((err) => console.error('Failed to load patients:', err));
  }, []);

  return (
    <div>
      <h1>Lista de Pacientes</h1>
      {patients.length > 0 ? (
        <ul>
          {patients.map((patient) => (
            <li key={patient._id}>
              <p>Nombre: {patient.name}</p>
              <p>Email: {patient.email}</p>
              <p>Identificación: {patient.identification}</p>
              <p>Historial de Ultrasonidos: {patient.ultrasoundHistory.join(', ')}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No se encontraron pacientes</p>
      )}
    </div>
  );
};

export default BusquedaPacientes;
