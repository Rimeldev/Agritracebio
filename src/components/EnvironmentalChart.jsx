import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  BadgeCheck,
  Truck,
  ThermometerSun,
  CheckCircle,
  FileText,
} from "lucide-react";

const EnvironmentalChart = ({ donneesEnvironnementales }) => {
  const [selectedParam, setSelectedParam] = useState("temperature_air");

  const paramLabels = {
    temperature_air: "Température Air (°C)",
    temperature_sol: "Température Sol (°C)",
    humidite_air: "Humidité Air (%)",
    humidite_sol: "Humidité Sol (%)",
    ph_sol: "pH du sol",
    qualite_air: "Qualité de l'air"
  };

  const formatDate = (iso) => new Date(iso).toLocaleDateString();

  const values = donneesEnvironnementales.map((d) => d[selectedParam]);
  const data = donneesEnvironnementales.map((d) => ({
    date: formatDate(d.date_mesure),
    value: d[selectedParam]
  }));

  const min = Math.min(...values).toFixed(2);
  const max = Math.max(...values).toFixed(2);
  const avg = (values.reduce((sum, v) => sum + v, 0) / values.length).toFixed(2);

  return (
    <div className="p-4 bg-white shadow">
     <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
  <ThermometerSun size={20} className="text-green-700" />
  Conditions environnementales (graphe)
</h2>


      {/* Boutons de sélection de paramètre */}
      <div className="flex flex-wrap gap-2 mb-4">
        {Object.keys(paramLabels).map((param) => (
          <button
            key={param}
            className={`px-3 py-1 rounded ${
              selectedParam === param
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setSelectedParam(param)}
          >
            {paramLabels[param]}
          </button>
        ))}
      </div>

      {/* Graphique */}
      <div className="w-full h-50 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis domain={["auto", "auto"]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#4caf50"
              strokeWidth={2}
              dot
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Min - Moy - Max */}
      <div className="flex justify-around text-sm font-medium text-gray-700">
        <div>
          <span className="font-semibold">Min :</span> {min}
        </div>
        <div>
          <span className="font-semibold">Moy :</span> {avg}
        </div>
        <div>
          <span className="font-semibold">Max :</span> {max}
        </div>
      </div>
    </div>
  );
};

export default EnvironmentalChart;
