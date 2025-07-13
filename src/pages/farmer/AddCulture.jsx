import DashboardLayout from "@/components/DashboardLayout";
import { useNavigate, useLocation } from "react-router-dom";
import UserMenu from "@/components/UserMenu";
import { createCulture } from "@/services/createCultureService";
import { useEffect, useState } from "react";
import { getExportateurs } from "@/services/getExportateursService";
import { toast } from "react-toastify";

const AjouterCulture = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cultureToEdit = location.state?.culture;

  const [formData, setFormData] = useState({
    nom_culture: cultureToEdit?.nom || "",
    variete: cultureToEdit?.variété || "",
    localisation: cultureToEdit?.localisation || "",
    exportateur: "",
  });

  const [exportateurs, setExportateurs] = useState([]);

  useEffect(() => {
    const fetchExportateurs = async () => {
      try {
        const data = await getExportateurs();
        setExportateurs(data);
      } catch (error) {
        console.error("Erreur de chargement des exportateurs :", error);
        toast.error("Impossible de charger les exportateurs.");
      }
    };
    fetchExportateurs();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        nom_culture: formData.nom_culture,
        variete: formData.variete,
        localisation: formData.localisation,
      };

      if (formData.exportateur) {
        payload.exportateur_id = formData.exportateur;
      }

      await createCulture(payload);
      toast.success("Culture ajoutée avec succès !");
      navigate("/farmer/Culture");
    } catch (error) {
      console.error("Erreur ajout culture :", error);
      toast.error("Échec de l’ajout de la culture.");
    }
  };

  return (
    <DashboardLayout>
      <UserMenu farmerName="Agriculteur" />
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-green-900">
            {cultureToEdit ? "Modifier une culture" : "Ajouter une culture"}
          </h1>
          <button
            onClick={() => navigate("/farmer/Culture")}
            className="text-sm text-purple-600 hover:underline"
          >
            ← Retour à la liste
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Nom de la culture
              </label>
              <input
                type="text"
                name="nom_culture"
                value={formData.nom_culture}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Variété
              </label>
              <input
                type="text"
                name="variete"
                value={formData.variete}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Localisation
              </label>
              <input
                type="text"
                name="localisation"
                value={formData.localisation}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Exportateur (optionnel)
              </label>
              <select
                name="exportateur"
                value={formData.exportateur}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
              >
                <option value="">-- Aucun exportateur associé --</option>
                {exportateurs.map((exp) => (
                  <option key={exp.id} value={exp.id}>
                    {exp.prenom} {exp.nom}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/farmer/Culture")}
              className="text-gray-600 border border-gray-300 px-6 py-2 rounded hover:bg-gray-100"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition duration-200"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AjouterCulture;
