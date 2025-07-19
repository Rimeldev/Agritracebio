import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import InspectionModal from "@/components/InspectionModal";
import UserMenu from "@/components/UserMenu";
import DemandeDetailModal from "@/components/DemandeDetailModal";
import { getAllDemandesInspection } from "@/services/controleurDemandeService";
import { sendInspectionNotification } from "@/services/sendInspectionNotificationService";
import { toast } from "react-toastify";

// Couleurs des statuts
const statutColors = {
  en_attente: "bg-red-100 text-red-700",
  en_cours: "bg-yellow-100 text-yellow-700",
  validée: "bg-green-100 text-green-700",
  rejetée: "bg-gray-300 text-gray-800",
};

const ControleurDemandes = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDemande, setSelectedDemande] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [demandes, setDemandes] = useState([]);

  useEffect(() => {
    const fetchDemandes = async () => {
      try {
        const data = await getAllDemandesInspection();
        const demandesFormatees = data
          .filter((d) => d.statut === "en_attente")
          .map((d, index) => ({
            numero: `DEM${(index + 1).toString().padStart(3, "0")}`,
            date: d.date_demande,
            exportateur: `${d.exportateur_id.prenom} ${d.exportateur_id.nom}`,
            cultures: d.cultures.length,
            statut: d.statut,
            email: d.exportateur_id.email,
            original: d,
          }));
        setDemandes(demandesFormatees);
      } catch (error) {
        console.error(error);
        toast.error("Erreur lors du chargement des demandes.");
      }
    };

    fetchDemandes();
  }, []);

  const openModal = (demande) => {
    setSelectedDemande(demande.original);
    setShowModal(true);
  };

 const handleSendEmail = async ({ email, date, message, demandeId }) => {
  try {
    const date_inspection = new Date(date).toISOString();
    
    await sendInspectionNotification({
      email,
      date_inspection,
      message,
      demande_id: demandeId, // ✅ bien transmis
    });

    toast.success("Email envoyé avec succès !");
    setDemandes((prev) =>
      prev.map((d) =>
        d.original._id === demandeId ? { ...d, statut: "en_cours" } : d
      )
    );
    setShowModal(false);
  } catch {
    toast.error("Erreur lors de l'envoi de l'email.");
  }
};

  return (
    <DashboardLayout>
      <UserMenu />
      <h1 className="text-2xl font-bold text-green-900 mt-4 mb-1">Demandes d’inspection</h1>
      <p className="text-sm text-gray-600 mb-6">
        Liste des demandes <strong>en attente</strong> envoyées par les exportateurs.
      </p>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full table-auto text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">N° Demande</th>
              <th className="p-3">Date</th>
              <th className="p-3">Exportateur</th>
              <th className="p-3">Nb cultures</th>
              <th className="p-3">Statut</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
        <tbody>
  {demandes.length === 0 ? (
    <tr>
      <td colSpan="6" className="text-center py-6 text-gray-500">
        Aucune demande d’inspection en attente pour le moment.
      </td>
    </tr>
  ) : (
    demandes.map((demande) => (
      <tr key={demande.original.id} className="border-t">
        <td className="p-3">{demande.numero}</td>
        <td className="p-3">
          {new Date(demande.date).toLocaleDateString()}
        </td>
        <td className="p-3">
          <a
            href={`/controleur/exportateur/${demande.original.exportateur_id.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 underline hover:text-blue-900"
          >
            {demande.exportateur}
          </a>
        </td>
        <td className="p-3">{demande.cultures}</td>
        <td className="p-3">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              statutColors[demande.statut] || "bg-gray-100 text-gray-700"
            }`}
          >
            {demande.statut.replace("_", " ")}
          </span>
        </td>
        <td className="p-3 text-center space-x-2">
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs px-3 py-1 rounded"
            onClick={() => {
              setSelectedDemande(demande.original);
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
    ))
  )}
</tbody>

        </table>
      </div>

      {showModal && selectedDemande && (
  <InspectionModal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  onSend={handleSendEmail}
  email={selectedDemande.exportateur_id.email}
  demandeId={selectedDemande.id}
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
