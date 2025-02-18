import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const getUserProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("❌ No token found in localStorage");

    const response = await axios.get(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` }, // ✅ ใส่ "Bearer " ก่อน Token
    });

    return response.data;
  } catch (error) {
    console.error(
      "❌ Get User Profile Error:",
      error.response?.data || error.message
    );
    throw (
      error.response?.data || {
        success: false,
        message: "Failed to fetch user profile",
      }
    );
  }
};
