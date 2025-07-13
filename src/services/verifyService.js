import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api/auth";

export const verifyUserAccount = async ({ email, verification_code }) => {
  const res = await axios.post(`${API_URL}/verify_user_account`, {
    email,
    verification_code,
  });
  return res.data;
};

export const resendVerificationCode = async (email) => {
  const res = await axios.post(`${API_URL}/resent_verification_code`, {
    email,
  });
  return res.data;
};
