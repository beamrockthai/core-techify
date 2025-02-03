import axios from "axios";

const API_URL = "http://localhost:3000/api/Job";

// ดึงรายการงานทั้งหมด
export const getJobs = async () => {
  try {
    const response = await axios.get(`${API_URL}s`); // แก้ URL ให้ตรงกับ API ที่รับค่ารายการทั้งหมด
    return response.data.data; // สมมติว่า API ส่งข้อมูลมาภายใน `data.data`
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

// เพิ่มงานใหม่
export const addJob = async (jobData) => {
  try {
    const response = await axios.post(API_URL, jobData);
    return response.data.data;
  } catch (error) {
    console.error("Error adding job:", error);
    throw error;
  }
};

// แก้ไขงาน
export const updateJob = async (id, jobData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, jobData);
    return response.data.data;
  } catch (error) {
    console.error("Error updating job:", error);
    throw error;
  }
};

// ลบงาน
export const deleteJob = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  } catch (error) {
    console.error("Error deleting job:", error);
    throw error;
  }
};
