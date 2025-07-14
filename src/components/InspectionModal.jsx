import { useState } from "react";

const InspectionModal = ({ isOpen, onClose, onSend, email }) => {
  const [date, setDate] = useState("");
  const [message, setMessage] = useState(
    "Bonjour, nous souhaitons planifier l’inspection de vos cultures pour le..."
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date) {
      alert("Veuillez sélectionner une date.");
      return;
    }

    onSend({ email, date, message });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
        >
          ✕
        </button>
        <h2 className="text-lg font-bold text-green-900 mb-1">Contacter l’exportateur</h2>
        <p className="text-sm text-gray-600 mb-4">
          Planifier la date d’inspection avec AGRI-EXPORT BENIN
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email destinataire</label>
            <input
              type="email"
              value={email}
              readOnly
              className="w-full border p-2 rounded bg-gray-100 text-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Date d’inspection proposée</label>
            <input
              type="date"
              className="w-full border p-2 rounded"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              rows={4}
              className="w-full border p-2 rounded"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded"
            >
              Envoyer l’email
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InspectionModal;
