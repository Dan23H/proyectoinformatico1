import React, { useState } from 'react';

const FileConverter: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [convertedFile, setConvertedFile] = useState<File | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const convertFile = () => {
    // Aquí se integrará la lógica de conversión de archivos
    
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <button onClick={convertFile} disabled={!file}>
        Convertir Archivo
      </button>
      {convertedFile && <p>Archivo convertido listo para enviar</p>}
    </div>
  );
};

export default FileConverter;
