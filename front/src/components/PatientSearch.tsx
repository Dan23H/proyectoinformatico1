import { useState } from 'react';

const PatientSearch = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Buscar paciente"
      value={query}
      onChange={handleInputChange}
    />
  );
};

export default PatientSearch;
