import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <style jsx>{`
  .conversor-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
    background-color: #f9fafb;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    min-height: 100vh; /* Asegura que ocupe al menos el alto de la ventana */
    overflow-y: auto; /* Habilita el scroll solo cuando sea necesario */
  }

  h2 {
    text-align: center;
    color: #333;
    margin-bottom: 1.5rem;
  }

  .form-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  label {
    display: flex;
    flex-direction: column;
    font-size: 0.9rem;
    color: #555;
  }

  input[type="text"],
  textarea,
  input[type="file"] {
    padding: 0.75rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-top: 0.25rem;
  }

  textarea {
    resize: vertical;
    min-height: 80px;
  }

  button[type="submit"] {
    padding: 0.75rem;
    font-size: 1rem;
    color: #fff;
    background-color: #0070f3;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button[type="submit"]:hover {
    background-color: #005bb5;
  }

  button[type="submit"]:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  .videos-list {
    list-style: none;
    padding: 0;
    margin: 1rem 0;
  }

  .video-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
    border-bottom: 1px solid #e0e0e0;
  }

  .video-item button {
    padding: 0.3rem 0.5rem;
    font-size: 0.8rem;
    color: #fff;
    background-color: #ff5a5f;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .video-item button:hover {
    background-color: #e0484e;
  }

  .actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    justify-content: center;
  }

  .actions button {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    color: #fff;
    background-color: #0070f3;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .actions button:hover {
    background-color: #005bb5;
  }

  .actions button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`}</style>

    </>
  );
}

export default MyApp;
