import axios from "axios";

const API_URL = "http://localhost:3000/api/employees"; // ✅ ตรวจสอบให้แน่ใจว่าเซิร์ฟเวอร์รันที่พอร์ต 3000

export const registerJob = async (formData) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token not found, please login again.");
    }

    // ✅ ตรวจสอบว่าเส้นทาง `/app` ถูกต้อง
    // const response = await axios.post(`${API_URL}/app`, formData, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //     Authorization: `Bearer ${token}`,
    //   },
    // });

    // ✅ ตรวจสอบว่าเส้นทาง `/app` ถูกต้อง
    const response = await axios.get(`${API_URL}/getJop`, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("test", response);

    return response.data;
  } catch (error) {
    console.error(
      "❌ Error during job application:",
      error.response?.data || error.message
    );
    throw error;
  }
};
