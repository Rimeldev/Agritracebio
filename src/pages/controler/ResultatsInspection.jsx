import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import UserMenu from "@/components/UserMenu";

const ResultatsInspection = () => {
  const [selectedDemande, setSelectedDemande] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [certificatFile, setCertificatFile] = useState(null);
  const [resultats, setResultats] = useState({});

  const [demandesEnCours, setDemandesEnCours] = useState([
    {
      id: "DEM001",
      exportateur: "AGRIEXPORT BENIN",
      date: "2025-07-10",
      cultures: [
        { id: "CULT001", nom: "Ananas Cayenne – Lokossa" },
        { id: "CULT002", nom: "Ananas Pain de sucre – Zogbodomey" },
      ],
      resultatsSoumis: false,
      certificat: null,
      resultats: {},
    },
    {
      id: "DEM002",
      exportateur: "TropicFresh",
      date: "2025-07-12",
      cultures: [{ id: "CULT003", nom: "Mangue Kent – Bembéréké" }],
      resultatsSoumis: true,
      certificat: "/certificats/DEM002.pdf",
      resultats: {
        CULT003: {
          resultat: "Test de maturité OK, pas de résidu détecté",
          statut: "validée",
        },
      },
    },
  ]);

  const openFormModal = (demande) => {
    setSelectedDemande(demande);
    setResultats({});
    setCertificatFile(null);
    setShowFormModal(true);
  };

  const openViewModal = (demande) => {
    setSelectedDemande(demande);
    setShowViewModal(true);
  };

  const handleChange = (cultureId, field, value) => {
    setResultats((prev) => ({
      ...prev,
      [cultureId]: {
        ...prev[cultureId],
        [field]: value,
      },
    }));
  };

  const handleSubmit = () => {
    const updatedDemandes = demandesEnCours.map((d) =>
      d.id === selectedDemande.id
        ? {
            ...d,
            resultatsSoumis: true,
            certificat: URL.createObjectURL(certificatFile),
            resultats: resultats,
          }
        : d
    );

    setDemandesEnCours(updatedDemandes);
    setShowFormModal(false);
  };

  return (
    <DashboardLayout>
      <UserMenu />
      <h1 className="text-2xl font-bold text-green-900 mt-4 mb-1">Résultats des inspections</h1>
      <p className="text-sm text-gray-600 mb-6">
        Remplissez les résultats ou visualisez les certificats délivrés.
      </p>

      <div className="bg-white rounded shadow p-4 overflow-x-auto">
        <table className="w-full text-sm table-auto">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">ID Demande</th>
              <th className="p-3">Exportateur</th>
              <th className="p-3">Date</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {demandesEnCours.map((demande) => (
              <tr key={demande.id} className="border-t">
                <td className="p-3 font-medium">{demande.id}</td>
                <td className="p-3">{demande.exportateur}</td>
                <td className="p-3">{new Date(demande.date).toLocaleDateString()}</td>
                <td className="p-3 text-center">
                  {demande.resultatsSoumis ? (
                    <button
                      className="bg-gray-600 text-white text-xs px-3 py-1 rounded hover:bg-gray-700"
                      onClick={() => openViewModal(demande)}
                    >
                      Voir résultats
                    </button>
                  ) : (
                    <button
                      className="bg-green-700 text-white text-xs px-3 py-1 rounded hover:bg-green-800"
                      onClick={() => openFormModal(demande)}
                    >
                      Remplir résultats
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal remplissage résultats */}
      {showFormModal && selectedDemande && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
            <h2 className="text-lg font-bold text-green-900 mb-4">
              Résultats – {selectedDemande.id}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="space-y-4"
            >
              {selectedDemande.cultures.map((culture) => (
                <div
                  key={culture.id}
                  className="border border-gray-200 rounded p-3"
                >
                  <p className="font-medium mb-2">{culture.nom}</p>
                  <textarea
                    placeholder="Résultat du test sanitaire"
                    className="w-full border rounded p-2 mb-2"
                    onChange={(e) =>
                      handleChange(culture.id, "resultat", e.target.value)
                    }
                    required
                  />
                  <select
                    className="w-full border rounded p-2"
                    onChange={(e) =>
                      handleChange(culture.id, "statut", e.target.value)
                    }
                    required
                  >
                    <option value="">-- Statut --</option>
                    <option value="validée">Validée</option>
                    <option value="rejetée">Rejetée</option>
                  </select>
                </div>
              ))}

              <div>
                <label className="block font-medium mb-1">Certificat PDF</label>
                <input
                  type="file"
                  accept="application/pdf"
                  required
                  onChange={(e) => setCertificatFile(e.target.files[0])}
                  className="w-full border rounded p-2"
                />
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                  onClick={() => setShowFormModal(false)}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-green-700 text-white hover:bg-green-800"
                >
                  Soumettre
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Voir résultats */}
      {showViewModal && selectedDemande && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
            <h2 className="text-lg font-bold text-green-900 mb-4">
              Résultats soumis – {selectedDemande.id}
            </h2>
            <div className="space-y-4">
              {selectedDemande.cultures.map((culture) => {
                const info = selectedDemande.resultats[culture.id];
                return (
                  <div key={culture.id} className="border rounded p-3">
                    <p className="font-semibold">{culture.nom}</p>
                    <p className="text-sm mt-2 text-gray-700">
                      <span className="font-medium">Résultat:</span> {info?.resultat}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Statut:</span>{" "}
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          info?.statut === "validée"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {info?.statut}
                      </span>
                    </p>
                  </div>
                );
              })}

              {selectedDemande.certificat && (
                <div className="text-right">
                  <a
                    href={selectedDemande.certificat}
                    download={`certificat-${selectedDemande.id}.pdf`}
                    className="text-sm text-blue-600 underline hover:text-blue-800"
                  >
                    Télécharger le certificat PDF
                  </a>
                </div>
              )}

              <div className="text-right mt-4">
                <button
                  onClick={() => setShowViewModal(false)}
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ResultatsInspection;
