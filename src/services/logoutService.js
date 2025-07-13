// src/services/logoutService.js
import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api";

export const logoutUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Aucun token trouvé");

  const res = await axios.post(`${API_URL}/auth/logout`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
