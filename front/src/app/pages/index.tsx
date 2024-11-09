import { useRouter } from 'next/router';

export default function WelcomePage() {
  const router = useRouter();

  const goToLogin = () => {
    router.push('/login');
  };

  return (
    <div>
      <h1>Bienvenido</h1>
      <p>Por favor, inicia sesión para continuar.</p>
      <button onClick={goToLogin}>Iniciar Sesión</button>
    </div>
  );
}
