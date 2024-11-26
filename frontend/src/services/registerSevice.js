import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BASE_URL}`; // Adjust to your backend URL

// API call to register a user
export const registerUser = (userData) => {
  return axios.post(`${BASE_URL}/register`, userData);
};
