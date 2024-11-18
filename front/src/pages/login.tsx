import { useRouter } from 'next/router';
import { useState } from 'react';
import { loginUser } from '../utils/loginUser';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    router.push('/homeDoctor'); // Redirigir después del login
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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
