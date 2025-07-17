import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import UserMenu from "@/components/UserMenu";
import { getExportateurCultures } from "@/services/exportateurCultureService";
import { toast } from "react-toastify";

const ExportateurCultures = () => {
  const [cultures, setCultures] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statutFilter, setStatutFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCultures = async () => {
      try {
        const res = await getExportateurCultures();
        setCultures(res || []);
      } catch {
        toast.error("Erreur lors du chargement des cultures.");
      } finally {
        setLoading(false);
      }
    };
    fetchCultures();
  }, []);

  const filteredCultures = cultures.filter((culture) => {
    const matchesSearch = [culture.nom_culture, culture.variete, culture.localisation, `${culture.user?.prenom} ${culture.user?.nom}`]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statutFilter === "all" || culture.statut?.toLowerCase() === statutFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      <UserMenu farmerName="Exportateur" />
      <h1 className="text-2xl font-bold text-green-900 mt-4 mb-1">
        Cultures affiliées
      </h1>
      <p className="text-sm text-gray-600 mb-6">
        Liste des cultures associées à votre profil d’exportateur.
      </p>

      {/* 🔍 Recherche & Filtre */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <input
          type="text"
          placeholder="Rechercher une culture, variété, localisation, agriculteur..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 p-2 border rounded-md"
        />

        <select
          value={statutFilter}
          onChange={(e) => setStatutFilter(e.target.value)}
          className="w-full md:w-1/4 p-2 border rounded-md"
        >
          <option value="all">-- Tous les statuts --</option>
          <option value="en production">En production</option>
          <option value="exportée">Exportée</option>
        </select>
      </div>

      {/* 📄 Tableau */}
      <div className="overflow-x-auto bg-white rounded shadow">
        {loading ? (
          <p className="p-4 text-gray-500">Chargement des cultures...</p>
        ) : filteredCultures.length === 0 ? (
          <p className="p-4 text-gray-500">Aucune culture trouvée.</p>
        ) : (
          <table className="w-full table-auto text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Nom</th>
                <th className="p-3">Variété</th>
                <th className="p-3">Localisation</th>
                <th className="p-3">Statut</th>
                <th className="p-3">Début</th>
                <th className="p-3">Agriculteur</th>
              </tr>
            </thead>
            <tbody>
              {filteredCultures.map((culture) => (
                <tr key={culture.id} className="border-t">
                  <td className="p-3">{culture.nom_culture}</td>
                  <td className="p-3">{culture.variete}</td>
                  <td className="p-3">{culture.localisation}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        culture.statut === "en production"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {culture.statut}
                    </span>
                  </td>
                  <td className="p-3">
                    {new Date(culture.date_declaration).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    {culture.user?.prenom} {culture.user?.nom}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ExportateurCultures;
