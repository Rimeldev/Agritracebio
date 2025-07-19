// services/apiService.js
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000/api";

const getToken = () => localStorage.getItem("token");

export const fetchCulturesValidees = async () => {
  const token = getToken();
  if (!token) throw new Error("Token manquant.");
  const res = await axios.get(`${API_BASE_URL}/exportateur/cultures/inspection-validee`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data;
};

export const fetchTransports = async () => {
  const token = getToken();
  if (!token) throw new Error("Token manquant.");
  const res = await axios.get(`${API_BASE_URL}/exportateur/transports`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data;
};
