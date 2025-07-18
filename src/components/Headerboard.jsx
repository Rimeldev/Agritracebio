import React from 'react';
import { useLocation } from 'react-router-dom';
import { CalendarDays, Sprout } from "lucide-react"; // Icônes modernes (Lucide)
import { useParams } from "react-router-dom";

const Headerboard = ({
  activeCultures = [],
  onCultureChange,
  onDateChange,
  selectedDate,
  selectedCulture,
}) => {
  const location = useLocation();
    const { exportateur_id } = useParams();

  return (
    <div className="mb-6">
      {["/farmer/Dashboard", "/exportateur/Dashboard",`/controleur/exportateur/${exportateur_id}`].includes(location.pathname) && (
        <div className="flex flex-wrap items-center gap-4 mt-4">
          
          {/* Sélecteur de culture */}
          <div className="flex items-center gap-2 bg-white border border-gray-300 rounded px-3 py-2 shadow-sm">
            <Sprout className="w-5 h-5 text-green-600" />
            <select
              className="outline-none bg-transparent text-gray-700"
              value={selectedCulture ?? ""}
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
          </div>

          {/* Sélecteur de date */}
          <div className="flex items-center gap-2 bg-white border border-gray-300 rounded px-3 py-2 shadow-sm">
            <CalendarDays className="w-5 h-5 text-blue-600" />
            <input
              type="date"
              className="outline-none bg-transparent text-gray-700"
              value={selectedDate}
              onChange={(e) => onDateChange(e.target.value)}
            />
          </div>

        </div>
      )}
    </div>
  );
};

export default Headerboard;
