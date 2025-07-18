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
// services/controleurDemandeService.js

export const getCulturesByExportateurId = async (exportateurId) => {
  if (!exportateurId) throw new Error("ID exportateur manquant");

  const response = await axios.get(
    `http://127.0.0.1:5000/api/controleur/exportateur/${exportateurId}`
  );

  return response.data; // { nom: "...", cultures: [...] }
};
