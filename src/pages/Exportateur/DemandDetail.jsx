// /pages/exportateur/DemandDetail.jsx
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import UserMenu from "@/components/UserMenu";
import { ArrowLeft } from "lucide-react";

// Mock de données statiques pour test
const mockDemandes = [
  {
    id: "DEM001",
    date: "2025-01-10",
    statut: "traité",
    cultures: [
      {
        nom: "Ananas – Lokossa",
        resultat: "positif",
        details:
          "Pas de résidus chimiques. Bon calibre. Aucune anomalie détectée.",
      },
      {
        nom: "Mangue – Bembéréké",
        resultat: "négatif",
        details: "Présence d’anomalies sur 20% des échantillons.",
      },
    ],
  },
  {
    id: "DEM002",
    date: "2025-01-12",
    statut: "en cours",
    cultures: [
      {
        nom: "Ananas – Porto-Novo",
        resultat: null,
        details: "",
      },
    ],
  },
];

const statutLabel = {
  "en attente": "En attente",
  "en cours": "En cours",
  "traité": "Traité",
};

const badgeClass = {
  "en attente": "bg-yellow-100 text-yellow-700 border border-yellow-400",
  "en cours": "bg-orange-100 text-orange-700 border border-orange-400",
  "traité": "bg-green-100 text-green-700 border border-green-400",
};

const DemandDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const demande = mockDemandes.find((d) => d.id === id);

  if (!demande) {
    return (
      <DashboardLayout>
        <div className="text-red-500 font-semibold p-4">
          Demande introuvable.
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <UserMenu farmerName="Exportateur" />

      <div className="flex items-center gap-2 mt-4 mb-2">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-600 hover:text-green-700 flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour
        </button>
      </div>

      <h1 className="text-2xl font-bold text-green-900 mb-1">
        Détail de la demande {demande.id}
      </h1>
      <p className="text-sm text-gray-600 mb-4">
        Date de création : {new Date(demande.date).toLocaleDateString()} •{" "}
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${badgeClass[demande.statut]}`}
        >
          {statutLabel[demande.statut]}
        </span>
      </p>

      <div className="space-y-4">
        {demande.cultures.map((culture, idx) => (
          <div
            key={idx}
            className="bg-white p-4 rounded shadow border space-y-2"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-semibold text-gray-800">
                {culture.nom}
              </h2>
              {culture.resultat && (
                <span
                  className={`px-3 py-1 text-xs rounded-full font-medium ${
                    culture.resultat === "positif"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {culture.resultat === "positif" ? "Validée" : "Rejetée"}
                </span>
              )}
              {!culture.resultat && (
                <span className="text-xs text-gray-500 italic">
                  En attente d’évaluation
                </span>
              )}
            </div>
            {culture.details && (
              <p className="text-sm text-gray-700">{culture.details}</p>
            )}
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default DemandDetail;
