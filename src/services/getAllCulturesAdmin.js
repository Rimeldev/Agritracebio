import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api/admin/cultures";

export const getAllCulturesAdmin = async (agriculteur_id = null) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Aucun token trouvé. L'utilisateur n'est pas authentifié.");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {},
    };

    if (agriculteur_id) {
      config.params.agriculteur_id = agriculteur_id;
    }

    const response = await axios.get(API_URL, config);
    return response.data.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des cultures admin :", error);
    throw error; // tu peux aussi retourner [] ici si tu préfères éviter un crash
  }
};
