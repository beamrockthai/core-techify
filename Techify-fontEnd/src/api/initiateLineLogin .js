const API_URL = "http://localhost:3000"; // backend ของคุณ

// ฟังก์ชันสำหรับเริ่มต้นการล็อกอินผ่าน LINE
export const initiateLineLogin = () => {
  // เปลี่ยนเส้นทางไปที่ endpoint ของ backend สำหรับ LINE Login
  window.location.href = `${API_URL}/auth/line`;
};
