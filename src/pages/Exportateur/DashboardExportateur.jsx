import DashboardLayout from "@/components/DashboardLayout";
import Headerboard from "@/components/Headerboard";
import DataCard from "@/components/DataCard";
import ChartsCarousel from "@/components/ChartsCarousel";
import UserMenu from "@/components/UserMenu";
import iconTempSol from "@/assets/icons/temp_sol.png";
import iconHumSol from "@/assets/icons/hum_sol.png";
import iconTempAir from "@/assets/icons/temp_air.png";
import iconHumAir from "@/assets/icons/hum_air.png";
import iconPhSol from "@/assets/icons/ph_sol.png";
import iconQualAir from "@/assets/icons/qual_air.png";
import { useEffect, useState } from "react";

const ExportateurDashboard = () => {
  const [activeCultures, setActiveCultures] = useState([
    { id: "fake-id-001", nom_culture: "Ananas – Lokossa" },
    { id: "fake-id-002", nom_culture: "Mangue – Bembéréké" },
  ]);
  const [selectedCulture, setSelectedCulture] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [iotData, setIotData] = useState([]);
  const [cultureInfo, setCultureInfo] = useState(null);

  useEffect(() => {
    if (!selectedCulture && activeCultures.length > 0) {
      setSelectedCulture(activeCultures[0]?.id);
      setCultureInfo({ nom_culture: activeCultures[0].nom_culture });
    }
  }, [activeCultures, selectedCulture]);

  const dataCards = [
    {
      icon: iconTempSol,
      label: "Température du sol",
      key: "temperature_sol",
      value: "-",
      unit: "°C",
    },
    {
      icon: iconHumSol,
      label: "Humidité du sol",
      key: "humidite_sol",
      value: "-",
      unit: "%",
    },
    {
      icon: iconTempAir,
      label: "Température de l’air",
      key: "temperature_air",
      value: "-",
      unit: "°C",
    },
    {
      icon: iconHumAir,
      label: "Humidité de l’air",
      key: "humidite_air",
      value: "-",
      unit: "%",
    },
    {
      icon: iconPhSol,
      label: "pH du sol",
      key: "ph_sol",
      value: "-",
      unit: "",
    },
    {
      icon: iconQualAir,
      label: "Qualité de l’air",
      key: "qualite_air",
      value: "-",
      unit: "",
    },
  ];

  const chartDataByParameter = {
    "Température du sol": [],
    "Température de l’air": [],
  };

  return (
    <DashboardLayout>
      <UserMenu farmerName="Exportateur" />
      <h1 className="text-2xl font-bold text-green-900 mt-4 mb-2">
        Tableau de bord {cultureInfo?.nom_culture ? `– ${cultureInfo.nom_culture}` : ""}
      </h1>
<p className="text-green-900 text-sm mb-4">
    Visualisez les conditions de culture des ananas auxquels vous êtes affilié.
  </p>
      <Headerboard
        activeCultures={activeCultures}
        selectedCulture={selectedCulture}
        onCultureChange={(id) => {
          const culture = activeCultures.find((c) => c.id === id);
          setSelectedCulture(id);
          setCultureInfo({ nom_culture: culture?.nom_culture });
        }}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />

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
        culture={cultureInfo?.nom_culture || ""}
        date={selectedDate}
        chartData={chartDataByParameter}
      />
    </DashboardLayout>
  );
};

export default ExportateurDashboard;
