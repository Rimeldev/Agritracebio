// src/services/resetPasswordService.js
import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api/auth";

export const resetPassword = ({ email, reset_code, new_password }) => {
  return axios.post(`${API_URL}/reset_password`, {
    email,
    reset_code,
    new_password,
  });
};
