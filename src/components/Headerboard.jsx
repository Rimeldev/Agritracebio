import React from 'react';
import { useLocation } from 'react-router-dom';

const Headerboard = ({
  activeCultures = [],
  onCultureChange,
  onDateChange,
  selectedDate,
  selectedCulture,
}) => {
  const location = useLocation();

  return (
    <div className="mb-6 relative">
      {location.pathname === '/farmer/Dashboard' && (
        <div className="flex items-center gap-4 mt-4">
          {/* Sélecteur de culture */}
          <select
  className="border p-2 rounded"
  value={selectedCulture}
  onChange={(e) => onCultureChange(e.target.value)}
>
  {activeCultures && activeCultures.length > 0 ? (
    activeCultures.map((culture) => (
      <option key={culture.id} value={culture.id}>
        {culture.nom_culture}
      </option>
    ))
  ) : (
    <option value="">Aucune culture</option>
  )}
</select>


          {/* Sélecteur de date */}
          <input
            type="date"
            className="border p-2 rounded"
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

export default Headerboard;
