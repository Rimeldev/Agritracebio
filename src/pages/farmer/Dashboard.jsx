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
import { getCultureDashboard } from "@/services/getCultureDashboardService";
import { getMyCultures } from "@/services/getMyCulturesService";

const Dashboard = () => {
  const [activeCultures, setActiveCultures] = useState([
  ]);
  const [selectedCulture, setSelectedCulture] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10)); // format YYYY-MM-DD
  const [iotData, setIotData] = useState([]);
  const [cultureInfo, setCultureInfo] = useState(null);

  useEffect(() => {
  if (!selectedCulture && activeCultures.length > 0) {
    setSelectedCulture(activeCultures[0]?.id);
  }
}, [activeCultures, selectedCulture]);


  useEffect(() => {
  const fetchCultures = async () => {
    try {
      const response = await getMyCultures(); // à créer ou adapter dans services
      setActiveCultures(response); // ou response.data selon l’API
    } catch (error) {
      console.error("Erreur lors du chargement des cultures :", error);
    }
  };
  fetchCultures();
}, []);


  useEffect(() => {
    const fetchData = async () => {
      if (!selectedCulture) return;

      try {
        const start = `${selectedDate}T00:00:00`;
        const end = `${selectedDate}T23:59:59`;
        const result = await getCultureDashboard(selectedCulture, {
          page: 1,
          perPage: 10,
          
        });

        setCultureInfo(result.culture);
        setIotData(result.donnees);
      } catch (error) {
        console.error("Erreur lors du chargement des données du dashboard :", error);
      }
    };

    fetchData();
  }, [selectedCulture, selectedDate]);

  const latestData = iotData.length > 0 ? iotData[0] : {};

  const dataCards = [
    { icon: iconTempSol, label: "Température du sol", key: "temperature_sol", value: latestData.temperature_sol ?? "-", unit: "°C" },
    { icon: iconHumSol, label: "Humidité du sol", key: "humidite_sol", value: latestData.humidite_sol ?? "-", unit: "%" },
    { icon: iconTempAir, label: "Température de l’air", key: "temperature_air", value: latestData.temperature_air ?? "-", unit: "°C" },
    { icon: iconHumAir, label: "Humidité de l’air", key: "humidite_air", value: latestData.humidite_air ?? "-", unit: "%" },
    { icon: iconPhSol, label: "pH du sol", key: "ph_sol", value: latestData.ph_sol ?? "-", unit: "" },
    { icon: iconQualAir, label: "Qualité de l’air", key: "qualite_air", value: latestData.qualite_air ?? "-", unit: "" },
  ];

  const chartDataByParameter = {
  "Température du sol": iotData.map((d) => ({
    date: new Date(d.date_creation).toLocaleDateString("fr-FR"),
    valeur: parseFloat(d.temperature_sol),
  })),
  "Température de l’air": iotData.map((d) => ({
    date: new Date(d.date_creation).toLocaleDateString("fr-FR"),
    valeur: parseFloat(d.temperature_air),
  })),
  "Humidité du sol": iotData.map((d) => ({
    date: new Date(d.date_creation).toLocaleDateString("fr-FR"),
    valeur: parseFloat(d.humidite_sol),
  })),
  "Humidité de l’air": iotData.map((d) => ({
    date: new Date(d.date_creation).toLocaleDateString("fr-FR"),
    valeur: parseFloat(d.humidite_air),
  })),
  "pH du sol": iotData.map((d) => ({
    date: new Date(d.date_creation).toLocaleDateString("fr-FR"),
    valeur: parseFloat(d.ph_sol),
  })),
  "Qualité de l’air": iotData.map((d) => ({
    date: new Date(d.date_creation).toLocaleDateString("fr-FR"),
    valeur: parseFloat(d.qualite_air),
  })),
};


  return (
    <DashboardLayout>
      <UserMenu farmerName="Agriculteur" />
      <h1 className="text-2xl font-bold text-green-900 mt-4 mb-2">
        Tableau de bord {cultureInfo?.nom_culture ? `– ${cultureInfo.nom_culture}` : ""}
      </h1>

      <Headerboard
        activeCultures={activeCultures}
        selectedCulture={selectedCulture}
        onCultureChange={setSelectedCulture}
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

export default Dashboard;
