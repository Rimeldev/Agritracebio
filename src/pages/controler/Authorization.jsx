import DashboardLayout from "@/components/DashboardLayout";
import UserMenu from "@/components/UserMenu";
import {
  ClipboardList,
  Clock,
  CheckCircle,
  FileCheck2,
} from "lucide-react";

const ControleurDashboard = () => {
  const stats = [
    {
      label: "Total demandes reçues",
      value: 18,
      icon: <ClipboardList className="w-6 h-6 text-blue-700" />,
      color: "text-blue-700",
    },
    {
      label: "Demandes en cours",
      value: 6,
      icon: <Clock className="w-6 h-6 text-yellow-600" />,
      color: "text-yellow-600",
    },
    {
      label: "Demandes traitées",
      value: 12,
      icon: <CheckCircle className="w-6 h-6 text-green-600" />,
      color: "text-green-600",
    },
    {
      label: "Certificats émis",
      value: 9,
      icon: <FileCheck2 className="w-6 h-6 text-gray-700" />,
      color: "text-gray-700",
    },
  ];

  return (
    <DashboardLayout>
      <UserMenu />
      <div className="mt-4 mb-6">
        <h1 className="text-2xl font-bold text-green-900">Tableau de bord</h1>
        <p className="text-sm text-gray-600">
          Vue d’ensemble des activités d’inspection sanitaire.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-lg shadow p-4 flex items-center justify-between"
          >
            <div>
              <h4 className="text-sm text-gray-600">{stat.label}</h4>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
            <div>{stat.icon}</div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default ControleurDashboard;
