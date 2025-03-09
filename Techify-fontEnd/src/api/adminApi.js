import axios from "axios";

const API_URL = "http://localhost:3000/api/admin";

// 🔹 ดึงข้อมูลการสมัครงานทั้งหมด (Admin เท่านั้น)
export const getAllRegisterJobs = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/allregisterjob`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching registered jobs:", error);
    throw error;
  }
};

// 🔹 อัปเดตสถานะใบสมัคร (Admin เท่านั้น)
export const updateApplicationStatus = async (applicationId, status, token) => {
  try {
    const response = await axios.put(
      `${API_URL}/updateStatusUsers/${applicationId}`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error("❌ Error updating application status:", error);
    throw error;
  }
};
