import Link from 'next/link';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar'; // Asegúrate de la ruta correcta

const HomeDoctor = () => {
  const [doctorName, setDoctorName] = useState<string | null>(null);

  useEffect(() => {
    const fetchDoctorName = async () => {
      const doctorId = localStorage.getItem('doctorId');
      if (!doctorId) {
        setDoctorName('Desconocido');
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/obtener-doctores`);
        if (response.ok) {
          const data = await response.json();
          const doctor = data.find((doc: any) => doc._id === doctorId); // Busca el doctor por ID
          setDoctorName(doctor ? doctor.name : 'Desconocido');
        } else {
          console.error('Error al obtener los doctores');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchDoctorName();
  }, []);

  return (
    <div className="home-doctor-container">
      <Navbar title={`Bienvenido, Dr. ${doctorName}` || 'Cargando...'} subtitle={"Panel del Doctor"} />
      <div className="card-container">
        <Link href="/conversorMsg" style={{ textDecoration: 'none' }}>
          <div className="card">
            <img
              src="/icons/patient-add.svg"
              alt="Añadir Paciente"
              className="card-icon"
            />
            <h3>Añadir Nuevo Paciente</h3>
            <p>Registre un paciente y envíe el resultado de la ecografía.</p>
            <p> </p>
          </div>
        </Link>
        <Link href="/busquedaPacientes" style={{ textDecoration: 'none' }}>
          <div className="card">
            <img
              src="/icons/patient-search.svg"
              alt="Buscar Paciente"
              className="card-icon"
            />
            <h3>Buscar Paciente</h3>
            <p>
              Encuentre pacientes registrados y envíe los nuevos resultados de la ecografía.
            </p>
          </div>
        </Link>
      </div>
      <p className='note'>*Solo podrá ver el recuento de los videos enviados.</p>

      <style jsx>{`
  .home-doctor-container {
    display: flex;
    margin-top: 10rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    background-color: #f9fafb;
    color: #333;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 2rem;
    color: #0070f3;
    text-align: center;
  }

  .note {
    cursor: default;
  }

  .card-container {
    display: flex;
    gap: 2rem;
    justify-content: center;
    align-items: stretch;
    flex-wrap: wrap;
    width: 100%;
    max-width: 1200px;
  }

  .card {
    flex: 1 1 250px;
    max-width: 300px;
    padding: 1.5rem;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 10px;
    text-align: center;
    transition: transform 0.2s ease, border-color 0.2s ease;
    cursor: pointer;
  }

  .card:hover {
    transform: scale(1.02);
    border-color: #0070f3;
  }

  .card-icon {
    width: 50px;
    height: 50px;
    margin-bottom: 1rem;
  }

  .card h3 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    color: #0070f3;
  }

  .card p {
    font-size: 0.9rem;
    color: #555;
    line-height: 1.5;
  }

  @media (max-width: 768px) {
    .card-container {
      gap: 1rem; /* Reduce el espacio entre tarjetas en pantallas más pequeñas */
    }

    .card {
      max-width: 100%; /* Asegura que las tarjetas ocupen el ancho disponible */
    }
  }
`}</style>

    </div>

  );
};

export default HomeDoctor;
