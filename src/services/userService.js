import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api/admin/users";

export const getAllUsers = async (type_utilisateur = null) => {
  const token = localStorage.getItem("token");
  const params = {};

  if (type_utilisateur && type_utilisateur !== "Tous") {
    params.type_utilisateur = type_utilisateur.toLowerCase();
  }

  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  });

  return response.data.data;
};

export const getDeletedUsers = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API_URL}/deleted`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
};

export const toggleAdminRole = async (userId) => {
  const token = localStorage.getItem("token");

  const response = await axios.put(
    `${API_URL}/${userId}/admin-role`,
    {}, // Pas de corps à envoyer
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const toggleUserSuspension = async (userId) => {
  const token = localStorage.getItem("token");

  const response = await axios.put(
    `${API_URL}/${userId}/suspension`,
    {}, // Pas de corps nécessaire
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};