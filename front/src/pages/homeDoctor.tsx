import React from 'react';
import Link from 'next/link';

const HomeDoctor: React.FC = () => {
  return (
    <div>
      <h1>Panel del Doctor</h1>
      <Link href="/conversorMsg">
        <button>Añadir Nuevo Paciente</button>
      </Link>
      <Link href="/busquedaPacientes">
        <button>Buscar Paciente</button>
      </Link>
      <p>*El médico no puede ver los videos, solo el recuento de los enviados.</p>
    </div>
  );
};

export default HomeDoctor;
