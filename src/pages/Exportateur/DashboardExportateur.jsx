import Sidebar from "@/components/Sidebar";

export default function DashboardExportateur() {
  return (
    <div className="flex">
      {/* Barre latérale spécifique à l’exportateur */}
      <Sidebar userType="exporter" />

      {/* Contenu principal */}
      <main className="flex-1 p-6 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Tableau de bord Exportateur</h1>

        {/* Tu peux ensuite intégrer ici les différentes cartes : 
            - Nombre de lots en attente
            - Statut des inspections
            - Certificats disponibles, etc.
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Exemple de carte */}
          <div className="bg-white p-4 shadow rounded-lg">
            <h2 className="text-lg font-semibold">Lots en cours</h2>
            <p className="text-2xl font-bold text-blue-600">12</p>
          </div>

          <div className="bg-white p-4 shadow rounded-lg">
            <h2 className="text-lg font-semibold">Inspections en attente</h2>
            <p className="text-2xl font-bold text-yellow-500">3</p>
          </div>

          <div className="bg-white p-4 shadow rounded-lg">
            <h2 className="text-lg font-semibold">Certificats disponibles</h2>
            <p className="text-2xl font-bold text-green-600">5</p>
          </div>
        </div>
      </main>
    </div>
  );
}
