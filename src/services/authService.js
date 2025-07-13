import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api"; // adapte si nécessaire

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/signup`, userData);
  return response.data;
};

export const loginUser = async ({ email, password }) => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    email,
    password,
  });

  return response.data;
};
