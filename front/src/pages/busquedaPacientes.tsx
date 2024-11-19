import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";

type Patient = {
  _id: string;
  name: string;
  email: string;
  identification: string;
  ultrasoundHistory: [];
};

const BusquedaPacientes: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(""); // Controla el valor del campo de búsqueda
  const [error, setError] = useState<string>("");
  const [doctorName, setDoctorName] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/obtener-pacientes`, {
          method: "GET",
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Lista de pacientes:", data);

          if (Array.isArray(data)) {
            setPatients(data); // Asume que el JSON es directamente el array
          } else if (data.data && Array.isArray(data.data)) {
            setPatients(data.data); // Si el array está en `data.data`
          } else {
            setError("La respuesta no contiene datos válidos.");
          }
        } else {
          console.error("Error al obtener la lista de pacientes");
          setError("Error al obtener la lista de pacientes.");
        }
      } catch (error) {
        console.error("Error:", error);
        setError("Ocurrió un error al cargar la lista de pacientes.");
      }
    };

    fetchPatients();
  }, []);

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

  // Filtrar pacientes en tiempo real
  const filteredPatients = patients.filter((patient) =>
    patient.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCardClick = (name: string, identification: string, email: string) => {
    localStorage.setItem(
      "selectedPatient",
      JSON.stringify({ name, identification, email })
    );
    router.push("/conversorMsg");
  };
  return (
    <div className="home-doctor-container">
      <Navbar
        title="Búsqueda de Pacientes"
        subtitle={`Dr. ${doctorName}` || 'Cargando...'}
        routes={[
          { label: "Volver al Inicio", path: "/homeDoctor" },
          { label: "Añadir Nuevo Paciente", path: "/conversorMsg" },
        ]}
      />
      <div className="content">
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar paciente por nombre..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="patient-grid">
          {filteredPatients.length > 0 ? (
            filteredPatients.map((patient) => (
              <div
                key={patient._id}
                className="patient-card"
                onClick={() => handleCardClick(patient.name, patient.identification, patient.email)}
              >
                <p><strong>Nombre:</strong> {patient.name}</p>
                <p><strong>Email:</strong> {patient.email}</p>
                <p><strong>Identificación:</strong> {patient.identification}</p>
                <p><strong>Vídeos enviados:</strong> {patient.ultrasoundHistory?.length || 0}</p>
              </div>
            ))
          ) : (
            <p className="no-results">No se encontraron pacientes con el criterio de búsqueda.</p>
          )}

        </div>
      </div>
      <style jsx>{`
        .content {
          margin-top: 70px; /* Altura del navbar */
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        h1 {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: #0070f3;
        }

        .search-container {
          margin-bottom: 20px;
          display: flex;
          justify-content: center;
          width: 100%;
        }

        .search-input {
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #ccc;
          width: 100%;
          max-width: 400px;
        }

        .patient-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          width: 100%;
          max-width: 1200px;
        }

        .patient-card {
          padding: 1.5rem;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          background-color: #f9fafb;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          text-align: left;
          cursor: pointer; /* Cambia el puntero al colocar el cursor sobre la tarjeta */
          transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
        }

        .patient-card:hover {
          transform: translateY(-10px); /* Eleva la tarjeta al pasar el cursor */
          box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2); /* Aumenta la sombra para mayor énfasis */
          background-color: #eef6fc; /* Cambia el color de fondo al pasar el cursor */
          border-color: #0070f3; /* Cambia el color del borde al pasar el cursor */
        }

        .patient-card p {
          margin: 0.5rem 0;
          color: #555;
        }

        .no-results {
          text-align: center;
          color: #888;
          margin-top: 1.5rem;
        }
      `}</style>
    </div>
  );
};

export default BusquedaPacientes;
