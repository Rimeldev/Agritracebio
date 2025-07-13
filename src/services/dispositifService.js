import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api/admin/cultures/dispositif";

export const addDispositifToCulture = async (dispositifData) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(
      API_URL,
      {
        nom: dispositifData.nom,
        culture_id: dispositifData.culture_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    // Log complet pour debug
    console.error("Erreur API (addDispositifToCulture) :", error.response?.data || error.message);
    throw error; // relancer pour que le composant parent le gère
  }
};
