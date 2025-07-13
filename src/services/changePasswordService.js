// src/services/changePasswordService.js
import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api"; // adapte si besoin

export const changePassword = async (data) => {
  const token = localStorage.getItem("token"); // ou sessionStorage si tu utilises ça

  if (!token) {
    throw new Error("Utilisateur non authentifié");
  }

  return await axios.put(`${API_URL}/user/change_password`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
