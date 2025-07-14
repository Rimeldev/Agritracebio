import DashboardLayout from "@/components/DashboardLayout";
import UserMenu from "@/components/UserMenu";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";

const ExportateurDemandes = () => {
  const navigate = useNavigate();

  const mockDemandes = [
    {
      id: "DEM001",
      date: "2025-01-10",
      statut: "traité",
      cultures: [
        { nom: "Ananas – Lokossa", resultat: "positif" },
        { nom: "Mangue – Bembéréké", resultat: "négatif" },
      ],
    },
    {
      id: "DEM002",
      date: "2025-01-12",
      statut: "en cours",
      cultures: [
        { nom: "Ananas – Porto-Novo", resultat: null },
      ],
    },
  ];

  const statutLabels = {
    "en attente": "En attente",
    "en cours": "En cours",
    "traité": "Traité",
  };

  const statutColors = {
    "en attente": "border border-yellow-500 text-yellow-700",
    "en cours": "border border-orange-500 text-orange-700",
    "traité": "border border-green-600 text-green-700",
  };

  return (
    <DashboardLayout>
      <UserMenu farmerName="Exportateur" />

      <div className="flex justify-between items-center mt-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-green-900">Demandes d’inspection</h1>
          <p className="text-sm text-gray-600">
            Suivez vos demandes et consultez l’état des cultures associées.
          </p>
        </div>
        <button
          onClick={() => navigate("/exportateur/nouvelle-demande")}
          className="bg-green-700 hover:bg-green-800 text-white text-sm px-4 py-2 rounded"
        >
          + Faire une nouvelle demande
        </button>
      </div>

      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white shadow-md rounded text-sm">
          <thead className="bg-gray-100 text-left text-gray-600">
            <tr>
              <th className="px-4 py-3">ID Demande</th>
              <th className="px-4 py-3">Date création</th>
              <th className="px-4 py-3">Nb cultures</th>
              <th className="px-4 py-3">Cultures validées</th>
              <th className="px-4 py-3">Statut</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockDemandes.map((demande) => {
              const total = demande.cultures.length;
              const valides = demande.cultures.filter((c) => c.resultat === "positif").length;

              return (
                <tr
                  key={demande.id}
                  className="border-b hover:bg-gray-50 transition-all duration-200"
                >
                  <td className="px-4 py-3 font-medium text-gray-800">{demande.id}</td>
                  <td className="px-4 py-3 text-gray-700">
                    {new Date(demande.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">{total}</td>
                  <td className="px-4 py-3">
                    {valideLabel(demande.statut, valides, total)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium inline-block ${
                        statutColors[demande.statut]
                      }`}
                    >
                      {statutLabels[demande.statut]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => navigate(`/exportateur/mes-demandes/${demande.id}`)}
                      className="p-2 rounded hover:bg-gray-200"
                      title="Voir les détails"
                    >
                      <Eye className="h-4 w-4 text-gray-700" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

const valideLabel = (statut, valides, total) => {
  if (statut === "traité") {
    if (valides === total) return <span className="text-green-600">{valides}/{total}</span>;
    if (valides > 0) return <span className="text-orange-500">{valides}/{total}</span>;
    return <span className="text-red-500">0/{total}</span>;
  }
  return <span className="text-gray-600">{valides}/{total}</span>;
};

export default ExportateurDemandes;
