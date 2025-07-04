import AdminHeader from "@/components/AdminHeader";
import { useState } from "react";
import Action from "@/assets/icons/action.png";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("utilisateurs");

  const stats = [
    {
      label: "Utilisateurs Total",
      value: 156,
      change: "+12% ce mois",
    },
    {
      label: "Cultures Enregistrées",
      value: 89,
      change: "+8% ce mois",
    },
    {
      label: "Volume Production (T)",
      value: 2450,
      change: "+15% ce mois",
    },
    {
      label: "Taux Export (%)",
      value: "38.2%",
      change: "+5% ce mois",
    },
  ];

  const users = [
    {
      name: "Jean Baptiste Koffi",
      email: "jb.koffi@email.com",
      type: "Agriculteur",
      status: "Actif",
      lastLogin: "2024-06-01",
      cultures: 3,
    },
    {
      name: "Marie Adjovi",
      email: "m.adjovi@email.com",
      type: "Agriculteur",
      status: "Actif",
      lastLogin: "2024-05-30",
      cultures: 2,
    },
    {
      name: "Inspecteur Dossou",
      email: "a.dossou@abssa.bj",
      type: "Inspecteur",
      status: "Actif",
      lastLogin: "2024-06-02",
      cultures: 0,
    },
    {
      name: "Paul Agbangla",
      email: "p.agbangla@email.com",
      type: "Agriculteur",
      status: "Suspendu",
      lastLogin: "2024-05-15",
      cultures: 1,
    },
    {
      name: "Export Corp Sarl",
      email: "contact@exportcorp.bj",
      type: "Exportateur",
      status: "Actif",
      lastLogin: "2024-06-01",
      cultures: 0,
    },
  ];

  return (
    <div className="flex">
      <div className="flex-1 flex flex-col">
        <AdminHeader username="Administrateur" />

        <main className="p-6 bg-gray-50 min-h-screen space-y-6">
          {/* Statistiques */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-4">
                <h3 className="text-gray-500 text-sm">{stat.label}</h3>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-green-600 text-sm">{stat.change}</p>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex space-x-4 border-b">
            {["Utilisateurs", "Traçabilité", "Statistiques", "Blockchain"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`px-4 py-2 ${
                  activeTab === tab.toLowerCase()
                    ? "border-b-2 border-green-700 text-green-700 font-semibold"
                    : "text-gray-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Gestion des utilisateurs */}
          {activeTab === "utilisateurs" && (
            <section>
              <h2 className="text-xl font-bold mb-4">
                Gestion des Comptes Utilisateurs
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Contrôle, suspension et suppression des comptes utilisateurs
              </p>
              <input
                type="text"
                placeholder="Rechercher un utilisateur…"
                className="mb-4 px-4 py-2 border rounded w-full md:w-1/3"
              />
              <div className="overflow-x-auto bg-white rounded shadow">
                <table className="w-full table-auto">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      <th className="px-4 py-2 text-left">Nom</th>
                      <th className="px-4 py-2 text-left">Email</th>
                      <th className="px-4 py-2 text-left">Type</th>
                      <th className="px-4 py-2 text-left">Statut</th>
                      <th className="px-4 py-2 text-left">Dernière Connexion</th>
                      <th className="px-4 py-2 text-left">Cultures</th>
                      <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={index} className="border-t">
                        <td className="px-4 py-2">{user.name}</td>
                        <td className="px-4 py-2">{user.email}</td>
                        <td className="px-4 py-2">{user.type}</td>
                        <td className="px-4 py-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              user.status === "Actif"
                                ? "bg-green-200 text-green-800"
                                : "bg-red-200 text-red-800"
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="px-4 py-2">{user.lastLogin}</td>
                        <td className="px-4 py-2">{user.cultures}</td>
                        <td className="px-4 py-2">
                          <button className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300">
                              <img src={Action} alt="Logo AgriTraceBio" className="h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
