import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api";

export const deleteMyAccount = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Utilisateur non authentifié");

  const res = await axios.delete(`${API_URL}/user/delete_my_account`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
