// src/pages/exportateur/ExportateurCertificats.jsx
import DashboardLayout from "@/components/DashboardLayout";
import UserMenu from "@/components/UserMenu";
import { Download } from "lucide-react";

const ExportateurCertificats = () => {
  const mockCertificats = [
    {
      id: "REQ001",
      date: "2025-07-10",
      certificatUrl: "/certificats/REQ001.pdf",
    },
    {
      id: "REQ002",
      date: "2025-07-01",
      certificatUrl: "/certificats/REQ002.pdf",
    },
  ];

  return (
    <DashboardLayout>
      <UserMenu farmerName="Exportateur" />
      <div className="mt-4 mb-6">
        <h1 className="text-2xl font-bold text-green-900 mb-1">Mes certificats</h1>
        <p className="text-sm text-gray-600">
          Téléchargez les certificats liés à vos demandes validées.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
        <table className="min-w-full text-sm text-left border-separate border-spacing-y-2">
          <thead>
            <tr className="text-gray-600">
              <th className="px-4 py-2 bg-gray-50 rounded-l">N° Demande</th>
              <th className="px-4 py-2 bg-gray-50">Date de la demande</th>
              <th className="px-4 py-2 bg-gray-50 rounded-r">Action</th>
            </tr>
          </thead>
          <tbody>
            {mockCertificats.map((certif, index) => (
              <tr
                key={certif.id}
                className={`bg-white hover:bg-green-50 shadow-sm transition ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="px-4 py-3 font-medium text-gray-800">{certif.id}</td>
                <td className="px-4 py-3 text-gray-700">
                  {new Date(certif.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <a
                    href={certif.certificatUrl}
                    download
                    className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-3 py-1.5 rounded text-xs"
                  >
                    <Download size={14} />
                    Télécharger
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default ExportateurCertificats;
