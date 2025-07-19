import DashboardLayout from "@/components/DashboardLayout";
import UserMenu from "@/components/UserMenu";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

const ExportateurCertificats = () => {
  const [certificats, setCertificats] = useState([]);

  useEffect(() => {
    const fetchCertificats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/exportateur/inspections", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = res.data?.data || [];

        const formated = data.map((item) => ({
          id: item.demande_id.id,
          date: item.demande_id.date_demande,
          certificatUrl: item.document,
        }));

        setCertificats(formated);
      } catch (error) {
        console.error("Erreur lors du chargement des certificats :", error);
      }
    };

    fetchCertificats();
  }, []);

  return (
    <DashboardLayout>
      <UserMenu farmerName="Exportateur" />
      <div className="mt-4 mb-6">
        <h1 className="text-2xl font-bold text-green-900 mb-1">Mes certificats</h1>
        <p className="text-sm text-gray-600">
          Téléchargez les certificats liés à vos demandes validées.
        </p>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full table-auto text-sm">
          <thead className="bg-gray-100 text-center">
            <tr>
              <th className="px-6 py-3 rounded-l">N° Demande</th>
              <th className="px-6 py-3">Date de la demande</th>
              <th className="px-6 py-3 rounded-r">Action</th>
            </tr>
          </thead>
          <tbody>
            {certificats.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-6 text-gray-500">
                  Aucun certificat disponible pour l’instant.
                </td>
              </tr>
            ) : (
              certificats.map((certif, index) => (
                <tr
                  key={certif.id}
                  className={`${
                    index % 2 !== 0 ? "bg-gray-50" : "bg-white"
                  } border-t hover:bg-green-50 transition`}
                >
                  <td className="px-6 py-3 font-medium text-gray-800 text-center" >{`DEM-${new Date(certif.date).toLocaleDateString('fr-FR').replace(/\//g, '')}`}</td>

                  <td className="px-6 py-3 text-gray-700 text-center">
                    {new Date(certif.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-3 text-center">
                    <a
                      href={`http://localhost:5000/${certif.certificatUrl}`}
                      download
                      className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-3 py-1.5 rounded text-xs justify-center"
                    >
                      <Download size={14} />
                      Télécharger
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default ExportateurCertificats;
