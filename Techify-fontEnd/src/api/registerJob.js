import axios from "axios";

const API_URL = "http://localhost:3000/api/employees"; // เปลี่ยนเป็น URL Backend ของคุณ

export const registerJob = async (formData) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token not found, please login again.");
    }

    const response = await axios.post(`${API_URL}/register`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "❌ Error during job application:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// ✅ ฟังก์ชันดึงประวัติการสมัครงาน
export const getJobHistory = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token not found, please login again.");
    }

    // ✅ Debug API Request URL
    console.log("🔹 API Request:", `${API_URL}/getJop`, "Method: GET");

    // ✅ ใช้ `GET` และตรวจสอบ headers
    const response = await axios.get(`${API_URL}/getJop`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("✅ API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Error during job history fetch:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// ✅ ฟังก์ชันยกเลิกการสมัครงาน
export const cancelRegisterJob = async (applicationId) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token not found, please login again.");
    }

    const response = await axios.delete(
      `${API_URL}/cancelrejob/${applicationId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "❌ Error during job cancellation:",
      error.response?.data || error.message
    );
    throw error;
  }
};
