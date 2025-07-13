// pages/Cultures.jsx
import DashboardLayout from "@/components/DashboardLayout";
import UserMenu from "@/components/UserMenu";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMyCultures } from "@/services/getMyCulturesService";
import { toast } from "react-toastify";


const Cultures = () => {
const navigate = useNavigate();
const [cultures, setCultures] = useState([]);
const [searchTerm, setSearchTerm] = useState("");

useEffect(() => {
  const fetchCultures = async () => {
    try {
      const data = await getMyCultures(); // ton service API
      setCultures(data);
    } catch (error) {
      console.error("Erreur de chargement des cultures :", error);
      toast.error("Impossible de charger les cultures.");
    }
  };

  fetchCultures();
}, []);



  const filteredCultures = (cultures || []).filter((c) =>
  c.nom_culture?.toLowerCase().includes(searchTerm.toLowerCase())
);


  return (
    <DashboardLayout>
    <UserMenu farmerName="Agriculteur" />
    <h1 className="text-2xl font-bold text-green-900 mt-4 mb-2">Mes cultures</h1>
       {/* Bouton + Champ de recherche sur la même ligne */}
<div className="flex flex-col md:flex-row justify-between items-center mb-4 pt-6 gap-4">
  <input
    type="text"
    placeholder="Rechercher une culture..."
    className="border p-2 rounded w-full md:w-1/3"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  <button
    onClick={() => navigate('/AddCulture')}
    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-200"
  >
    + Ajouter une culture
  </button>
</div>

      {/* Tableau des cultures */}
      <p className="text-sm text-gray-600 mb-2">
  {filteredCultures.length} culture{filteredCultures.length > 1 ? "s" : ""} trouvée{filteredCultures.length > 1 ? "s" : ""}
</p>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-[#DDE3C2] text-left text-gray-700 uppercase text-xs">
              <th className="p-3">Nom</th>
              <th className="p-3">Variété</th>
              <th className="p-3">Localisation</th>
              <th className="p-3">Date de début</th>
              <th className="p-3">Statut</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
           {filteredCultures.map((culture) => (
  <tr key={culture.id} className="border-t">
    <td className="p-3">{culture.nom_culture}</td>
    <td className="p-3">{culture.variete}</td>
    <td className="p-3">{culture.localisation}</td>
    <td className="p-3">{new Date(culture.date_declaration).toLocaleDateString()}</td>
    <td className="p-3">
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          culture.statut === "en production"
            ? "bg-yellow-100 text-yellow-800"
            : "bg-green-100 text-green-800"
        }`}
      >
        {culture.statut}
      </span>
    </td>
    <td className="p-3 flex gap-4">
      <button
        className="text-green-600 hover:underline text-sm"
        onClick={() => navigate('/AddCulture', { state: { culture } })}
      >
        Modifier
      </button>
      <button className="text-red-600 hover:underline text-sm">
        Supprimer
      </button>
    </td>
  </tr>
))}

            {filteredCultures.length === 0 && (
              <tr>
                <td className="p-4 text-center text-gray-500" colSpan={6}>
                  Aucune culture trouvée.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default Cultures;
