import { useState } from "react";
import AdminHeader from "@/components/AdminHeader";



const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("utilisateurs");
  const [userFilter, setUserFilter] = useState("Tous");

  const users = [
    {
      id: 1,
      name: "Jean Baptiste Koffi",
      email: "jb.koffi@email.com",
      type: "Agriculteur",
      status: "Actif",
      lastLogin: "2024-06-01",
      cultures: 3,
      dispositif: {
        id: "DISP-001",
        status: "Actif",
      },
    },
    {
      id: 2,
      name: "Marie Adjovi",
      email: "m.adjovi@email.com",
      type: "Agriculteur",
      status: "Suspendu",
      lastLogin: "2024-05-30",
      cultures: 2,
      dispositif: {
        id: "DISP-002",
        status: "Inactif",
      },
    },
    {
      id: 3,
      name: "Inspecteur Dossou",
      email: "a.dossou@abssa.bj",
      type: "Inspecteur",
      status: "Actif",
      lastLogin: "2024-06-02",
      cultures: 0,
    },
  ];

  const filteredUsers =
    userFilter === "Tous"
      ? users
      : users.filter((u) => u.type === userFilter);

  const suspendUser = (user) => {
    alert(`Le compte de ${user.name} est suspendu. Un email est envoyé.`);
    // Ici, tu enverras une requête au backend pour changer le statut + envoyer un mail.
  };

  const toggleDispositifStatus = (user) => {
    const currentStatus = user.dispositif?.status;
    const newStatus = currentStatus === "Actif" ? "Inactif" : "Actif";
    alert(`Dispositif ${user.dispositif.id} est maintenant ${newStatus}`);
    // Ici, appel backend pour mettre à jour le statut
  };

  return (
    <div className="flex">
      <div className="flex-1 flex flex-col">
        <AdminHeader username="Administrateur" />

        <main className="p-6 bg-gray-50 space-y-6 ">
          {/* Onglets navigation */}
          <div className="flex space-x-6 border-b pb-2">
            {["Utilisateurs", "Cultures", "Dispositifs"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`text-sm pb-2 border-b-2 transition-all duration-150 ${
                  activeTab === tab.toLowerCase()
                    ? "border-green-600 text-green-700 font-semibold"
                    : "border-transparent text-gray-500 hover:text-green-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* UTILISATEURS */}
          {activeTab === "utilisateurs" && (
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Comptes utilisateurs</h2>
                <select
                  value={userFilter}
                  onChange={(e) => setUserFilter(e.target.value)}
                  className="border rounded px-3 py-1 text-sm"
                >
                  {['Tous', 'Agriculteur', 'Inspecteur', 'Exportateur'].map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="overflow-x-auto bg-white rounded shadow">
                <table className="w-full table-auto text-sm">
                  <thead className="bg-gray-100 text-left">
                    <tr>
                      <th className="p-3">Nom</th>
                      <th className="p-3">Email</th>
                      <th className="p-3">Type</th>
                      <th className="p-3">Statut</th>
                      <th className="p-3">Dern. Connexion</th>
                      <th className="p-3">Cultures</th>
                      <th className="p-3">Dispositif</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-t">
                        <td className="p-3">{user.name}</td>
                        <td className="p-3">{user.email}</td>
                        <td className="p-3">{user.type}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              user.status === "Actif"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="p-3">{user.lastLogin}</td>
                        <td className="p-3">{user.cultures}</td>
                        <td className="p-3">
                          {user.dispositif ? (
                            <div className="flex flex-col gap-1">
                              <span className="text-xs font-mono">
                                ID: {user.dispositif.id}
                              </span>
                              <button
                                onClick={() => toggleDispositifStatus(user)}
                                className={`text-xs rounded px-2 py-1 ${
                                  user.dispositif.status === "Actif"
                                    ? "bg-green-200 text-green-800"
                                    : "bg-gray-200 text-gray-600"
                                }`}
                              >
                                {user.dispositif.status}
                              </button>
                            </div>
                          ) : (
                            <button className="text-blue-600 text-xs hover:underline">
                              Ajouter
                            </button>
                          )}
                        </td>
                        <td className="p-3">
                          {user.status === "Actif" && user.type === "Agriculteur" && (
                            <button
                              onClick={() => suspendUser(user)}
                              className="text-red-600 text-xs hover:underline"
                            >
                              Suspendre
                            </button>
                          )}
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
