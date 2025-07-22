import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import UserMenu from "@/components/UserMenu";
import { getAllDemandesInspection } from "@/services/controleurDemandeService";
import { envoyerResultatInspection } from "@/services/inspectionResultService";
import { toast } from "react-toastify";

const ResultatsInspection = () => {
  const [selectedDemande, setSelectedDemande] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [certificatFile, setCertificatFile] = useState(null);
  const [resultats, setResultats] = useState({});
  const [filterStatut, setFilterStatut] = useState("all");
  const [demandesEnCours, setDemandesEnCours] = useState([]);

  const statutColors = {
    en_attente: "bg-red-100 text-red-700",
    en_cours: "bg-yellow-100 text-yellow-700",
    validée: "bg-green-100 text-green-700",
    rejetée: "bg-red-100 text-red-700",
  };

  useEffect(() => {
  const fetchDemandes = async () => {
    try {
      const allDemandes = await getAllDemandesInspection();
      console.log("🔍 Données brutes reçues du backend :", JSON.stringify(allDemandes, null, 2)); // 👈 AJOUTE CETTE LIGNE

      const sansEnAttente = allDemandes.filter(
        (demande) => demande.statut !== "en_attente"
      );

      const formatees = sansEnAttente.map((d, index) => {
        const allValid = Object.values(d.resultats || {}).every(
          (r) => r.statut === "validée"
        );
        const resultatsSoumis = Object.values(d.resultats || {}).some(
          (r) => r?.statut
        );

        return {
          ...d,
          numero: `DEM${(index + 1).toString().padStart(3, "0")}`,
          nbCultures: d.cultures?.length ?? 0,
          exportateur: `${d.exportateur_id?.prenom ?? ""} ${d.exportateur_id?.nom ?? ""}`,
          date: d.date_demande,
          resultatsSoumis,
          statut: resultatsSoumis ? (allValid ? "validée" : "rejetée") : "en_cours",
        };
      });

      setDemandesEnCours(formatees);
    } catch (error) {
      console.error("Erreur de chargement des demandes :", error);
    }
  };

  fetchDemandes();
}, []);


  // Ajout du numéro formaté et nombre cultures
  const demandesAvecNumero = demandesEnCours.map((d, index) => ({
    ...d,
    numero: `DEM${(index + 1).toString().padStart(3, "0")}`,
    nbCultures: d.cultures?.length ?? 0,
  }));

  // Calcul du statut selon resultatsSoumis
  const demandesFiltrees = demandesAvecNumero.filter((demande) => {
    let statut = "en_cours";
    if (demande.resultatsSoumis) {
      const allValid = Object.values(demande.resultats || {}).every(
        (r) => r.statut === "validée"
      );
      statut = allValid ? "validée" : "rejetée";
    }

    if (filterStatut === "all") return true;
    return filterStatut === statut;
  });

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



const handleSubmit = async () => {
  try {
    const payload = {
      demande_id: selectedDemande._id ?? selectedDemande.id,
      resultats: resultats,
      statut: resultats.null?.statut,
      document: certificatFile,
    };

    const response = await envoyerResultatInspection(payload);

    // Optionnel : affichage ou mise à jour de l'UI
    console.log("Réponse API :", response);

    const updatedDemandes = demandesEnCours.map((d) =>
      (d._id ?? d.id) === payload.demande_id
        ? {
            ...d,
            resultatsSoumis: true,
            certificat: response.chemin_document || null, // si renvoyé
            resultats: resultats,
          }
        : d
    );

    setDemandesEnCours(updatedDemandes);
    setShowFormModal(false);
toast.success("Résultats soumis avec succès !");
  } catch (error) {
    console.error("Erreur lors de l’envoi des résultats :", error);
    toast.error("Échec de l’envoi. Veuillez réessayer.");
  }
};

  return (
    <DashboardLayout>
      <UserMenu />

      <h1 className="text-2xl font-bold text-green-900 mt-4 mb-1">
        Résultats des inspections
      </h1>
      <p className="text-sm text-gray-600 mb-4">
        Remplissez les résultats ou visualisez les certificats délivrés.
      </p>

      {/* Filtre statut */}
      <div className="mb-4">
        <label htmlFor="filterStatut" className="mr-2 font-medium">
          Filtrer par statut :
        </label>
        <select
          id="filterStatut"
          value={filterStatut}
          onChange={(e) => setFilterStatut(e.target.value)}
          className="border rounded p-1"
        >
          <option value="all">Tous</option>
          <option value="en_cours">En cours</option>
          <option value="validée">Validée</option>
          <option value="rejetée">Rejetée</option>
        </select>
      </div>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-sm table-auto">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">N° Demande</th>
              <th className="p-3">Exportateur</th>
              <th className="p-3">Date</th>
              <th className="p-3">Nb cultures</th>
              <th className="p-3">Statut</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {demandesFiltrees.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center p-4 text-gray-500">
                  Aucun résultat trouvé
                </td>
              </tr>
            )}
            {demandesFiltrees.map((demande) => {
              let statut = "en_cours";
              if (demande.resultatsSoumis) {
                const allValid = Object.values(demande.resultats || {}).every(
                  (r) => r.statut === "validée"
                );
                statut = allValid ? "validée" : "rejetée";
              }

              return (
                <tr key={demande._id ?? demande.id} className="border-t">
                  <td className="p-3 font-medium">{demande.numero}</td>
                  <td className="p-3">{demande.exportateur}</td>
                  <td className="p-3">
                    {new Date(demande.date).toLocaleDateString()}
                  </td>
                  <td className="p-3">{demande.nbCultures}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        statutColors[statut] || "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {statut}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    {statut === "validée" || statut === "rejetée" ? (
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
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal remplissage résultats */}
      {showFormModal && selectedDemande && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
            <h2 className="text-lg font-bold text-green-900 mb-4">
              Résultats – {selectedDemande.numero} {/* affichage numéro */}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="space-y-4"
            >
              <div className="border border-gray-200 rounded p-3">
                <label className="block font-medium mb-1">Résultat global</label>
                <textarea
                  placeholder="Résultat de l’inspection"
                  className="w-full border rounded p-2 mb-2"
                  value={resultats.null?.resultat || ""}
                  onChange={(e) => handleChange(null, "resultat", e.target.value)}
                  required
                />

                <label className="block font-medium mb-1">Statut</label>
                <select
                  className="w-full border rounded p-2"
                  value={resultats.null?.statut || ""}
                  onChange={(e) => handleChange(null, "statut", e.target.value)}
                  required
                >
                  <option value="">-- Statut --</option>
                  <option value="validée">Validée</option>
                  <option value="rejetée">Rejetée</option>
                </select>
              </div>

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
     {/* Modal Voir résultats */}
{showViewModal && selectedDemande && (
  <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
      <h2 className="text-lg font-bold text-green-900 mb-4">
        Résultats soumis – {selectedDemande.numero}
      </h2>

      {/* Statut global calculé */}
      {(() => {
        let statut = "en_cours";
        if (selectedDemande.resultatsSoumis) {
          const allValid = Object.values(selectedDemande.resultats || {}).every(
            (r) => r.statut === "validée"
          );
          statut = allValid ? "validée" : "rejetée";
        }
        return (
          <p>
            <strong>Statut :</strong>{" "}
            <span
              className={`px-2 py-1 text-xs font-semibold rounded-full ${
                statut === "validée"
                  ? "bg-green-100 text-green-700"
                  : statut === "rejetée"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {statut}
            </span>
          </p>
        );
      })()}

      {/* Résultat global */}
      <div className="mt-4">
        <p className="font-semibold">Résultat global :</p>
        <p className="whitespace-pre-wrap">{selectedDemande.resultats?.null?.resultat || "Aucun résultat"}</p>
      </div>

      {/* Lien certificat */}
      {selectedDemande.certificat && (
        <div className="mt-4 text-right">
          <a
            href={selectedDemande.certificat}
            download={`certificat-${selectedDemande.numero}.pdf`}
            className="text-sm text-blue-600 underline hover:text-blue-800"
            target="_blank"
            rel="noopener noreferrer"
          >
            Télécharger le certificat PDF
          </a>
        </div>
      )}

      <div className="text-right mt-6">
        <button
          onClick={() => setShowViewModal(false)}
          className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
        >
          Fermer
        </button>
      </div>
    </div>
  </div>
)}
    </DashboardLayout>
  );
};

export default ResultatsInspection;
