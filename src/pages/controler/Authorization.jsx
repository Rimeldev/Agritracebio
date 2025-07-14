import DashboardLayout from "@/components/DashboardLayout";
import DemandeAttenteIcon from "@/assets/icons/demandeattente.png";
import DemandeApprouveeIcon from "@/assets/icons/demandeapprouvee.png";
import InspectionIcon from "@/assets/icons/inspection0.png";
import CertificatIcon from "@/assets/icons/certificatIcon.png";
import UserMenu from "@/components/UserMenu";

const Authorization = () => {
  return (
    <DashboardLayout>
     <UserMenu farmerName="Controleur" /> 
      <main className="p-6 space-y-6">
       

        {/* Cartes Statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: "Demandes en attente",
              value: 1,
              color: "text-yellow-500",
              icon: DemandeAttenteIcon,
            },
            {
              label: "Demandes approuvées",
              value: 1,
              color: "text-green-600",
              icon: DemandeApprouveeIcon,
            },
            {
              label: "Inspections programmées",
              value: 1,
              color: "text-blue-600",
              icon: InspectionIcon,
            },
            {
              label: "Certificats délivrés",
              value: 0,
              color: "text-gray-500",
              icon: CertificatIcon,
            },
          ].map(({ label, value, color, icon }) => (
            <div
              key={label}
              className="bg-white shadow rounded-lg p-4 flex items-center justify-between"
            >
              <div>
                <h4 className="text-sm text-gray-600">{label}</h4>
                <p className={`text-2xl font-bold ${color}`}>{value}</p>
              </div>
              <img src={icon} alt={label} className="w-10 h-10" />
            </div>
          ))}
        </div>
      </main>
    </DashboardLayout>
  );
};

export default Authorization;
