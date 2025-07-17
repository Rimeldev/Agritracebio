// services/sendInspectionNotificationService.js
import axios from "axios";

export const sendInspectionNotification = async ({ email, date_inspection, message, demande_id }) => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const response = await axios.post(
    `http://127.0.0.1:5000/api/controleur/inspections/notification`,
    {
      email,
      date_inspection,
      message,
      demande_id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
