import { useState } from "react";

const ValidationModal = ({ culture, isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    date_recolte: "",
    destination: "",
    immatriculation: "",
    chauffeur: "",
    lieu_depart: "",
    lieu_arrivee: "",
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(culture.id, formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-brightness-90 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
        {/* Bouton de fermeture */}
        <button
          className="absolute top-3 right-4 text-gray-400 hover:text-red-600 text-xl font-bold"
          onClick={onClose}
        >
          ×
        </button>

        {/* Titre */}
        <h2 className="text-lg font-semibold text-green-900 mb-1">
          Validation finale – {culture.nom}
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Remplissez les informations finales pour générer le certificat
        </p>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date de récolte
              </label>
              <input
                type="date"
                name="date_recolte"
                className="border p-2 rounded w-full"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Destination
              </label>
              <input
                type="text"
                name="destination"
                placeholder="Pays/ville de destination"
                className="border p-2 rounded w-full"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Immatriculation véhicule
              </label>
              <input
                type="text"
                name="immatriculation"
                placeholder="Ex: AB-1234-CD"
                className="border p-2 rounded w-full"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Chauffeur
              </label>
              <input
                type="text"
                name="chauffeur"
                placeholder="Nom du chauffeur"
                className="border p-2 rounded w-full"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lieu de départ
              </label>
              <input
                type="text"
                name="lieu_depart"
                placeholder="Adresse de départ"
                className="border p-2 rounded w-full"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lieu d’arrivée
              </label>
              <input
                type="text"
                name="lieu_arrivee"
                placeholder="Adresse d’arrivée"
                className="border p-2 rounded w-full"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Photo du contenu
            </label>
            <input
              type="file"
              name="photo"
              className="border p-2 rounded w-full"
              onChange={handleChange}
              required
            />
          </div>

          {/* Boutons */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              onClick={onClose}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-green-700 text-white hover:bg-green-800"
            >
              Valider la culture
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ValidationModal;
