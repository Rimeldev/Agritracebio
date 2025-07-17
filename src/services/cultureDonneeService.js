import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api";

export const getExportateurCultureDonnees = async (cultureId, options = {}) => {
  const token = localStorage.getItem("token"); // Assure-toi que le token est bien stocké ici
  if (!token) {
    throw new Error("Token manquant, utilisateur non authentifié");
  }

  const params = {
    page: options.page || 1,
    per_page: options.perPage || 10,
  };

  if (options.startDate) {
    params.start_date = options.startDate;
  }
  if (options.endDate) {
    params.end_date = options.endDate;
  }

  return axios
    .get(`${API_URL}/exportateur/cultures/${cultureId}/donnees`, {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data.data)
    .catch((err) => {
      console.error("Erreur API cultureDonneeService:", err);
      throw err;
    });
};
