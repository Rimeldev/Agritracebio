// src/services/getMyProfileService.js
import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api";

export const getMyProfile = async () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user_id"); // tu dois l'avoir stocké au login

  if (!token) throw new Error("Utilisateur non authentifié");
  if (!userId) throw new Error("ID utilisateur manquant");

  const res = await axios.get(`${API_URL}/user/get_one_user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.data;
};
