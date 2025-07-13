// src/services/createCultureService.js
import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api";

export const createCulture = async (data) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(`${API_URL}/agriculteur/cultures`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
