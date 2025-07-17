import DashboardLayout from "@/components/DashboardLayout";
import UserMenu from "@/components/UserMenu";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createInspectionRequest } from "@/services/inspectionDemande";
import { getExportateurCultures } from "@/services/exportateurCultureService";
import { toast } from "react-toastify";

const NouvelleDemande = () => {
  const navigate = useNavigate();
  const [cultures, setCultures] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCultures, setSelectedCultures] = useState([]);

  useEffect(() => {
    const fetchCultures = async () => {
      try {
        const data = await getExportateurCultures();
        // Garder uniquement les cultures "en production"
        const filtered = (data || []).filter(
          (c) => c.statut?.toLowerCase() === "en production"
        );
        setCultures(filtered);
      } catch (error) {
        toast.error("Erreur lors du chargement des cultures.");
        console.error(error);
      }
    };
    fetchCultures();
  }, []);

  const toggleCulture = (id) => {
    setSelectedCultures((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedCultures.length === 0) {
      toast.error("Veuillez sélectionner au moins une culture.");
      return;
    }

    try {
      await createInspectionRequest({
        culture_ids: selectedCultures,
        remarques: "Cultures prêtes pour inspection",
      });

      toast.success("Demande envoyée avec succès !");
      navigate("/exportateur/mes-demandes");
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || "Une erreur est survenue lors de l’envoi de la demande."
      );
    }
  };

  const filteredCultures = cultures.filter((c) =>
    (c.nom_culture || "").toLowerCase().includes(search.toLowerCase())
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
                <th className="p-3 border-b"></th>
                <th className="p-3 border-b">Nom culture</th>
                <th className="p-3 border-b">Variété</th>
                <th className="p-3 border-b">Localisation</th>
                <th className="p-3 border-b">Agriculteur</th>
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
                    <td className="p-3 border-b">{culture.nom_culture}</td>
                    <td className="p-3 border-b">{culture.variete}</td>
                    <td className="p-3 border-b">{culture.localisation}</td>
                    <td className="p-3 border-b">
                      {culture.user?.prenom} {culture.user?.nom}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">
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
