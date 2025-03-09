import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, userData);

    if (response.data.success && response.data.user) {
      // ✅ เก็บ Token และ User ลงใน localStorage
      localStorage.setItem("token", `Bearer ${response.data.token}`);
      localStorage.setItem("user", JSON.stringify(response.data.user)); // ✅ เก็บ user แบบ JSON

      console.log("✅ User saved in localStorage:", response.data.user);
    } else {
      console.error("❌ User data is missing in response");
    }

    return response.data;
  } catch (error) {
    console.error("❌ Login Error:", error.response?.data || error.message);
    throw error.response?.data || { success: false, message: "Login failed" };
  }
};

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);

    if (response.data.token) {
      console.log("✅ Token received:", response.data.token);
      localStorage.setItem("token", `Bearer ${response.data.token}`);
    } else {
      console.warn("🚨 No token received in register API");
    }

    return response.data;
  } catch (error) {
    console.error("❌ Register Error:", error.response?.data || error.message);
    throw (
      error.response?.data || { success: false, message: "Registration failed" }
    );
  }
};
