import { useEffect, useState } from 'react';

const HomeDoctor = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`)
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error('Failed to load data:', err));
  }, []);

  return (
    <div>
      <h1>Doctor's Home</h1>
      {data ? (
        <p>{JSON.stringify(data)}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default HomeDoctor;
