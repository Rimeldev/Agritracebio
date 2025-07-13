import React from "react";

const DispositifsTab = ({
  dispositifs,
  cultures,
  showAddModal,
  setShowAddModal,
  newDispositif,
  setNewDispositif,
  addDispositif,
  activateDispositif,
  deactivateDispositif,
}) => {
  const dataCultures = cultures;
  const dataDispositifs = dispositifs;

  const cultureMap = dataCultures.reduce((acc, c) => {
    acc[c.id] = c.nom_culture;
    return acc;
  }, {});

  const culturesSansDispositif = dataCultures.filter(
    (c) => !dataDispositifs.find((d) => d.culture_id === c.id)
  );

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Dispositifs IoT</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-green-600 text-white px-4 py-1.5 rounded text-sm hover:bg-green-700"
        >
          Ajouter un dispositif
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full table-auto text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Nom</th>
              <th className="p-3">Culture associée</th>
              <th className="p-3">Date d'installation</th>
              <th className="p-3">Statut</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dataDispositifs.map((dispo) => (
  <tr key={dispo._id || dispo.nom} className="border-t">
                <td className="p-3 font-mono text-xs">{dispo._id}</td>
                <td className="p-3">{dispo.nom}</td>
                <td className="p-3">{cultureMap[dispo.culture_id] || "-"}</td>
                <td className="p-3">{dispo.date_installation}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      dispo.statut === "actif"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {dispo.statut}
                  </span>
                </td>
                <td className="p-3 space-x-2">
                  {dispo.statut === "actif" ? (
                    <button
                      onClick={() => deactivateDispositif(dispo)}
                      className="text-yellow-600 text-xs hover:underline"
                    >
                      Désactiver
                    </button>
                  ) : (
                    <button
                      onClick={() => activateDispositif(dispo)}
                      className="text-green-600 text-xs hover:underline"
                    >
                      Activer
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-brightness-90 flex justify-center items-center z-50">
          <div className="bg-white rounded p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Ajouter un dispositif</h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Nom du dispositif"
                value={newDispositif.nom}
                onChange={(e) =>
                  setNewDispositif({ ...newDispositif, nom: e.target.value })
                }
                className="w-full border rounded px-3 py-2 text-sm"
              />
              <select
                value={newDispositif.culture_id}
                onChange={(e) =>
                  setNewDispositif({ ...newDispositif, culture_id: e.target.value })
                }
                className="w-full border rounded px-3 py-2 text-sm"
              >
        {culturesSansDispositif.map((c) => (
  <option key={c.id || c.nom_culture} value={c.id}>
    {c.nom_culture}
  </option>
))}

              </select>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-1.5 rounded text-sm text-gray-600 hover:underline"
                >
                  Annuler
                </button>
                <button
                  onClick={addDispositif}
                  className="px-4 py-1.5 rounded text-sm bg-green-600 text-white hover:bg-green-700"
                  disabled={!newDispositif.nom || !newDispositif.culture_id}
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default DispositifsTab;
