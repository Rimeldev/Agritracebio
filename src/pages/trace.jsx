import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EnvironmentalChart from "@/components/EnvironmentalChart";
import { MapPin, User, Mail, Phone } from "lucide-react";

import axios from "axios";
import {
  BadgeCheck,
  Truck,
  ThermometerSun,
  CheckCircle,
  FileText,
   Check,
} from "lucide-react";
import logo from "../assets/logo.png";
import logotrace from "../assets/traceananas.png";
import { Camera } from "lucide-react";

const TracePage = () => {
  const { culture_id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const formatDate = (str) =>
    str ? new Date(str).toLocaleDateString("fr-FR") : "N/A";
const [showImageModal, setShowImageModal] = useState(false);

  useEffect(() => {
    const fetchCulture = async () => {
      try {
        const response = await axios.get(
          `http://192.168.4.4:5000/api/controleur/culture/${culture_id}/details-complets`
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
     <header className="relative h-64 md:h-80 w-full overflow-hidden">
  {/* Image de fond */}
  <img
    src={logotrace}
    alt="QR Code Champ"
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Couche verte transparente */}
  <div className="absolute inset-0 bg-[#284411]/70"></div>

  {/* Contenu */}
  <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-4">
  <img src={logo} alt="Logo" className="h-25" />

  <h1 className="text-2xl md:text-4xl font-bold mt-4">{culture.nom_culture}</h1>

  <div className="mt-2 flex items-center gap-2 text-sm md:text-base">
    <User size={16} className="text-[#facf07]" />
    <span>
      Producteur : {utilisateur?.prenom} {utilisateur?.nom}
    </span>
  </div>

  <div className="flex items-center gap-2 text-sm md:text-base mt-1">
    <MapPin size={16} className="text-[#facf07]" />
    <span>Localisation : {culture.localisation}, Bénin</span>
  </div>

  <div className="flex items-center gap-2 text-sm md:text-base mt-1">
    <Mail size={16} className="text-[#facf07]" />
    <span>Email : {utilisateur?.email}</span>
  </div>

  <div className="flex items-center gap-2 text-sm md:text-base mt-1">
    <Phone size={16} className="text-[#facf07]" />
    <span>Téléphone : {utilisateur?.telephone}</span>
  </div>
</div>
</header>

      {/* MAIN */}
      <main className="px-4 md:px-8 lg:px-32 py-10 space-y-10">
        {/* SECTION - CULTURE */}
        <Section
          title="Informations sur la culture"
          icon={<BadgeCheck size={20} className="text-[#facf07]" />}
        >
          <InfoGrid
            data={{
              "Nom": culture.nom_culture,
              "Statut": "Exporté",
              "Variété": culture.variete || "N/A",
              "Date de déclaration": formatDate(culture.date_declaration),
            }}
          />
        </Section>

        {/* SECTION - ENVIRONNEMENT */}
         <Section      title="Conditions environnementales (graphe)"
            icon={ <ThermometerSun size={20} className="text-[#facf07]" />}>
       {data?.donnees_environnementales && (
  <EnvironmentalChart donneesEnvironnementales={data.donnees_environnementales} />
)}
</Section>

      {/* SECTION - TRANSPORT */}
{transport && (
  <Section
    title="Informations de transport"
    icon={<Truck size={20} className="text-[#facf07]" />}
  >
    {/* Grille d'infos principales */}
    <InfoGrid
      data={{
        "Nom du Chauffeur": transport.chauffeur,
        "Immatriculation du Véhicule": transport.immatriculation,
        "Point de départ": transport.lieu_depart,
        "Destination": transport.lieu_arrivee,
        "Date de transport": formatDate(transport.created_at),
      }}
    />

    {/* Image du véhicule */}
  {/* Image du véhicule + État du transport côte à côte */}
<div className="flex flex-col md:flex-row justify-between gap-8 mt-4">
  {/* Photo du véhicule */}
 {transport.images_camion?.length > 0 && (
  <div className="flex-1">
    <p className="text-lg font-semibold text-[#facf07] mb-2">Photo du véhicule</p>
<button
  onClick={() => setShowImageModal(true)}
  className="flex items-center gap-2 px-4 py-2 bg-[#1a3b1f] text-white font-medium rounded hover:bg-green-500 transition"
>
  <Camera className="w-5 h-5" />
  Voir l’image
</button>

    {/* Modale */}
    {showImageModal && (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="rounded-lg shadow-lg max-w-md w-full relative">
          {/* Bouton de fermeture */}
          <button
            className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl"
            onClick={() => setShowImageModal(false)}
          >
            &times;
          </button>

          <img
            src={`http://192.168.4.4:5000/${transport.images_camion[0]}`}
            alt="État du véhicule"
            className="rounded-lg w-full object-contain max-h-[70vh]"
          />
        </div>
      </div>
    )}
  </div>
)}


  {/* État du transport */}
  <div className="flex-1">
    <p className="text-lg font-semibold text-[#facf07] mb-2">État du transport</p>
    <ul className="space-y-1 text-sm text-gray-800">
      <li className="flex items-center">
        <Check className="text-green-600 mr-2" size={18} /> Véhicule conforme
      </li>
      <li className="flex items-center">
        <Check className="text-green-600 mr-2" size={18} /> Documentation complète
      </li>
      <li className="flex items-center">
        <Check className="text-green-600 mr-2" size={18} /> Chauffeur qualifié
      </li>
      <li className="flex items-center">
        <Check className="text-green-600 mr-2" size={18} /> Itinéraire validé
      </li>
    </ul>
  </div>
</div>

  </Section>
)}


      {/* SECTION - INSPECTION */}
{inspection && (
  <Section
    title="Rapport de l’inspection"
    icon={<CheckCircle size={20} className="text-[#facf07]" />}
  >
    <div className="grid md:grid-cols-2 gap-4 text-sm">
      {(() => {
        const parsed = JSON.parse(inspection.resultats);
        const info = parsed?.null || {};
        return (
          <>
            <p><strong>Statut :</strong> <span className="text-green-700 font-medium">{info.statut || "N/A"}</span></p>
            <p><strong>Résultats de l'inspection :</strong><br />{info.resultat || "N/A"}</p>
            <p><strong>Date de validation :</strong> {new Date(inspection.updated_at).toLocaleDateString('fr-FR')}</p>
          </>
        );
      })()}
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
