import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.webp";

const NavbarLogin = () => {
  return (
    <nav className="navbar bg-white shadow-md sticky top-0 w-full z-50 bg-white/60 backdrop-blur-md shadow-md">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-4 py-3">
        {/* ✅ ปรับให้ชิดซ้ายขึ้น */}
        <div className="flex items-center ml-[-10px]">
          <Link to="/" className="flex items-center">
            <img src={Logo} alt="Logo" className="h-20 w-15 rounded-full" />
            <p className="ml-2 text-lg font-bold hidden md:block">
              องค์การบริหารส่วนจังหวัดนนทบุรี
            </p>
          </Link>
        </div>

        {/* ข้อความล็อกอิน */}
        <p className="text-sm text-purple-600 hidden md:block">กรุณาล็อกอิน</p>
      </div>
    </nav>
  );
};

export default NavbarLogin;
