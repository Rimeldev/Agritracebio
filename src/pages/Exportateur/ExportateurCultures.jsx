import DashboardLayout from "@/components/DashboardLayout";
import UserMenu from "@/components/UserMenu";

const ExportateurCultures = () => {
  const mockCultures = [
    {
      id: "1",
      nom_culture: "Ananas Bénin",
      variete: "Smooth Cayenne",
      localisation: "Lokossa",
      statut: "En production",
      date_debut: "2025-06-01",
      agriculteur: "Komi Dossou",
    },
    {
      id: "2",
      nom_culture: "Mangue du Nord",
      variete: "Kent",
      localisation: "Bembéréké",
      statut: "Exportée",
      date_debut: "2025-05-12",
      agriculteur: "Moussa Bio",
    },
  ];

  return (
    <DashboardLayout>
      <UserMenu farmerName="Exportateur" />
      <h1 className="text-2xl font-bold text-green-900 mt-4 mb-1">Cultures affiliées</h1>
      <p className="text-sm text-gray-600 mb-6">
        Liste des cultures associées à votre profil d’exportateur.
      </p>
      

      <div className="overflow-x-auto bg-white rounded shadow">
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
            {mockCultures.map((culture) => (
              <tr key={culture.id} className="border-t">
                <td className="p-3">{culture.nom_culture}</td>
                <td className="p-3">{culture.variete}</td>
                <td className="p-3">{culture.localisation}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      culture.statut === "En production"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {culture.statut}
                  </span>
                </td>
                <td className="p-3">{new Date(culture.date_debut).toLocaleDateString()}</td>
                <td className="p-3">{culture.agriculteur}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default ExportateurCultures;
