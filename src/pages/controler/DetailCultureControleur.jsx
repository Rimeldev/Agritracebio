import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import UserMenu from "@/components/UserMenu";

const mockData = {
  EXP000001: {
    id: "EXP000001",
    nomCulture: "Ananas Cayenne – Lokossa",
    dateRecolte: "2025-07-10",
    dateProduction: "2025-06-25",
    resultat: "Température conforme: 7°C, Humidité < 80%, Aucune trace de pesticide ni fongicide détectée. Normes COFRAC respectées.",
    statut: "validée",
    destination: "Paris, France",
    agriculteur: {
      nom: "Tossou",
      prenom: "Jean",
      tel: "+22990001122",
    },
    exportateur: {
      nom: "AGRIEXPORT BENIN",
      email: "export@agri.bj",
    },
    camion: {
      image: "https://via.placeholder.com/400x200?text=Camion",
      matricule: "AB1234BC",
      chauffeur: "Kouassi Firmin",
    },
  },
  EXP000002: {
    id: "EXP000002",
    nomCulture: "Mangue Kent – Bembéréké",
    dateRecolte: "2025-07-12",
    dateProduction: "2025-06-20",
    resultat: "Résidus de traitement détectés sous seuils autorisés. Certificat délivré.",
    statut: "validée",
    destination: "Berlin, Allemagne",
    agriculteur: {
      nom: "Saka",
      prenom: "Ali",
      tel: "+22990112233",
    },
    exportateur: {
      nom: "FruitWorld Bénin",
      email: "contact@fruitworld.bj",
    },
    camion: {
      image: "https://via.placeholder.com/400x200?text=Camion",
      matricule: "BZ1123XZ",
      chauffeur: "Gbêto Raymond",
    },
  },
};

const DetailCultureControleur = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const culture = mockData[id] || null;

  if (!culture) {
    return (
      <DashboardLayout>
        <UserMenu />
        <div className="p-6 text-center">
          <p className="text-red-600 text-lg font-semibold">
            Aucune culture trouvée pour l'ID : {id}
          </p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <UserMenu />
      <div className="p-6 max-w-5xl mx-auto bg-white rounded shadow">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-green-900">Détail de la culture</h1>
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-green-700 hover:underline"
          >
            ← Retour
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <p className="font-semibold text-gray-600">ID :</p>
            <p>{culture.id}</p>

            <p className="font-semibold text-gray-600 mt-4">Nom de la culture :</p>
            <p>{culture.nomCulture}</p>

            <p className="font-semibold text-gray-600 mt-4">Date de récolte :</p>
            <p>{new Date(culture.dateRecolte).toLocaleDateString()}</p>

            <p className="font-semibold text-gray-600 mt-4">Date de production :</p>
            <p>{new Date(culture.dateProduction).toLocaleDateString()}</p>

            <p className="font-semibold text-gray-600 mt-4">Statut :</p>
            <span
              className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                culture.statut === "validée"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {culture.statut}
            </span>

            <p className="font-semibold text-gray-600 mt-4">Destination :</p>
            <p>{culture.destination}</p>
          </div>

          <div>
            <p className="font-semibold text-gray-600">Résultat du test :</p>
            <p>{culture.resultat}</p>

            <p className="font-semibold text-gray-600 mt-4">Agriculteur :</p>
            <p>
              {culture.agriculteur.prenom} {culture.agriculteur.nom}
            </p>
            <p>{culture.agriculteur.tel}</p>

            <p className="font-semibold text-gray-600 mt-4">Exportateur :</p>
            <p>{culture.exportateur.nom}</p>
            <p>{culture.exportateur.email}</p>

            <p className="font-semibold text-gray-600 mt-4">Chauffeur :</p>
            <p>{culture.camion.chauffeur}</p>
            <p>Matricule : {culture.camion.matricule}</p>
          </div>
        </div>

        <div className="mt-6">
          <p className="font-semibold text-gray-600">Camion utilisé :</p>
          <img
            src={culture.camion.image}
            alt="Camion"
            className="w-full max-w-md mt-2 border rounded"
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DetailCultureControleur;
