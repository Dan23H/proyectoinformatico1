import { useEffect, useState } from 'react';

const ConversorMsg = () => {
  const [messages, setMessages] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/crear-consulta`)
      .then((res) => res.json())
      .then((data) => setMessages(data.message))
      .catch((err) => console.error('Failed to load messages:', err));
  }, []);

  return (
    <div>
      <h1>Message Converter</h1>
      {messages ? <p>{messages}</p> : <p>Loading...</p>}
    </div>
  );
};

export default ConversorMsg;
