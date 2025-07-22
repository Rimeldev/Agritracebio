import Headerboard from "@/components/Headerboard";
import DataCard from "@/components/DataCard";
import ChartsCarousel from "@/components/ChartsCarousel";

import iconTempSol from "@/assets/icons/temp_sol.png";
import iconHumSol from "@/assets/icons/hum_sol.png";
import iconTempAir from "@/assets/icons/temp_air.png";
import iconHumAir from "@/assets/icons/hum_air.png";
import iconPhSol from "@/assets/icons/ph_sol.png";
import iconQualAir from "@/assets/icons/qual_air.png";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCulturesByExportateurId } from "@/services/controleurDemandeService";

const ExportateurDashboardView = () => {
  const { exportateur_id } = useParams();
  const [activeCultures, setActiveCultures] = useState([]);
  const [selectedCulture, setSelectedCulture] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const [exportateurNom, setExportateurNom] = useState("");

  useEffect(() => {
     let interval;
    const fetchData = async () => {
      try {
        if (!exportateur_id) {
          console.warn("exportateur_id est undefined");
          return;
        }

        const res = await getCulturesByExportateurId(exportateur_id);
        const cultures = res?.data || [];

        setActiveCultures(cultures);

        // Récupère le nom de l'exportateur à partir de la première culture
        if (cultures.length > 0) {
          const nom = `${cultures[0].user?.prenom || ""} ${cultures[0].user?.nom || ""}`.trim();
          setExportateurNom(nom);
          setSelectedCulture(cultures[0]);
        }
      } catch (error) {
        console.error("❌ Erreur chargement cultures :", error);
      }
    };

    fetchData(); // 1er appel immédiat
  interval = setInterval(fetchData, 1000); // toutes les 5 secondes

  return () => clearInterval(interval); 
  }, [exportateur_id]);

  // Données environnementales
  const iotData = selectedCulture?.donnees_environnementales || [];
  const latestData = iotData.length > 0 ? iotData[0] : {};

  const dataCards = [
    { icon: iconTempSol, label: "Température du sol", key: "temperature_sol", value: latestData.temperature_sol ?? "Non disponible", unit: "°C" },
    { icon: iconHumSol, label: "Humidité du sol", key: "humidite_sol", value: latestData.humidite_sol ?? "Non disponible", unit: "%" },
    { icon: iconTempAir, label: "Température de l’air", key: "temperature_air", value: latestData.temperature_air ?? "Non disponible", unit: "°C" },
    { icon: iconHumAir, label: "Humidité de l’air", key: "humidite_air", value: latestData.humidite_air ?? "Non disponible", unit: "%" },
    { icon: iconPhSol, label: "pH du sol", key: "ph_sol", value: latestData.ph_sol ?? "Non disponible", unit: "" },
    { icon: iconQualAir, label: "Qualité de l’air", key: "qualite_air", value: latestData.qualite_air ?? "Non disponible", unit: "" },
  ];

  const chartDataByParameter = {
    "Température du sol": iotData.map((d) => ({ date: new Date(d.date_mesure).toLocaleDateString("fr-FR"), valeur: parseFloat(d.temperature_sol) || 0 })),
    "Température de l’air": iotData.map((d) => ({ date: new Date(d.date_mesure).toLocaleDateString("fr-FR"), valeur: parseFloat(d.temperature_air) || 0 })),
    "Humidité du sol": iotData.map((d) => ({ date: new Date(d.date_mesure).toLocaleDateString("fr-FR"), valeur: parseFloat(d.humidite_sol) || 0 })),
    "Humidité de l’air": iotData.map((d) => ({ date: new Date(d.date_mesure).toLocaleDateString("fr-FR"), valeur: parseFloat(d.humidite_air) || 0 })),
    "pH du sol": iotData.map((d) => ({ date: new Date(d.date_mesure).toLocaleDateString("fr-FR"), valeur: parseFloat(d.ph_sol) || 0 })),
    "Qualité de l’air": iotData.map((d) => ({ date: new Date(d.date_mesure).toLocaleDateString("fr-FR"), valeur: parseFloat(d.qualite_air) || 0 })),
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-6">
      <h1 className="text-2xl font-bold text-green-900 mb-2">
        Tableau de bord – {exportateurNom || "Chargement..."}
      </h1>
      <p className="text-green-900 text-sm mb-4">
        Visualisation des données en temps réel des cultures.
      </p>

      <Headerboard
        activeCultures={activeCultures}
        selectedCulture={selectedCulture?.id || ""}
        onCultureChange={(id) => {
          const culture = activeCultures.find((c) => c.id === id);
          setSelectedCulture(culture || null);
        }}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-6 w-full">
        {dataCards.map((data) => (
          <DataCard key={data.key} icon={data.icon} label={data.label} value={data.value} unit={data.unit} />
        ))}
      </div>

      <ChartsCarousel
        culture={selectedCulture?.nom_culture || ""}
        date={selectedDate}
        chartData={chartDataByParameter}
      />
    </div>
  );
};

export default ExportateurDashboardView;
