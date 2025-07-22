import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid
} from "recharts";

const parametres = [
  "Température du sol",
  "Humidité du sol",
  "Humidité de l’air",
  "pH du sol",
  "Qualité de l’air"
];

export default function DashboardGraph({ chartData }) {
  const [parametreActif, setParametreActif] = useState("Température du sol");
  const data = chartData?.[parametreActif] || [];

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      
      {/* Onglets des paramètres */}
      <div className="flex flex-wrap gap-3 mb-6">
        {parametres.map((param) => (
          <button
            key={param}
            onClick={() => setParametreActif(param)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
              param === parametreActif
                ? "bg-green-700 text-white shadow-sm"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300"
            }`}
          >
            {param}
          </button>
        ))}
      </div>

      {/* Graphique */}
      <div className="w-full h-[320px]">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          Évolution — {parametreActif}
        </h2>
        {data.length === 0 ? (
          <p className="text-sm text-gray-500">Aucune donnée disponible pour ce paramètre.</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="date" stroke="#555" />
              <YAxis stroke="#555" />
              <Tooltip contentStyle={{ borderRadius: "8px" }} />
              <Legend />
              <Line
                type="monotone"
                dataKey="valeur"
                stroke="#15803d" // vert foncé
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
