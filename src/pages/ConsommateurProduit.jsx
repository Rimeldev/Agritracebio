import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ConsommateurProduit = () => {
  const { produitId } = useParams();
  const [produit, setProduit] = useState(null);

  useEffect(() => {
    // Simulation d’appel API – tu remplaceras ça par un appel backend réel
    const mockData = {
      id: produitId,
      nom: "Ananas Cayenne",
      variete: "Smooth Cayenne",
      agriculteur: "Komi Dossou",
      localisation: "Lokossa, Bénin",
      dateRecolte: "2025-07-05",
      inspection: {
        statut: "Validée",
        date: "2025-07-07",
        certificatUrl: "/certificats/DEM001.pdf",
      },
      parcours: [
        { etape: "Culture", lieu: "Ferme Komi", date: "2025-06-01" },
        { etape: "Inspection", lieu: "Lokossa", date: "2025-07-07" },
        { etape: "Expédition", lieu: "Port de Cotonou", date: "2025-07-10" },
      ],
    };

    setProduit(mockData);
  }, [produitId]);

  if (!produit) return <div className="p-6">Chargement...</div>;

  return (
    <div className="min-h-screen bg-[#F5F9F3] p-6 text-green-900">
      <div className="max-w-3xl mx-auto bg-white rounded shadow p-6">
        <h1 className="text-2xl font-bold mb-2">Fiche produit</h1>
        <p className="text-gray-600 mb-4">Informations après scan du QR Code</p>

        <div className="space-y-4">
          <div>
            <h2 className="font-semibold">Nom du produit :</h2>
            <p>{produit.nom} – {produit.variete}</p>
          </div>

          <div>
            <h2 className="font-semibold">Lieu de production :</h2>
            <p>{produit.localisation}</p>
          </div>

          <div>
            <h2 className="font-semibold">Agriculteur :</h2>
            <p>{produit.agriculteur}</p>
          </div>

          <div>
            <h2 className="font-semibold">Date de récolte :</h2>
            <p>{new Date(produit.dateRecolte).toLocaleDateString()}</p>
          </div>

          <div>
            <h2 className="font-semibold">Inspection sanitaire :</h2>
            <p>
              <span
                className={`inline-block px-2 py-1 rounded-full text-sm font-medium ${
                  produit.inspection.statut === "Validée"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {produit.inspection.statut}
              </span>{" "}
              le {new Date(produit.inspection.date).toLocaleDateString()}
            </p>
            <a
              href={produit.inspection.certificatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-sm underline"
            >
              Voir le certificat PDF
            </a>
          </div>

          <div>
            <h2 className="font-semibold mb-1">Parcours du produit :</h2>
            <ul className="text-sm list-disc list-inside">
              {produit.parcours.map((etape, idx) => (
                <li key={idx}>
                  <strong>{etape.etape}</strong> – {etape.lieu} (
                  {new Date(etape.date).toLocaleDateString()})
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsommateurProduit;
