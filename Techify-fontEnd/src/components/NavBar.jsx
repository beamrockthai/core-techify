import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.webp";
import { useState } from "react";

export default function NavBar({ isLoggedIn }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  return (
    <>
      {/* Navbar */}
      <div className="bg-base-100 shadow-lg w-full fixed top-0 left-0 z-50">
        <div className="navbar bg-white px-4 lg:px-8 py-3 w-full max-w-screen-xl mx-auto flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center">
              <img
                src={Logo}
                alt="Logo"
                className="h-20 w-50 md:h-16 md:w-16 rounded-full"
              />
              <div className="hidden sm:block">
                <p className="font-bold text-base md:text-lg">
                  องค์การบริหารส่วนจังหวัดนนทบุรี
                </p>
                <p className="text-xs text-gray-500">
                  Nonthaburi Provincial Administrative Organization
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6">
            {isLoggedIn ? (
              <ul className="menu menu-horizontal px-1 gap-4 text-sm">
                <li>
                  <Link to="/main" className="hover:text-purple-600">
                    🏠 หน้าหลัก
                  </Link>
                </li>
                <li>
                  <Link to="/profile" className="hover:text-purple-600">
                    👤 ข้อมูลส่วนตัว
                  </Link>
                </li>
                <li>
                  <Link to="/registerJob" className="hover:text-purple-600">
                    📝 สมัครสอบ
                  </Link>
                </li>
                <li>
                  <Link to="/history" className="hover:text-purple-600">
                    📜 ประวัติการสมัคร
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" className="hover:text-purple-600">
                    📢 ประกาศงาน
                  </Link>
                </li>
              </ul>
            ) : (
              <p className="text-sm text-purple-600">กรุณาล็อกอิน</p>
            )}
            {isLoggedIn && (
              <button
                className="btn btn-outline btn-primary text-sm ml-4"
                onClick={handleLogout}
              >
                🚪 ออกจากระบบ
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <label htmlFor="menu-drawer" className="btn btn-ghost text-2xl">
              ☰
            </label>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (DaisyUI) */}
      <input type="checkbox" id="menu-drawer" className="drawer-toggle" />
      <div className="drawer-side z-50">
        <label htmlFor="menu-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-64 bg-white shadow-lg">
          {/* ปิดเมนู */}
          <li className="self-end">
            <label htmlFor="menu-drawer" className="text-2xl cursor-pointer">
              ✖
            </label>
          </li>

          {isLoggedIn ? (
            <>
              <li>
                <Link to="/main">🏠 หน้าหลัก</Link>
              </li>
              <li>
                <Link to="/profile">👤 ข้อมูลส่วนตัว</Link>
              </li>
              <li>
                <Link to="/registerJob">📝 สมัครสอบ</Link>
              </li>
              <li>
                <Link to="/history">📜 ประวัติการสมัคร</Link>
              </li>
              <li>
                <Link to="/jobs">📢 ประกาศงาน</Link>
              </li>
              <li>
                <button
                  className="btn btn-outline btn-primary w-full"
                  onClick={handleLogout}
                >
                  🚪 ออกจากระบบ
                </button>
              </li>
            </>
          ) : (
            <li>
              <p className="text-lg text-center mt-6 text-gray-900">
                กรุณาล็อกอิน
              </p>
            </li>
          )}
        </ul>
      </div>

      {/* แก้ปัญหา Navbar ทับเนื้อหา */}
      <main className="pt-[72px]">{/* เนื้อหาทั้งหมดของเว็บ */}</main>
    </>
  );
}
