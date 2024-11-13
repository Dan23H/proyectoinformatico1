import { useState } from 'react';

export default function ConvertPage() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

  const handleConversion = async () => {
    if (!file) return;
    // Se hace la solicitud al backend para convertir el archivo
    alert("Archivo enviado para conversión");
  };

  return (
    <div>
      <h1>Convertir Archivos</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleConversion}>Convertir</button>
    </div>
  );
}
