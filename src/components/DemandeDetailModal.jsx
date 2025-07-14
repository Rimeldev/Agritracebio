import { X } from "lucide-react";

const DemandeDetailModal = ({ isOpen, onClose, demande }) => {
  if (!isOpen || !demande) return null;

  const cultures = [
    {
      id: "CULT001",
      nom: "Ananas Bénin",
      variete: "Smooth Cayenne",
      localisation: "Lokossa",
      date_debut: "2025-06-01",
      statut: "En production",
    },
    {
      id: "CULT002",
      nom: "Mangue Kent",
      variete: "Kent",
      localisation: "Bembéréké",
      date_debut: "2025-05-20",
      statut: "Prête pour inspection",
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-red-600"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold text-green-900 mb-1">
          Détails de la demande : {demande.id}
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Exportateur : <strong>{demande.exportateur}</strong> – {demande.email}
        </p>

        <div className="overflow-x-auto">
          <table className="w-full table-auto text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-2">Nom</th>
                <th className="p-2">Variété</th>
                <th className="p-2">Localisation</th>
                <th className="p-2">Début</th>
                <th className="p-2">Statut</th>
              </tr>
            </thead>
            <tbody>
              {cultures.map((culture) => (
                <tr key={culture.id} className="border-t">
                  <td className="p-2">{culture.nom}</td>
                  <td className="p-2">{culture.variete}</td>
                  <td className="p-2">{culture.localisation}</td>
                  <td className="p-2">
                    {new Date(culture.date_debut).toLocaleDateString()}
                  </td>
                  <td className="p-2">{culture.statut}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DemandeDetailModal;
