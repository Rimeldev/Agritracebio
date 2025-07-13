import React from "react";

const UsersTab = ({
  users,
  userFilter,
  showDeleted,
  setUserFilter,
  setShowDeleted,
  toggleSuspension,
  promoteToAdmin,
}) => {
  // Mapping pour filtrer les types selon la valeur choisie dans le select
  const typeMap = {
    Tous: null,
    Agriculteur: "agriculteur",
    Contrôleur: "controlleur", // clé sans accent, valeur API
    Exportateur: "exportateur",
  };

  // Mapping pour afficher joli le type dans le tableau
  const typeLabels = {
    agriculteur: "Agriculteur",
    controlleur: "Contrôleur",
    exportateur: "Exportateur",
  };

  const filteredUsers = users.filter((user) => {
    const expectedType = typeMap[userFilter];
    const typeMatch = !expectedType || user.type_utilisateur === expectedType;
    const deletedMatch = user.is_deleted === showDeleted;
    return typeMatch && deletedMatch;
  });

  return (
    <section>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <h2 className="text-xl font-bold">Gestion des utilisateurs</h2>
        <div className="flex gap-3 items-center">
          <select
            value={userFilter}
            onChange={(e) => setUserFilter(e.target.value)}
            className="border rounded px-3 py-1 text-sm"
          >
            {["Tous", "Agriculteur", "Contrôleur", "Exportateur"].map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <label className="text-sm flex items-center gap-1">
            <input
              type="checkbox"
              checked={showDeleted}
              onChange={() => setShowDeleted(!showDeleted)}
            />
            Voir comptes supprimés
          </label>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full table-fixed text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3 w-1/5">Nom</th>
              <th className="p-3 w-1/4">Email</th>
              <th className="p-3 w-1/6">Type</th>
              <th className="p-3 w-1/6 text-center">Statut</th>
              <th className="p-3 w-1/6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id || user._id} className="border-t">
                  <td className="p-3 capitalize">
                    {user.prenom || ""} {user.nom || ""}
                  </td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3 capitalize">
                    {typeLabels[user.type_utilisateur] || user.type_utilisateur}
                  </td>
                  <td className="p-3 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.is_active
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {user.is_active ? "Actif" : "Suspendu"}
                    </span>
                  </td>
                  <td className="p-3 space-y-1 text-center">
                                    {!user.is_deleted && (user.type_utilisateur === "agriculteur" || user.type_utilisateur === "exportateur") && (
                    <button
                      onClick={() => toggleSuspension(user)}
                      className={`text-xs hover:underline ${
                        user.is_active ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      {user.is_active ? "Suspendre" : "Réactiver"}
                    </button>
                  )}


                    {!user.is_deleted && user.type_utilisateur === "controlleur" && (
                      <>
                        {user.is_admin ? (
                          <>
                            <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full inline-block mr-2">
                              Admin
                            </span>
                            <button
                              onClick={() => promoteToAdmin(user)}
                              className="text-red-600 text-xs hover:underline"
                            >
                              Retirer admin
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => toggleSuspension(user)}
                              className={`text-xs hover:underline ${
                                user.is_active ? "text-red-600" : "text-green-600"
                              }`}
                            >
                              {user.is_active ? "Suspendre" : "Réactiver"}
                            </button>
                            <button
                              onClick={() => promoteToAdmin(user)}
                              className="text-blue-600 text-xs hover:underline"
                            >
                              Définir comme admin
                            </button>
                          </>
                        )}
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  Aucun utilisateur trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default UsersTab;
