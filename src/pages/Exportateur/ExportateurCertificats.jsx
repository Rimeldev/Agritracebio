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

      <div className="overflow-x-auto bg-white rounded shadow ">
        <table className="w-full table-auto text-sm">
          <thead className="bg-gray-100 text-center">
            <tr>
              <th className="px-6 py-3 rounded-l">N° Demande</th>
              <th className="px-6 py-3">Date de la demande</th>
              <th className="px-6 py-3 rounded-r">Action</th>
            </tr>
          </thead>
          <tbody>
            {mockCertificats.map((certif, index) => (
              <tr
                key={certif.id}
                className={`${index % 2 !== 0 ? "bg-gray-50" : "bg-white"} border-t hover:bg-green-50 transition`}
              >
                <td className="px-6 py-3 font-medium text-gray-800 text-center">{certif.id}</td>
                <td className="px-6 py-3 text-gray-700 text-center">{new Date(certif.date).toLocaleDateString()}</td>
                <td className="px-6 py-3 text-center">
                  <a
                    href={certif.certificatUrl}
                    download
                    className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-3 py-1.5 rounded text-xs justify-center"
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
