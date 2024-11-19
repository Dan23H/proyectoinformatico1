import { useRouter } from 'next/router';
import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        // Manejo de errores en caso de respuesta no exitosa
        setError(`Error: ${response.status} - ${response.statusText}`);
        return;
      }

      if (response.ok) {
        const data = await response.json();
        if (data.status === 'OK') {
          if (typeof window !== 'undefined') {
            localStorage.setItem('role', data.role); // Guardar el rol en localStorage
            if (data.role === 'patient') {
              localStorage.setItem('patientId', data.id); // Guardar el ID del paciente
              router.push('/homePaciente');
            } else if (data.role === 'doctor') {
              localStorage.setItem('doctorId', data.id);
              router.push('/homeDoctor');
            }
          }
        } else {
          setError('Credenciales inválidas');
        }
      } else {
        setError('Credenciales inválidas');
      }
    } catch (error) {
      setError('Error al intentar iniciar sesión');
      console.error(error);
    }
  };
  
  return (
    <div className="login-container">
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>

      <style jsx>{`
        .login-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          height: 100vh;
          background-color: #f3f4f6;
        }
        
        h1 {
          font-size: 2rem;
          color: #333;
          margin-bottom: 1.5rem;
        }

        input {
          width: 100%;
          max-width: 300px;
          padding: 0.75rem;
          margin: 0.5rem 0;
          border: 1px solid #ccc;
          border-radius: 0.25rem;
          font-size: 1rem;
        }

        input:focus {
          outline: none;
          border-color: #0070f3;
          box-shadow: 0 0 0 3px rgba(0, 118, 255, 0.2);
        }

        button {
          width: 100%;
          max-width: 300px;
          padding: 0.75rem;
          margin-top: 1rem;
          border: none;
          border-radius: 0.25rem;
          background-color: #0070f3;
          color: #fff;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        button:hover {
          background-color: #005bb5;
        }

        /* Estilos responsive */
        @media (max-width: 768px) {
          h1 {
            font-size: 1.8rem;
          }

          input, button {
            max-width: 100%;
            padding: 0.5rem;
            font-size: 0.9rem;
          }
        }

        @media (max-width: 480px) {
          h1 {
            font-size: 1.5rem;
          }

          input, button {
            padding: 0.5rem;
            font-size: 0.85rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;
