import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import UserMenu from "@/components/UserMenu";
import axios from "axios";
import { toast } from "react-toastify";

// Ajout des nouveaux statuts avec leurs couleurs
const statutColors = {
  en_attente: "bg-red-100 text-red-700",
  en_cours: "bg-yellow-100 text-yellow-700",
  validée: "bg-green-100 text-green-700",
  rejetée: "bg-gray-200 text-gray-700",
};

// Libellés plus lisibles pour l'affichage
const statutLabels = {
  en_attente: "En attente",
  en_cours: "En cours",
  validée: "Validée",
  rejetée: "Rejetée",
};

const DemandeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [demande, setDemande] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDemande = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://127.0.0.1:5000/api/exportateur/demandes-inspection", {
          headers: { Authorization: `Bearer ${token}` }
        });

        const allDemandes = response.data.data || [];
        const found = allDemandes.find((d) => d.id === id);
        setDemande(found);
      } catch (error) {
        console.error(error);
        toast.error("Impossible de charger les détails de la demande.");
      } finally {
        setLoading(false);
      }
    };

    fetchDemande();
  }, [id]);

  if (loading) return <p className="p-6">Chargement...</p>;
  if (!demande) return <p className="p-6 text-red-500">Demande introuvable.</p>;

  const statutClass = statutColors[demande.statut] || "bg-gray-100 text-gray-700";
  const statutLabel = statutLabels[demande.statut] || demande.statut;

  return (
    <DashboardLayout>
      <UserMenu farmerName="Exportateur" />

      <div className="flex justify-between items-center mt-6 mb-4">
        <h1 className="text-2xl font-bold text-green-900">Détails de la demande</h1>
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-green-700 hover:underline"
        >
          ← Retour
        </button>
      </div>

      <div className="bg-white rounded shadow p-6 text-sm space-y-4">
        <div className="flex items-center gap-6 flex-wrap">
          <div>
            <p className="text-gray-600">Date de création</p>
            <p className="font-medium">{new Date(demande.date_demande).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-gray-600">Statut</p>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statutClass}`}>
              {statutLabel}
            </span>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2 text-green-800">Cultures concernées</h2>
          <div className="overflow-x-auto rounded border border-gray-200">
            <table className="w-full table-auto text-sm">
              <thead className="bg-gray-50 text-left">
                <tr className="text-gray-700">
                  <th className="p-3 border-b">Nom de la culture</th>
                  <th className="p-3 border-b">Variété</th>
                  <th className="p-3 border-b">Localisation</th>
                  <th className="p-3 border-b">Agriculteur</th>
                </tr>
              </thead>
              <tbody>
                {demande.cultures.map((culture) => (
                  <tr key={culture.id} className="hover:bg-gray-50">
                    <td className="p-3 border-b">{culture.nom_culture}</td>
                    <td className="p-3 border-b capitalize">{culture.variete}</td>
                    <td className="p-3 border-b capitalize">{culture.localisation}</td>
                    <td className="p-3 border-b">{culture.user?.prenom} {culture.user?.nom}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DemandeDetail;
