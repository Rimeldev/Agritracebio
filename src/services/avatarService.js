// src/services/avatarService.js
import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api"; // adapte à ton backend

export const uploadAvatar = async (file) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Utilisateur non authentifié");

  const formData = new FormData();
  formData.append("avatar", file); // le nom 'avatar' doit correspondre au backend

  const response = await axios.post(`${API_URL}/user/create_my_avatar`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
