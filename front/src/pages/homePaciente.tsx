import { useEffect, useState } from 'react';

const HomePaciente = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/historial-paciente`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error('Failed to load data:', err));
  }, []);

  return (
    <div>
      <h1>Patient's Home</h1>
      {data ? (
        <p>{JSON.stringify(data)}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default HomePaciente;
