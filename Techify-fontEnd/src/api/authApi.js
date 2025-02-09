import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    if (response.data.success) {
      // เก็บ Token ลงใน localStorage
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);

    if (response.data.token) {
      console.log("✅ Token received:", response.data.token);
    } else {
      console.log("🚨 No token received in register API");
    }

    return response.data; // ✅ ต้องมี token ใน response
  } catch (error) {
    throw error.response.data;
  }
};
