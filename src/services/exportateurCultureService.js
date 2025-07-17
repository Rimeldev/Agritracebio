// src/services/exportateurCultureService.js
import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api"; // à adapter selon l’environnement

export const getExportateurCultures = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Utilisateur non authentifié");

  const response = await axios.get(`${API_URL}/exportateur/cultures`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
};
