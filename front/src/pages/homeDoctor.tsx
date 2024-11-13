// import React from 'react';
// import Link from 'next/link';

// const HomeDoctor: React.FC = () => {
//   return (
//     <div>
//       <h1>Panel del Doctor</h1>
//       <Link href="/conversorMsg">
//         <button>Añadir Nuevo Paciente</button>
//       </Link>
//       <Link href="/busquedaPacientes">
//         <button>Buscar Paciente</button>
//       </Link>
//       <p>*El médico no puede ver los videos, solo el recuento de los enviados.</p>
//     </div>
//   );
// };

// export default HomeDoctor;



import React from 'react';
import Link from 'next/link';

const HomeDoctor: React.FC = () => {
  return (
    <div className="home-doctor-container">
      <h1>Panel del Doctor</h1>
      <div className="button-container">
        <Link href="/conversorMsg">
          <button className="action-button">Añadir Nuevo Paciente</button>
        </Link>
        <Link href="/busquedaPacientes">
          <button className="action-button">Buscar Paciente</button>
        </Link>
      </div>
      <p className="note">*El médico no puede ver los videos, solo el recuento de los enviados.</p>

      <style jsx>{`
        .home-doctor-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          padding: 1.5rem;
          background-color: #f3f4f6;
          color: #333;
        }

        h1 {
          font-size: 2rem;
          margin-bottom: 2rem;
          color: #0070f3;
          text-align: center;
        }

        .button-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          width: 100%;
          max-width: 300px;
          margin-bottom: 1.5rem;
        }

        .action-button {
          width: 100%;
          padding: 0.75rem;
          font-size: 1rem;
          color: #fff;
          background-color: #0070f3;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .action-button:hover {
          background-color: #005bb5;
        }

        .note {
          font-size: 0.875rem;
          color: #555;
          text-align: center;
          max-width: 300px;
          line-height: 1.4;
        }

        /* Estilos responsive */
        @media (max-width: 768px) {
          h1 {
            font-size: 1.8rem;
          }

          .action-button {
            padding: 0.6rem;
            font-size: 0.9rem;
          }

          .note {
            font-size: 0.8rem;
          }
        }

        @media (max-width: 480px) {
          h1 {
            font-size: 1.6rem;
          }

          .action-button {
            padding: 0.5rem;
            font-size: 0.85rem;
          }

          .note {
            font-size: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
};

export default HomeDoctor;
