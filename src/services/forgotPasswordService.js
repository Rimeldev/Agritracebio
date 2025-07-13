// src/services/forgotPasswordService.js

import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api/auth";

export const forgotPassword = (email) => {
  return axios.post(`${API_URL}/forgot_password`, { email });
};

export const resendForgotPasswordLink = (email) => {
  return axios.post(`${API_URL}/resent_user_link_for_forgot_password`, { email });
};
