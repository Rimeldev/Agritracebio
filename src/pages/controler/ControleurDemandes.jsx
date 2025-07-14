import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import InspectionModal from "@/components/InspectionModal";
import UserMenu from "@/components/UserMenu";
import DemandeDetailModal from "@/components/DemandeDetailModal";


const ControleurDemandes = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDemande, setSelectedDemande] = useState(null);
const [showDetailModal, setShowDetailModal] = useState(false);

  const [demandes, setDemandes] = useState([
    {
      id: "DEM001",
      date: "2025-07-10",
      exportateur: "AGRIEXPORT BENIN",
      cultures: 2,
      statut: "en attente",
      email: "contact@agriexport.bj",
    },
    {
      id: "DEM002",
      date: "2025-07-12",
      exportateur: "TropicFresh",
      cultures: 1,
      statut: "en attente",
      email: "tropic@fresh.com",
    },
  ]);

  const openModal = (demande) => {
    setSelectedDemande(demande);
    setShowModal(true);
  };

  const handleSendEmail = ({ email, date, message }) => {
    console.log("✅ Email envoyé à :", email);
    console.log("🗓️ Date :", date);
    console.log("✉️ Message :", message);

    setDemandes((prev) =>
      prev.map((d) =>
        d.id === selectedDemande.id ? { ...d, statut: "en cours" } : d
      )
    );

    setShowModal(false);
  };

  const statutColors = {
    "en attente": "bg-yellow-100 text-yellow-700",
    "en cours": "bg-blue-100 text-blue-700",
    traité: "bg-green-100 text-green-700",
  };

  return (
    <DashboardLayout>
      <UserMenu />
      <h1 className="text-2xl font-bold text-green-900 mt-4 mb-1">Demandes d’inspection</h1>
      <p className="text-sm text-gray-600 mb-6">
        Liste des demandes envoyées par les exportateurs.
      </p>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full table-auto text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Date</th>
              <th className="p-3">Exportateur</th>
              <th className="p-3">Nb cultures</th>
              <th className="p-3">Statut</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {demandes.map((demande) => (
              <tr key={demande.id} className="border-t">
                <td className="p-3">{demande.id}</td>
                <td className="p-3">{new Date(demande.date).toLocaleDateString()}</td>
                <td className="p-3">{demande.exportateur}</td>
                <td className="p-3">{demande.cultures}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      statutColors[demande.statut]
                    }`}
                  >
                    {demande.statut}
                  </span>
                </td>
                <td className="p-3 text-center space-x-2">
                  <button
  className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs px-3 py-1 rounded"
  onClick={() => {
    setSelectedDemande(demande);
    setShowDetailModal(true);
  }}
>
  Voir détails
</button>

                  <button
                    onClick={() => openModal(demande)}
                    className="bg-green-700 hover:bg-green-800 text-white text-xs px-3 py-1 rounded"
                  >
                    Programmer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && selectedDemande && (
        <InspectionModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSend={handleSendEmail}
          email={selectedDemande.email}
        />
      )}
      {showDetailModal && selectedDemande && (
  <DemandeDetailModal
    isOpen={showDetailModal}
    onClose={() => setShowDetailModal(false)}
    demande={selectedDemande}
  />
)}

    </DashboardLayout>
  );
};

export default ControleurDemandes;
