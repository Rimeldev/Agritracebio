// services/controleurDemandeService.js
import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api"; // adapte selon l’environnement

export const getAllDemandesInspection = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Utilisateur non authentifié");

  const res = await axios.get(`${API_URL}/controleur/demandes-inspection`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.data;
};
// Récupère les cultures d’un exportateur spécifique (pour le contrôleur)
export const getCulturesByExportateurId = async (exportateurId) => {
  const response = await fetch(`/api/controleur/exportateurs/${exportateurId}/cultures`);
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des cultures de l'exportateur");
  }

  const data = await response.json();

  // 🔁 Exemple de format attendu
  return {
    nom: `${data.exportateur.prenom} ${data.exportateur.nom}`,
    cultures: data.cultures
  };
};
