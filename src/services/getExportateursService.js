// src/services/getExportateursService.js
import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api";

export const getExportateurs = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/agriculteur/exportateurs`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};
