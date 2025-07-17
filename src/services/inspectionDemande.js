import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api";

export const createInspectionRequest = async ({ culture_ids, remarques }) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Utilisateur non authentifié");

  const response = await axios.post(
    `${API_URL}/exportateur/demandes-inspection`,
    {
      culture_ids,
      remarques,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
