import React from "react";
import { motion } from "framer-motion";

const Notification = ({ onClose }) => {
  return (
    <div className="fixed z-10 inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      {/* ใช้ Framer Motion เพื่อให้ Popup มี Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 50 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative bg-white rounded-lg overflow-hidden shadow-xl max-w-lg w-full p-6"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">
          นโยบายความเป็นส่วนตัวในการสมัครงาน
        </h2>
        <div className="max-h-80 overflow-y-auto pr-2">
          <p className="mb-4 text-gray-700 text-sm leading-relaxed">
            องค์การบริหารส่วนจังหวัดนนทบุรี (อบจ.นนทบุรี)
            ให้ความสำคัญกับการคุ้มครองข้อมูลส่วนบุคคลของผู้สมัครงาน
            และมุ่งมั่นที่จะปฏิบัติตามกฎหมายคุ้มครองข้อมูลส่วนบุคคลที่เกี่ยวข้อง
            โดยนโยบายนี้อธิบายถึงวิธีที่เราจัดเก็บ ใช้ และคุ้มครองข้อมูลของท่าน
          </p>

          <h3 className="font-semibold">1. ข้อมูลที่เราเก็บรวบรวม</h3>
          <p className="text-sm text-gray-600">
            ข้อมูลระบุตัวตน เช่น ชื่อ-นามสกุล วันเดือนปีเกิด เลขบัตรประชาชน{" "}
            <br />
            ข้อมูลการติดต่อ เช่น ที่อยู่ อีเมล หมายเลขโทรศัพท์ <br />
            ข้อมูลการศึกษา และประวัติการทำงาน
          </p>

          <h3 className="font-semibold mt-2">2. วัตถุประสงค์ในการใช้ข้อมูล</h3>
          <p className="text-sm text-gray-600">
            ใช้เพื่อตรวจสอบคุณสมบัติและพิจารณาการรับสมัครงาน <br />
            ติดต่อผู้สมัครงานเกี่ยวกับขั้นตอนการคัดเลือก
          </p>

          <h3 className="font-semibold mt-2">3. การเปิดเผยข้อมูล</h3>
          <p className="text-sm text-gray-600">
            เราจะไม่เปิดเผยข้อมูลของท่าน เว้นแต่มีข้อกำหนดทางกฎหมาย
            หรือได้รับความยินยอมจากท่าน
          </p>

          <h3 className="font-semibold mt-2">4. ระยะเวลาการเก็บข้อมูล</h3>
          <p className="text-sm text-gray-600">
            เราจะเก็บข้อมูลของท่านตามระยะเวลาที่จำเป็นเพื่อวัตถุประสงค์ของการสมัครงาน
          </p>

          <h3 className="font-semibold mt-2">5. สิทธิของผู้สมัครงาน</h3>
          <p className="text-sm text-gray-600">
            ขอเข้าถึงและขอรับสำเนาข้อมูลของท่าน ขอแก้ไข
            หรือลบข้อมูลที่ไม่ถูกต้อง
          </p>

          <h3 className="font-semibold mt-2">6. ความปลอดภัยของข้อมูล</h3>
          <p className="text-sm text-gray-600">
            เราใช้มาตรการที่เหมาะสมในการปกป้องข้อมูลของท่านจากการเข้าถึงโดยไม่ได้รับอนุญาต
          </p>

          <h3 className="font-semibold mt-2">7. การเปลี่ยนแปลงนโยบาย</h3>
          <p className="text-sm text-gray-600">
            นโยบายอาจมีการปรับปรุง และเราจะแจ้งให้ทราบผ่านเว็บไซต์ของเรา
          </p>

          <h3 className="font-semibold mt-2">ติดต่อเรา</h3>
          <p className="text-sm text-gray-600">
            องค์การบริหารส่วนจังหวัดนนทบุรี <br />
            เว็บไซต์: nont-pro.go.th <br />
            โทรศัพท์: 02-589-0481-5
          </p>
        </div>

        <p className="text-xs text-gray-500 mt-2 text-center">
          อ่านข้อตกลงและเงื่อนไขการใช้งานให้เข้าใจก่อนกดยืนยัน
        </p>

        <div className="mt-4 flex justify-center gap-4">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-700 transition-transform transform hover:scale-105"
          >
            ยืนยัน
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Notification;
