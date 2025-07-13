// services/getCultureDashboardService.js
import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api";

export const getCultureDashboard = async (cultureId, { page = 1, perPage = 10, startDate, endDate }) => {
  const token = localStorage.getItem("token");
  const params = {
    page,
    per_page: perPage,
    ...(startDate && { start_date: startDate }),
    ...(endDate && { end_date: endDate }),
  };

  const res = await axios.get(`${API_URL}/agriculteur/cultures/${cultureId}/dashboard`, {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.data;
};
