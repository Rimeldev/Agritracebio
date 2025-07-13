import React from "react";

const CulturesTab = ({ cultures, userMap, selectedFarmer, setSelectedFarmer }) => {
  // Extraire tous les agriculteurs uniques depuis userMap
  const farmerOptions = Object.entries(userMap).map(([id, name]) => ({
    id,
    name,
  }));

  // Filtrer les cultures selon l’agriculteur sélectionné
  const filteredCultures = cultures.filter(
    (c) => selectedFarmer === "Tous" || c.user === selectedFarmer
  );

  return (
    <section>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <h2 className="text-xl font-bold">Toutes les cultures</h2>
        <select
          value={selectedFarmer}
          onChange={(e) => setSelectedFarmer(e.target.value)}
          className="border rounded px-3 py-1 text-sm"
        >
          <option value="Tous">Tous les agriculteurs</option>
          {farmerOptions.map((f) => (
            <option key={f.id} value={f.id}>
              {f.name}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full table-auto text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Nom</th>
              <th className="p-3">Variété</th>
              <th className="p-3">Localisation</th>
              <th className="p-3">Déclarée le</th>
              <th className="p-3">Statut</th>
              <th className="p-3">Agriculteur</th>
            </tr>
          </thead>
          <tbody>
            {filteredCultures.map((c) => {
              const key = c._id || c.id;

              if (!key) {
                console.warn("Culture sans identifiant :", c);
                return null; // Ignorer cette ligne
              }

              return (
                <tr key={key} className="border-t">
                  <td className="p-3">{c.nom_culture}</td>
                  <td className="p-3">{c.variete}</td>
                  <td className="p-3">{c.localisation}</td>
                  <td className="p-3">
                    {new Date(c.date_declaration).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        c.statut === "exportée"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {c.statut}
                    </span>
                  </td>
                  <td className="p-3">{userMap[c.user] || "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default CulturesTab;
