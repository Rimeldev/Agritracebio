import React, { useState } from "react";
import { Eye } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import UserMenu from "@/components/UserMenu";
import { useNavigate } from "react-router-dom";

const ControleurCulturesExportees = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // ✅ Données simulées
  const cultures = Array.from({ length: 20 }, (_, i) => ({
    id: `EXP${i + 1}`.padStart(6, "0"),
    nomCulture: `Ananas Cayenne – Parcelle #${i + 1}`,
    dateRecolte: `2025-07-${(10 + i % 10).toString().padStart(2, "0")}`,
    dateProduction: `2025-06-${(20 + i % 5).toString().padStart(2, "0")}`,
    resultat:
      i % 2 === 0
        ? "Température conforme: 7°C, Humidité < 80%, Aucune trace de pesticide ni fongicide détectée. Normes COFRAC respectées."
        : "Résidus de traitement détectés sous seuils autorisés. Certificat délivré.",
    statut: i % 3 === 0 ? "rejetée" : "validée",
    destination: ["Paris", "Berlin", "Cotonou", "Bruxelles"][i % 4],
    agriculteur: {
      nom: ["Tossou", "Saka", "Agossou"][i % 3],
      prenom: ["Jean", "Ali", "Fatou"][i % 3],
      tel: "+22990001122",
    },
    exportateur: {
      nom: ["AgriExport", "FruitWorld", "TerreBénin"][i % 3],
      email: "contact@export.bj",
    },
    camion: {
      image: "https://via.placeholder.com/400x200?text=Camion",
      matricule: `BZ${i + 10}XY`,
      chauffeur: ["Firmin", "Raymond", "Pascal"][i % 3],
    },
  }));

  const filtered = cultures.filter((c) =>
    [c.nomCulture, c.id, c.exportateur.nom]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(startIdx, startIdx + itemsPerPage);

  const statutColors = {
    validée: "bg-green-100 text-green-700",
    rejetée: "bg-red-100 text-red-700",
  };

  return (
    <DashboardLayout>
      <UserMenu />
      <div className="mt-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-green-900">
            Cultures exportées
          </h1>
          <input
            type="text"
            placeholder="Rechercher une culture..."
            className="border px-3 py-1 rounded w-72"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* TABLEAU */}
        <div className="overflow-x-auto rounded shadow">
          <table className="min-w-full text-sm text-left text-gray-700 bg-white">
            <thead className="bg-gray-100 text-gray-600 text-xs uppercase">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Culture</th>
                <th className="px-4 py-2">Récolte</th>
                <th className="px-4 py-2">Destination</th>
                <th className="px-4 py-2">Statut</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((c) => (
                <tr key={c.id} className="border-t">
                  <td className="px-4 py-2">{c.id}</td>
                  <td className="px-4 py-2">{c.nomCulture}</td>
                  <td className="px-4 py-2">
                    {new Date(c.dateRecolte).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">{c.destination}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${statutColors[c.statut]}`}
                    >
                      {c.statut}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => navigate(`/controleur/culture/${c.id}`)}
                      className="text-green-600 hover:underline flex items-center gap-1"
                    >
                      <Eye className="w-4 h-4" />
                      Voir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-gray-500">
            Page {currentPage} sur {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border hover:bg-green-300 rounded text-sm disabled:opacity-50"
            >
              ⬅ Précédent
            </button>
            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(totalPages, p + 1))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 border hover:bg-green-300 rounded text-sm disabled:opacity-50"
            >
              Suivant ➡
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ControleurCulturesExportees;
