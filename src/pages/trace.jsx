import React from "react";
import { CheckCircle, ThermometerSun, Truck, MapPin, BadgeCheck, Calendar } from "lucide-react";

const AnanasDetailsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-12 lg:px-32 font-sans">
      <div className="text-center mb-8">
        <span className="text-xs bg-gray-200 px-3 py-1 rounded-full tracking-wide font-medium text-gray-700">
          LOT: 2025-A12B34
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-green-900 mt-2">Ananas Pain de Sucre</h1>
        <p className="text-gray-600 text-lg">Pain de Sucre</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Informations Producteur */}
        <div className="bg-white rounded-xl shadow p-6 space-y-3">
          <h2 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <BadgeCheck size={18} className="text-green-700" /> Informations Producteur
          </h2>
          <div>
            <p className="text-sm font-medium text-gray-600">Producteur</p>
            <p className="text-base font-semibold">Luc Byklt ZAVKON</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Localisation</p>
            <p className="text-base text-gray-800">Tori-Bossito, Atlantique, Bénin</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Certifications</p>
            <div className="flex gap-2 mt-1 flex-wrap">
              <span className="bg-yellow-200 text-yellow-900 px-3 py-1 rounded-full text-xs font-semibold">
                Agriculture Biologique
              </span>
              <span className="bg-yellow-200 text-yellow-900 px-3 py-1 rounded-full text-xs font-semibold">
                Commerce Équitable
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <p className="text-sm font-medium text-gray-600">Date de déclaration</p>
              <p className="text-gray-800">15/07/2024</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Date de récolte</p>
              <p className="text-gray-800">12/04/2025</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Surface cultivée</p>
              <p className="text-gray-800">2.5 hectares</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Méthode</p>
              <p className="text-gray-800">Agriculture biologique</p>
            </div>
          </div>
        </div>

        {/* Conditions de Transport */}
        <div className="bg-white rounded-xl shadow p-6 space-y-3">
          <h2 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <Truck size={18} className="text-green-700" /> Conditions de Transport
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-600">Date de départ</p>
              <p className="text-gray-800">13/04/2025</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Date d'arrivée</p>
              <p className="text-gray-800">14/04/2025</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm font-medium text-gray-600">Véhicule</p>
              <p className="text-gray-800">Camion frigorifique TG-456-AB</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Conducteur</p>
              <p className="text-gray-800">Jean HOUSSOU</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Itinéraire</p>
              <p className="text-gray-800">Tori-Bossito → Cotonou → Port Autonome</p>
            </div>
            <div className="col-span-2 flex items-center gap-2">
              <ThermometerSun className="text-blue-600" size={16} />
              <span className="text-sm text-gray-700">Température : 12-15°C</span>
              <span className="ml-auto bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                Conditions : Conforme
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Résultats des Inspections */}
      <div className="mt-8 bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <CheckCircle size={18} className="text-green-700" /> Résultats des Inspections
        </h2>
        <div className="border border-gray-200 rounded p-4">
          <div className="flex justify-between items-center mb-2">
            <p className="font-medium text-gray-800">Inspection initiale</p>
            <span className="text-sm text-green-800 font-semibold bg-green-100 px-3 py-1 rounded-full">
              Conforme
            </span>
          </div>
          <p className="text-sm text-gray-700 mb-2">
            Inspecteur: Dr. Marie KOUDJO
          </p>
          <p className="text-sm text-gray-700">
            Respect des normes phytosanitaires, aucun pesticide détecté
          </p>
          <div className="text-right text-sm text-gray-500 mt-2">
            <Calendar size={14} className="inline-block mr-1" /> 20/07/2024
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnanasDetailsPage;
