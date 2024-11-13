import React from 'react';
import Link from 'next/link';

const IndexPage: React.FC = () => {
  return (
    <div>
      <h1>Bienvenido a la Solución de Gestión de Archivos Médicos</h1>
      <p>
        Nuestra solución aborda dos problemas principales:
        <ol>
          <li>Los archivos de video enviados son demasiado pesados (formato AVI).</li>
          <li>Los videos deben enviarse a las personas correctas.</li>
        </ol>
      </p>
      <Link href="/login">
        <button>Iniciar Sesión</button>
      </Link>
    </div>
  );
};

export default IndexPage;
