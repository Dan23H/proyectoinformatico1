import React, { useState } from 'react';
import FileConverter from '../components/FileConverter';

const ConversorMsg: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    cedula: '',
    descripcion: '',
    archivos: []
  });

  const handleSubmit = () => {
    // Aquí se integrará la lógica para enviar el formulario
    console.log('Formulario enviado', formData);
  };

  return (
    <div>
      <h1>Enviar Examen Clínico</h1>
      <form>
        <input type="text" placeholder="Nombre" required />
        <input type="text" placeholder="Cédula" required />
        <textarea placeholder="Descripción de la cita" required />
        <FileConverter />
        <button type="submit" onClick={handleSubmit} disabled={!formData.archivos.length}>
          Enviar
        </button>
      </form>
      <button>Volver</button>
    </div>
  );
};

export default ConversorMsg;