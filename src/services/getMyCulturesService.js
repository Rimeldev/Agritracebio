// src/services/getMyCulturesService.js
import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api";

export const getMyCultures = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/agriculteur/cultures`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data; // on renvoie uniquement le tableau des cultures
};
