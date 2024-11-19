import React from "react";
import { useRouter } from "next/router";

type Route = {
    label: string;
    path: string;
};

type NavbarProps = {
    title: string;
    subtitle: String;
    backgroundColor?: string; // Color opcional del navbar
    routes?: Route[]; // Rutas adicionales (botones)
};

const Navbar: React.FC<NavbarProps> = ({ title, subtitle, backgroundColor = "#0070f3", routes = [] }) => {
    const router = useRouter();

    const handleNavigation = (path: string) => {
        router.push(path);
    };

    const handleLogout = () => {
        localStorage.clear(); // Limpia el almacenamiento local
        router.push("/"); // Redirige al login o página inicial
    };

    return (
        <nav className="navbar" style={{ backgroundColor }}>
            <div>
                <h2>{title}</h2>
                <h3>{subtitle}</h3>
            </div>
            <div className="navbar-buttons">
                {routes.map((route, index) => (
                    <button
                        key={index}
                        className="navbar-button"
                        onClick={() => handleNavigation(route.path)}
                    >
                        {route.label}
                    </button>
                ))}
                <button className="navbar-button logout" onClick={handleLogout}>
                    Cerrar sesión
                </button>
            </div>
            <style jsx>{`
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 99.9999%;
    z-index: 1000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px; /* Altura fija */
    padding: 0 1rem; /* Ajusta el padding horizontal */
    color: #fff;
    background-color: ${backgroundColor};
    border-radius: 0;
    box-sizing: border-box;
  }

  .navbar h2 {
    margin: 0;
    font-size: 1.5rem;
    line-height: 1.2;
    cursor: default;
  }

  .navbar h3 {
    margin: 0;
    font-size: 1rem;
    line-height: 1.2;
    color: #ccc;
    cursor: default;
  }

  .navbar-buttons {
    display: flex;
    gap: 1rem;
  }

  .navbar-button {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    color: #fff;
    background-color: #005bb5;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .navbar-button:hover {
    background-color: #003f7d;
  }

  .navbar-button.logout {
    background-color: #e63946;
  }

  .navbar-button.logout:hover {
    background-color: #c53030;
  }

  @media (max-width: 768px) {
    .navbar h2 {
      font-size: 1.2rem;
    }

    .navbar h3 {
      font-size: 0.9rem;
    }

    .navbar-button {
      font-size: 0.8rem;
    }
  }
`}</style>

        </nav>
    );
};

export default Navbar;
