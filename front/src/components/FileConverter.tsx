import { useState } from 'react';
import { convertVideo } from '../utils/convertVideo';

const FileConverter = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleConvert = async () => {
    if (!file) {
      setError('Please select a file');
      return;
    }

    setError(null);
    try {
      await convertVideo(file);
      alert('Video converted and downloaded successfully');
    } catch (err) {
      setError('Failed to convert video');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleConvert}>Convert Video</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default FileConverter;
