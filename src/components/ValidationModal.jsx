import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Dialog } from "@headlessui/react";
import { CheckCircle } from "lucide-react";

const ValidationModal = ({ culture, isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    lieu_depart: "",
    lieu_arrivee: "",
    immatriculation: "",
    chauffeur: "",
    images_camion: null,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (culture) {
      setFormData((prev) => ({
        ...prev,
        lieu_depart: culture.lieu_stockage || "",
        lieu_arrivee: culture.lieu_vente || "",
      }));
    }
  }, [culture]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("culture_id", culture.id);
    data.append("lieu_depart", formData.lieu_depart);
    data.append("lieu_arrivee", formData.lieu_arrivee);
    data.append("immatriculation", formData.immatriculation);
    data.append("chauffeur", formData.chauffeur);
    if (formData.images_camion) {
      data.append("images_camion", formData.images_camion);
    }

    const token = localStorage.getItem("token");
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/exportateur/transports", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Transport enregistré avec succès !");
      onClose();
      onSuccess?.();
    } catch (error) {
      console.error("Erreur lors de l’envoi :", error);
      if (error.response?.status === 401) {
        toast.error("Session expirée. Veuillez vous reconnecter.");
      } else {
        toast.error("Erreur lors de l'enregistrement du transport.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
          <div className="flex justify-center mb-4">
            <CheckCircle className="text-green-500 w-12 h-12" />
          </div>
          <Dialog.Title className="text-lg font-medium text-center mb-4">
            Détails du Transport
          </Dialog.Title>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Lieu de départ</label>
              <input
                type="text"
                name="lieu_depart"
                value={formData.lieu_depart}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Lieu d’arrivée</label>
              <input
                type="text"
                name="lieu_arrivee"
                value={formData.lieu_arrivee}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Immatriculation</label>
              <input
                type="text"
                name="immatriculation"
                value={formData.immatriculation}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Chauffeur</label>
              <input
                type="text"
                name="chauffeur"
                value={formData.chauffeur}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Image du camion</label>
              <input
                type="file"
                name="images_camion"
                accept="image/*"
                onChange={handleChange}
                required
                className="mt-1 block w-full"
              />
            </div>
            <div className="mt-6 text-center">
              <button
                type="submit"
                disabled={loading}
                className={`bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Enregistrement..." : "Valider"}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ValidationModal;
