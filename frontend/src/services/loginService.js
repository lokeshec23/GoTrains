import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BASE_URL}`;

// API call to log in a user
export const loginUser = (userData) => {
  return axios.post(`${BASE_URL}/login`, userData);
};
