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
import { getExportateurCultureDonnees } from "@/services/cultureDonneeService";
import { getExportateurCultures } from "@/services/exportateurCultureService";

const ExportateurDashboard = () => {
  const [activeCultures, setActiveCultures] = useState([]);
  const [selectedCulture, setSelectedCulture] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [iotData, setIotData] = useState([]);
  const [cultureInfo, setCultureInfo] = useState(null);

  // 1. Charger les cultures
  useEffect(() => {
    const fetchCultures = async () => {
      try {
        const response = await getExportateurCultures();
        console.log("✅ Cultures récupérées :", response);
        setActiveCultures(response);
      } catch (error) {
        console.error("❌ Erreur lors du chargement des cultures :", error);
      }
    };
    fetchCultures();
  }, []);

  // 2. Définir la culture par défaut
  useEffect(() => {
    if (!selectedCulture && activeCultures.length > 0) {
      const firstCulture = activeCultures[0];
      setSelectedCulture(firstCulture?.id);
      setCultureInfo({ nom_culture: firstCulture.nom_culture });
    }
  }, [activeCultures, selectedCulture]);

  // 3. Charger les données IoT selon la culture et la date
  useEffect(() => {
  const fetchData = async () => {
    if (!selectedCulture) return;

    // 💡 Convertir la date sélectionnée en Date object
    const endDateObj = new Date(`${selectedDate}T23:59:59Z`);
    const startDateObj = new Date(endDateObj.getTime() - 24 * 60 * 60 * 1000); // 24h avant

    const start = startDateObj.toISOString();
    const end = endDateObj.toISOString();

    console.log("📅 Date sélectionnée :", selectedDate);
    console.log("📦 Requête envoyée avec :", {
      cultureId: selectedCulture,
      start,
      end,
    });

    try {
      const result = await getExportateurCultureDonnees(selectedCulture, {
        page: 1,
        perPage: 10,
        startDate: start,
        endDate: end,
      });

      console.log("✅ Données reçues :", result);
      setCultureInfo(result.culture);
      setIotData(result.donnees);
    } catch (error) {
      console.error("❌ Erreur lors du chargement des données :", error);
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
      date: new Date(d.date_mesure).toLocaleDateString("fr-FR"),
      valeur: parseFloat(d.temperature_sol),
    })),
    "Température de l’air": iotData.map((d) => ({
      date: new Date(d.date_mesure).toLocaleDateString("fr-FR"),
      valeur: parseFloat(d.temperature_air),
    })),
    "Humidité du sol": iotData.map((d) => ({
      date: new Date(d.date_mesure).toLocaleDateString("fr-FR"),
      valeur: parseFloat(d.humidite_sol),
    })),
    "Humidité de l’air": iotData.map((d) => ({
      date: new Date(d.date_mesure).toLocaleDateString("fr-FR"),
      valeur: parseFloat(d.humidite_air),
    })),
    "pH du sol": iotData.map((d) => ({
      date: new Date(d.date_mesure).toLocaleDateString("fr-FR"),
      valeur: parseFloat(d.ph_sol),
    })),
    "Qualité de l’air": iotData.map((d) => ({
      date: new Date(d.date_mesure).toLocaleDateString("fr-FR"),
      valeur: parseFloat(d.qualite_air),
    })),
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
