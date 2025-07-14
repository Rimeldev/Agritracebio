// src/pages/exportateur/ExportateurValidation.jsx
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import UserMenu from "@/components/UserMenu";
import ValidationModal from "@/components/ValidationModal";
import { CheckCircle } from "lucide-react";

const ExportateurValidation = () => {
  const [selectedCulture, setSelectedCulture] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const mockCultures = [
    {
      id: "1",
      nom: "Ananas Cayenne – Lokossa",
      producteur: "Koffi Dossou",
      dateValidation: "2025-07-12",
    },
    {
      id: "2",
      nom: "Mangue Kent – Bembéréké",
      producteur: "Sani Alphonse",
      dateValidation: "2025-07-10",
    },
  ];

  const openModal = (culture) => {
    setSelectedCulture(culture);
    setShowModal(true);
  };

  const handleSubmitFinalValidation = (cultureId, formData) => {
    console.log("✅ Données envoyées pour la culture ID :", cultureId);
    console.log(formData);
    setShowModal(false);
  };

  return (
    <DashboardLayout>
      <UserMenu farmerName="Exportateur" />

      <div className="mt-4 mb-6">
        <h1 className="text-2xl font-bold text-green-900 mb-1">
          Validation finale des cultures
        </h1>
        <p className="text-sm text-gray-600">
          Remplissez les informations finales pour générer les certificats d’exportation.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
        <table className="min-w-full text-sm border-separate border-spacing-y-2">
          <thead>
            <tr className="text-left text-gray-600">
              <th className="px-4 py-2 bg-gray-50 rounded-l">Culture</th>
              <th className="px-4 py-2 bg-gray-50">Producteur</th>
              <th className="px-4 py-2 bg-gray-50">Date de validation</th>
              <th className="px-4 py-2 bg-gray-50 rounded-r text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {mockCultures.map((culture, index) => (
              <tr
                key={culture.id}
                className={`bg-white hover:bg-green-50 transition shadow-sm ${
                  index % 2 !== 0 ? "bg-gray-50" : ""
                }`}
              >
                <td className="px-4 py-3 font-medium text-gray-800">{culture.nom}</td>
                <td className="px-4 py-3 text-gray-700">{culture.producteur}</td>
                <td className="px-4 py-3 text-gray-700">
                  {new Date(culture.dateValidation).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => openModal(culture)}
                    className="inline-flex items-center gap-1 text-white bg-green-700 hover:bg-green-800 px-3 py-1.5 rounded text-xs"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Valider
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && selectedCulture && (
        <ValidationModal
          culture={selectedCulture}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmitFinalValidation}
        />
      )}
    </DashboardLayout>
  );
};

export default ExportateurValidation;
