import React from 'react';
import { useLocation } from 'react-router-dom';

const Headerboard = ({
  activeCultures = [],
  onCultureChange,
  onDateChange,
  selectedDate,
}) => {
  const location = useLocation();

  return (
    <div className="mb-6 relative">
      {/* Titre principal fixe */}
      <div className="flex justify-between items-start">
       
      </div>

      {/* Filtres visibles uniquement sur le Dashboard */}
      {location.pathname === '/farmer/Dashboard' && (
        <div className="flex items-center gap-4 mt-4">
          <p>
            🌱 Cultures :{" "}
            <span className="text-green-700 font-bold">
              {activeCultures.length} active{activeCultures.length > 1 ? "s" : ""}
            </span>
          </p>

          <select
            className="border p-1 rounded"
            onChange={(e) => onCultureChange(e.target.value)}
          >
            {activeCultures.map((culture, index) => (
              <option key={index} value={culture}>
                {culture}
              </option>
            ))}
          </select>

          <input
            type="date"
            className="border p-1 rounded"
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

export default Headerboard;
