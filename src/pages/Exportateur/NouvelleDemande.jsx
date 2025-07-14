import DashboardLayout from "@/components/DashboardLayout";
import UserMenu from "@/components/UserMenu";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NouvelleDemande = () => {
  const navigate = useNavigate();

  // Cultures fictives
  const mockCultures = [
    { id: "1", nom: "Ananas – Lokossa", statut: "en production" },
    { id: "2", nom: "Mangue – Bembéréké", statut: "en production" },
    { id: "3", nom: "Ananas – Porto-Novo", statut: "exportée" },
    { id: "4", nom: "Mangue – Parakou", statut: "en production" },
  ];

  const [search, setSearch] = useState("");
  const [selectedCultures, setSelectedCultures] = useState([]);

  const toggleCulture = (id) => {
    setSelectedCultures((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCultures.length === 0) {
      alert("Veuillez sélectionner au moins une culture.");
      return;
    }
    console.log("Soumission avec :", selectedCultures);
    navigate("/exportateur/mes-demandes");
  };

  const filteredCultures = mockCultures.filter(
    (c) =>
      c.nom.toLowerCase().includes(search.toLowerCase()) &&
      c.statut === "en production"
  );

  return (
    <DashboardLayout>
      <UserMenu farmerName="Exportateur" />
      <h1 className="text-2xl font-bold text-green-900 mt-4 mb-2">
        Nouvelle demande d’inspection
      </h1>
      <p className="text-sm text-gray-600 mb-4">
        Cochez les cultures <strong>en production</strong> que vous souhaitez soumettre à une inspection.
      </p>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Rechercher une culture..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md border border-gray-300 rounded px-3 py-2 text-sm"
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-gray-200 bg-white shadow-sm rounded text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3 border-b">
                  <span className="sr-only">Sélection</span>
                </th>
                <th className="p-3 border-b">Nom de la culture</th>
                <th className="p-3 border-b">Statut</th>
              </tr>
            </thead>
            <tbody>
              {filteredCultures.length > 0 ? (
                filteredCultures.map((culture) => (
                  <tr key={culture.id} className="hover:bg-gray-50">
                    <td className="p-3 border-b">
                      <input
                        type="checkbox"
                        checked={selectedCultures.includes(culture.id)}
                        onChange={() => toggleCulture(culture.id)}
                        className="accent-green-600"
                      />
                    </td>
                    <td className="p-3 border-b">{culture.nom}</td>
                    <td className="p-3 border-b capitalize">
                      <span className="text-green-700 bg-green-100 px-2 py-1 rounded-full text-xs">
                        {culture.statut}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="p-4 text-center text-gray-500">
                    Aucune culture trouvée.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded text-sm disabled:opacity-50"
            disabled={selectedCultures.length === 0}
          >
            Soumettre la demande
          </button>
        </div>
      </form>
    </DashboardLayout>
  );
};

export default NouvelleDemande;
