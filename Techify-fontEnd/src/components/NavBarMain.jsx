import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // ✅ ใช้ Framer Motion
import Logo from "../assets/logo.webp";

const NavbarMain = ({ handleLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* ✅ Navbar หลัก */}
      <nav className="bg-white w-full flex justify-between items-center mx-auto px-8 h-20 shadow-md">
        {/* ✅ Logo */}
        <div className="inline-flex">
          <Link to="/" className="flex items-center">
            <img src={Logo} alt="Logo" className="h-12 w-12 rounded-full" />
          </Link>
        </div>

        {/* ✅ Search Bar */}
        {/* <div className="hidden sm:block flex-shrink flex-grow-0 justify-start px-2">
          <div className="inline-block">
            <div className="inline-flex items-center max-w-full">
              <button className="flex items-center border rounded-full px-3 py-1 w-60">
                <span className="text-gray-500">🔍 Start your search</span>
              </button>
            </div>
          </div>
        </div> */}

        {/* ✅ ปุ่มเมนู ☰ + Profile */}
        <div className="flex items-center space-x-4">
          <Link to="#" className="hidden lg:block"></Link>

          {/* ✅ Dropdown Menu ใต้ปุ่ม ☰ */}
          <div className="relative">
            <button
              className="btn btn-ghost flex items-center"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </button>

            {/* ✅ ใช้ AnimatePresence + motion.div เพื่อให้เมนู Smooth */}
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50"
                >
                  {/* <button
                    className="absolute top-2 right-2 text-lg"
                    onClick={() => setMenuOpen(false)}
                  >
                    ✖
                  </button> */}

                  <ul className="p-2 space-y-2 text-gray-700 text-sm">
                    <li>
                      <Link
                        to="/main"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setMenuOpen(false)}
                      >
                        หน้าหลัก
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setMenuOpen(false)}
                      >
                        ข้อมูลส่วนตัว
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/registerJob"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setMenuOpen(false)}
                      >
                        สมัครสอบ
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/history"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setMenuOpen(false)}
                      >
                        ประวัติการสมัคร
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/jobs"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setMenuOpen(false)}
                      >
                        ประกาศงาน
                      </Link>
                    </li>
                    <li>
                      <button
                        className="w-full text-left text-red-500 bg-gray-100 px-4 py-2 rounded-md"
                        onClick={() => {
                          handleLogout();
                          setMenuOpen(false);
                        }}
                      >
                        ออกจากระบบ
                      </button>
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ✅ ปุ่ม Profile */}
          <button className="btn btn-ghost">
            <svg
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
            >
              <path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z"></path>
            </svg>
          </button>
        </div>
      </nav>
    </>
  );
};

export default NavbarMain;
