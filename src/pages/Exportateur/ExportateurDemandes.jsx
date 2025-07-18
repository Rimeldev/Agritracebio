import DashboardLayout from "@/components/DashboardLayout";
import UserMenu from "@/components/UserMenu";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// Labels utilisateur-friendly
const statutLabels = {
  en_attente: "En attente",
  en_cours: "En cours",
  validée: "Validée",
  rejetée: "Rejetée",
};

// Couleurs des statuts
const statutColors = {
  en_attente: "bg-red-100 text-red-700",
  en_cours: "bg-yellow-100 text-yellow-700",
  validée: "bg-green-100 text-green-700",
  rejetée: "bg-gray-300 text-gray-800",
};

const ExportateurDemandes = () => {
  const navigate = useNavigate();
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statutFilter, setStatutFilter] = useState("");

  useEffect(() => {
    const fetchDemandes = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Utilisateur non authentifié");

        const response = await axios.get(
          "http://127.0.0.1:5000/api/exportateur/demandes-inspection",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setDemandes(response.data.data);
        } else {
          toast.error("Erreur lors du chargement des demandes.");
        }
      } catch (error) {
        toast.error("Erreur lors du chargement des demandes.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDemandes();
  }, []);

  // Filtrage
  const filteredDemandes = demandes.filter((demande) => {
    const statutOk =
      statutFilter === "" || demande.statut === statutFilter;

    const searchLower = search.toLowerCase();
    const dateStr = new Date(demande.date_demande).toLocaleDateString();

    const searchOk =
      dateStr.toLowerCase().includes(searchLower) ||
      demande.id.toLowerCase().includes(searchLower);

    return statutOk && searchOk;
  });

 if (loading) {
  return (
    <DashboardLayout>
      <UserMenu farmerName="Exportateur" />
    </DashboardLayout>
  );
}

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

      {/* Filtres */}
      <div className="flex flex-wrap gap-4 mb-4 items-center">
        <input
          type="text"
          placeholder="Rechercher numéro demande"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-sm max-w-xs"
        />
        <select
          value={statutFilter}
          onChange={(e) => setStatutFilter(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-sm"
        >
          <option value="">Tous statuts</option>
          <option value="en_attente">En attente</option>
          <option value="en_cours">En cours</option>
          <option value="validée">Validée</option>
          <option value="rejetée">Rejetée</option>
        
        </select>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full table-auto text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">N° Demande</th>
              <th className="p-3">Date création</th>
              <th className="p-3">Nb cultures</th>
              <th className="p-3">Statut</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDemandes.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  Aucune demande d’inspection trouvée.
                </td>
              </tr>
            ) : (
              filteredDemandes.map((demande, index) => {
                const total = demande.cultures?.length || 0;
                const numeroDemande = `DEM${(index + 1).toString().padStart(2, "0")}`;

                return (
                  <tr key={demande.id} className="border-t">
                    <td className="p-3 font-medium text-gray-800">{numeroDemande}</td>
                    <td className="p-3 text-gray-700">
                      {new Date(demande.date_demande).toLocaleDateString()}
                    </td>
                    <td className="p-3">{total}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${
                          statutColors[demande.statut] || "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {statutLabels[demande.statut] || demande.statut}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => navigate(`/exportateur/mes-demandes/${demande.id}`)}
                        className="p-2 rounded hover:bg-green-200"
                        title="Voir les détails"
                      >
                        <Eye className="h-4 w-4 text-green-700" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default ExportateurDemandes;
