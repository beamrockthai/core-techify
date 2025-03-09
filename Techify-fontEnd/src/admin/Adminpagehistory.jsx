import { motion } from "framer-motion";
import TableHistoryAdmin from "../admin/TableHistoryAdmin";

function AdminDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // เริ่มต้นจาง + เลื่อนลงเล็กน้อย
      animate={{ opacity: 1, y: 0 }} // ค่อยๆ แสดงเต็มที่
      transition={{ duration: 0.6, ease: "easeOut" }} // ใช้ easing สวยๆ
      className="container mx-auto p-6"
    >
      <h1 className="text-2xl font-bold text-center py-4">
        📊 รายการสมัครงานของผู้สมัคร (Admin)
      </h1>
      <TableHistoryAdmin />
    </motion.div>
  );
}

export default AdminDashboard;
