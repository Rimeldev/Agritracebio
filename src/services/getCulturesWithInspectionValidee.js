// services/getCulturesWithInspectionValidee.js
import axios from "axios";

export const getCulturesWithInspectionValidee = async () => {
  try {
    const response = await axios.get("/api/exportateur/cultures/inspection-validee");
    return response.data;
  } catch (error) {
    console.error("Erreur lors du chargement des cultures validées :", error);
    throw error;
  }
};
