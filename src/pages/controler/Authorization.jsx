import Sidebar from "@/components/Sidebar";
import HeaderAuthorization from "@/components/HeaderAuthorization";
import DemandeAttenteIcon from "@/assets/icons/demandeattente.png";
import DemandeApprouveeIcon from "@/assets/icons/demandeapprouvee.png";
import InspectionIcon from "@/assets/icons/inspection0.png";
import CertificatIcon from "@/assets/icons/certificatIcon.png";



const Authorization = () => {
  return (
    <div className="flex">
      <Sidebar userType="authority" />
      <main className="flex-1 p-6 space-y-6">
        <HeaderAuthorization authorityName="Inspecteur K. Traoré" />

        {/* Cartes récapitulatives */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
           {/* Demandes en attente */}
  <div className="bg-white shadow rounded-lg p-4 flex items-center justify-between">
    <div>
      <h4 className="text-gray-600">Demandes en attente</h4>
      <p className="text-2xl font-semibold text-yellow-500">1</p>
    </div>
    <img src={DemandeAttenteIcon} alt="Demande attente" className="w-10 h-10" />
  </div>

  {/* Demandes approuvées */}
  <div className="bg-white shadow rounded-lg p-4 flex items-center justify-between">
    <div>
      <h4 className="text-gray-600">Demandes approuvées</h4>
      <p className="text-2xl font-semibold text-green-600">1</p>
    </div>
    <img src={DemandeApprouveeIcon} alt="Demande approuvée" className="w-10 h-10" />
  </div>

  {/* Inspections programmées */}
  <div className="bg-white shadow rounded-lg p-4 flex items-center justify-between">
    <div>
      <h4 className="text-gray-600">Inspections programmées</h4>
      <p className="text-2xl font-semibold text-blue-600">1</p>
    </div>
    <img src={InspectionIcon} alt="Inspection" className="w-10 h-10" />
  </div>

  {/* Certificats délivrés (sans icône, ou tu peux m’en fournir une aussi) */}
  <div className="bg-white shadow rounded-lg p-4 flex items-center justify-between">
    <div>
      <h4 className="text-gray-600">Certificats délivrés</h4>
      <p className="text-2xl font-semibold text-gray-500">0</p>
    </div>
   <img src={CertificatIcon} alt="Certificat" className="w-10 h-10" />
  </div>
        </div>

        {/* Onglets */}
        <div className="flex border-b">
          <button className="px-4 py-2 font-medium text-green-800 border-b-3 border-green-600">
            Demandes d'autorisation
          </button>
          <button className="px-4 py-2 text-gray-600 hover:text-green-800">
            Inspections
          </button>
        </div>

        {/* Tableau des demandes */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-2">
            Demandes d'autorisation de mise sur le marché
          </h3>
          <p className="text-gray-500 mb-4">
            Gérez les demandes soumises par les producteurs
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-sm">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Producteur</th>
                  <th className="px-4 py-2">Culture</th>
                  <th className="px-4 py-2">Superficie</th>
                  <th className="px-4 py-2">Localisation</th>
                  <th className="px-4 py-2">Date de soumission</th>
                  <th className="px-4 py-2">Statut</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    id: "REQ-001",
                    name: "Luc Bylkt ZAVKON",
                    culture: "Ananas Pain de Sucre",
                    surface: "2.5 hectares",
                    location: "Allada, Atlantique",
                    date: "2025-01-15",
                    status: "En attente",
                    color: "bg-yellow-100 text-yellow-600",
                  },
                  {
                    id: "REQ-002",
                    name: "Marie KOKOSSI",
                    culture: "Ananas Cayenne",
                    surface: "3.2 hectares",
                    location: "Toffo, Atlantique",
                    date: "2025-01-10",
                    status: "Approuvé",
                    color: "bg-green-100 text-green-600",
                  },
                  {
                    id: "REQ-003",
                    name: "Jean AGBOKOU",
                    culture: "Ananas MD2",
                    surface: "1.8 hectares",
                    location: "Zè, Atlantique",
                    date: "2025-01-08",
                    status: "Rejeté",
                    color: "bg-red-100 text-red-600",
                  },
                ].map((req) => (
                  <tr key={req.id} className="border-b">
                    <td className="px-4 py-2">{req.id}</td>
                    <td className="px-4 py-2">{req.name}</td>
                    <td className="px-4 py-2">{req.culture}</td>
                    <td className="px-4 py-2">{req.surface}</td>
                    <td className="px-4 py-2">{req.location}</td>
                    <td className="px-4 py-2">{req.date}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${req.color}`}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <button className="px-3 py-1 border rounded text-sm text-blue-600 border-blue-600 hover:bg-blue-50">
                        Examiner
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Authorization;
