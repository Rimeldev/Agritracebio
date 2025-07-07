// pages/Dashboard.jsx
import DashboardLayout from "@/components/DashboardLayout";
import Headerboard from "@/components/Headerboard";
import DataCard from "@/components/DataCard";
import ChartsCarousel from "@/components/ChartsCarousel";
import { useState } from "react";
import UserMenu from "@/components/UserMenu";
import iconTempSol from "@/assets/icons/temp_sol.png";
import iconHumSol from "@/assets/icons/hum_sol.png";
import iconTempAir from "@/assets/icons/temp_air.png";
import iconHumAir from "@/assets/icons/hum_air.png";
import iconPhSol from "@/assets/icons/ph_sol.png";
import iconQualAir from "@/assets/icons/qual_air.png";


const mockChartData = {
  Ananas1: {
    "Température du sol": [
      { date: "14 mai", valeur: 22 },
      { date: "15 mai", valeur: 21 },
      { date: "16 mai", valeur: 23 },
      { date: "17 mai", valeur: 22 },
    ],
    "Température de l’air": [
      { date: "14 mai", valeur: 23 },
      { date: "15 mai", valeur: 22 },
      { date: "16 mai", valeur: 13 },
      { date: "17 mai", valeur: 32 },
    ],
  },
  Ananas2: {
    "Température du sol": [
      { date: "14 mai", valeur: 12 },
      { date: "15 mai", valeur: 11 },
      { date: "16 mai", valeur: 13 },
      { date: "17 mai", valeur: 12 },
    ],
  },
};

const Dashboard = () => {
  const activeCultures = ["Ananas1", "Ananas2"];
  const [selectedCulture, setSelectedCulture] = useState(activeCultures[0]);
  const [selectedDate, setSelectedDate] = useState("2025-05-14");

  const selectedData = mockChartData[selectedCulture]?.[selectedDate] || {};
  const chartDataByParameter = mockChartData[selectedCulture] || {};

 const dataCards = [
  { icon: iconTempSol, label: "Température du sol", key: "temp_sol", value: selectedData.temp_sol ?? "-", unit: "°C" },
  { icon: iconHumSol, label: "Humidité du sol", key: "hum_sol", value: selectedData.hum_sol ?? "-", unit: "%" },
  { icon: iconTempAir, label: "Température de l’air", key: "temp_air", value: selectedData.temp_air ?? "-", unit: "°C" },
  { icon: iconHumAir, label: "Humidité de l’air", key: "hum_air", value: selectedData.hum_air ?? "-", unit: "%" },
  { icon: iconPhSol, label: "pH du sol", key: "ph_sol", value: selectedData.ph_sol ?? "-", unit: "" },
  { icon: iconQualAir, label: "Qualité de l’air", key: "qual_air", value: selectedData.qual_air ?? "-", unit: "" },
];


  return (
    <DashboardLayout>
      <UserMenu farmerName="Agriculteur" />
      <h1 className="text-2xl font-bold text-green-900 mt-4 mb-2">Tableau de bord</h1>

      <Headerboard
        activeCultures={activeCultures}
        selectedCulture={selectedCulture}
        onCultureChange={setSelectedCulture}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />

      {/* Grille des cartes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-6 w-full">
        {dataCards.map((data) => (
          <DataCard
            key={data.key}
            icon={data.icon}
            label={data.label}
            value={data.value}
            unit={data.unit}
          />
        ))}
      </div>

      <ChartsCarousel
        culture={selectedCulture}
        date={selectedDate}
        chartData={chartDataByParameter}
      />
    </DashboardLayout>
  );
};

export default Dashboard;
