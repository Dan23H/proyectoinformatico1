import React from 'react';

interface PatientSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const PatientSearch: React.FC<PatientSearchProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Buscar por nombre o cédula"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default PatientSearch;
