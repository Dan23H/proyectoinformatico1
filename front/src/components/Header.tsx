// components/Header.tsx
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Header: React.FC = () => {
  const router = useRouter();

  // Función para cerrar sesión (espacio para la integración con el backend)
  const handleLogout = () => {
    // Aquí incluirías la lógica de cierre de sesión
    // como limpiar el estado o llamar a una API
    router.push('/'); // Redirigir a la página inicial
  };

  return (
    <header className="header">
      <div className="logo">
        <Link href="/">
          <a>MedicalApp</a>
        </Link>
      </div>

      <nav className="nav-links">
        <Link href="/homeDoctor">
          <a>Home Doctor</a>
        </Link>
        <Link href="/homePaciente">
          <a>Home Paciente</a>
        </Link>
      </nav>

      <div className="user-options">
        <button onClick={handleLogout}>Cerrar Sesión</button>
      </div>
    </header>
  );
};

export default Header;
