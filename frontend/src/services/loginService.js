import axios from "axios";

const BASE_URL = "http://localhost:5000/"; // Adjust to your backend URL

// API call to log in a user
export const loginUser = (userData) => {
  return axios.post(`${BASE_URL}/login`, userData);
};
