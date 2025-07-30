import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "@/components/DashboardLayout";
import UserMenu from "@/components/UserMenu";
import ValidationModal from "@/components/ValidationModal";
import { CheckCircle } from "lucide-react";
import QRCode from "qrcode";
import { toast } from "react-toastify";


const handleQrDownload = async (culture) => {
const PC_IP = "192.168.4.4"; // remplace par ton IP
const FRONT_PORT = "5173";    // ou 3000, selon ton serveur
const traceUrl = `http://${PC_IP}:${FRONT_PORT}/trace/${culture.id}`;

  try {
    const qrDataUrl = await QRCode.toDataURL(traceUrl);
    const link = document.createElement("a");
    link.href = qrDataUrl;
    link.download = `qr-code-culture-${culture.id}.png`;
    link.click();
  } catch (err) {
    console.error("Erreur QR:", err);
    toast.error("Erreur génération du code QR.");
  }
};
const ExportateurValidation = () => {
  const [cultures, setCultures] = useState([]);
  const [selectedCulture, setSelectedCulture] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchCulturesValidees = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token manquant.");
        return;
      }

      const res = await axios.get(
        "http://127.0.0.1:5000/api/exportateur/cultures/inspection-validee",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCultures(res.data.data);
    } catch (error) {
      console.error("Erreur lors du chargement des cultures :", error);
    }
  };

  useEffect(() => {
    fetchCulturesValidees();
  }, []);

 const openModal = (culture) => {
  setSelectedCulture(culture);
  setShowModal(true);
};



const handleSuccess = () => {
  fetchCulturesValidees();     // recharge les données
  setShowModal(false);         // ferme la modale après validation
};


  return (
    <DashboardLayout>
      <UserMenu farmerName="Exportateur" />

      <div className="mt-4 mb-6 mx-auto">
        <h1 className="text-2xl font-bold text-green-900 mb-1">
          Validation finale des cultures
        </h1>
        <p className="text-sm text-gray-600">
          Remplissez les informations finales pour obtenir les certificats d’exportation.
        </p>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow mx-auto">
        <table className="w-full table-auto text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 text-left py-3">Culture</th>
              <th className="px-4 text-center py-3">Agriculteur</th>
              <th className="px-4 text-right py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {cultures.map((item, index) => {
  const isValidated = item.transports.length > 0;

  return (
    <tr
      key={item.culture.id}
      className={`${
        index % 2 !== 0 ? "bg-gray-50" : "bg-white"
      } border-t hover:bg-green-50 transition`}
    >
      <td className="px-4 py-3 font-medium text-gray-800">
        {item.culture.nom_culture}
      </td>
      <td className="px-4 py-3 text-center text-gray-700">
        {item.culture.user.prenom} {item.culture.user.nom}
      </td>
      <td className="px-4 text-right py-3">
        {isValidated ? (
          <button
            onClick={() => handleQrDownload(item.culture)}
            className="inline-flex items-center gap-1 text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded text-xs"
          >
            <CheckCircle className="w-4 h-4" />
            Code QR
          </button>
        ) : (
          <button
            onClick={() => openModal(item.culture)}
            className="inline-flex items-center gap-1 text-white bg-green-700 hover:bg-green-800 px-3 py-1.5 rounded text-xs"
          >
            <CheckCircle className="w-4 h-4" />
            Valider
          </button>
        )}
      </td>
    </tr>
  );
})}

          </tbody>
        </table>
      </div>

      {showModal && selectedCulture && (
        <ValidationModal
          culture={selectedCulture}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSuccess={handleSuccess}
        />
      )}
    </DashboardLayout>
  );
};

export default ExportateurValidation;
