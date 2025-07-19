import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EnvironmentalChart from "@/components/EnvironmentalChart";

import axios from "axios";
import {
  BadgeCheck,
  Truck,
  ThermometerSun,
  CheckCircle,
  FileText,
} from "lucide-react";
import logo from "../assets/logo.png";

const TracePage = () => {
  const { culture_id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const formatDate = (str) =>
    str ? new Date(str).toLocaleDateString("fr-FR") : "N/A";

  useEffect(() => {
    const fetchCulture = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/api/controleur/culture/${culture_id}/details-complets`
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Erreur de chargement des données:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCulture();
  }, [culture_id]);

  if (loading) return null;
  if (!data) return <p className="p-6 text-center">Aucune donnée trouvée.</p>;

  const { culture, utilisateur, inspections, transports } = data;

  const inspection = inspections[0];
  const transport = transports[0];


  return (
    <div className="min-h-screen bg-white text-[#1a3b1f] font-sans">
      {/* HEADER */}
      <header className="bg-[#284411] text-white px-4 py-6 flex flex-col items-center text-center">
        <img src={logo} alt="Logo" className="h-16 md:h-20 mb-2" />
        <h1 className="text-2xl md:text-4xl font-bold">{culture.nom_culture}</h1>
        <p className="mt-1 text-sm md:text-base">
          Producteur : {utilisateur?.prenom} {utilisateur?.nom}
        </p>
        <p className="text-sm md:text-base">Localisation : {culture.localisation}</p>
      </header>

      {/* MAIN */}
      <main className="px-4 md:px-8 lg:px-32 py-10 space-y-10">
        {/* SECTION - CULTURE */}
        <Section
          title="Informations sur la culture"
          icon={<BadgeCheck size={20} className="text-green-700" />}
        >
          <InfoGrid
            data={{
              "Type": culture.nom_culture,
              "Statut": "Exporté",
              "Variété": culture.variete || "N/A",
              "Date de déclaration": formatDate(culture.date_declaration),
            }}
          />
        </Section>

        {/* SECTION - ENVIRONNEMENT */}
         <Section>
       {data?.donnees_environnementales && (
  <EnvironmentalChart donneesEnvironnementales={data.donnees_environnementales} />
)}
</Section>

        {/* SECTION - TRANSPORT */}
        {transport && (
          <Section
            title="Informations de transport"
            icon={<Truck size={20} className="text-green-700" />}
          >
           <InfoGrid
  data={{
    "Chauffeur": transport.chauffeur,
    "Immatriculation": transport.immatriculation,
    "Lieu de départ": transport.lieu_depart,
    "Lieu d’arrivée": transport.lieu_arrivee,
    "Date": formatDate(transport.created_at),
  }}
/>

          </Section>
        )}

        {/* SECTION - INSPECTION */}
        {inspection && (
  <Section
    title="Résultat de l’inspection"
    icon={<CheckCircle size={20} className="text-green-700" />}
  >
    <div className="grid md:grid-cols-2 gap-4 text-sm">
      {(() => {
        const parsed = JSON.parse(inspection.resultats);
        const info = parsed?.null || {};
        return (
          <>
            <p><strong>Statut :</strong> <span className="text-green-700 font-medium">{info.statut || "N/A"}</span></p>
            <p><strong>Commentaire :</strong> {info.resultat || "N/A"}</p>
          </>
        );
      })()}

      {inspection.document && (
        <a
          href={`http://127.0.0.1:5000/${inspection.document.replace(/\\/g, '/')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-green-700 hover:text-green-900 underline"
        >
          <FileText size={16} />
          Voir le document PDF
        </a>
      )}
    </div>
  </Section>
)}

      </main>

      {/* FOOTER */}
      <footer className="bg-[#284411] text-white text-center text-xs py-6 mt-10">
        © 2025 AgriTraceBio Bénin — Tous droits réservés.
      </footer>
    </div>
  );
};

const Section = ({ title, icon, children }) => (
  <section className="bg-white border border-green-100 rounded-2xl shadow p-6">
    <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-4">
      {icon} {title}
    </h2>
    {children}
  </section>
);

const InfoGrid = ({ data }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
    {Object.entries(data).map(([label, value]) => (
      <p key={label}>
        <strong>{label} :</strong> {value}
      </p>
    ))}
  </div>
);

export default TracePage;
