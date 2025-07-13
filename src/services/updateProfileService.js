// src/services/updateProfileService.js
import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api";

export const updateProfile = async (data) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Utilisateur non authentifié");

  const response = await axios.put(`${API_URL}/user/update_profile`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
