import axios from "axios";

export const envoyerResultatInspection = async ({ demande_id, resultats, statut, document }) => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const formData = new FormData();

  formData.append("demande_id", demande_id);
  formData.append("resultats", JSON.stringify(resultats)); // Important : stringify si objet
  formData.append("statut", statut);
  formData.append("document", document);
console.log("Résultats envoyés :", resultats); // vérifie la valeur de `statut` pour chaque item
  const response = await axios.post(
    "http://127.0.0.1:5000/api/controleur/inspections/resultat",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};
