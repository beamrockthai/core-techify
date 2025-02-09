import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.webp";
import { useState } from "react";

export default function NavBar({ isLoggedIn }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  return (
    <div className="bg-base-100 shadow-lg">
      <div className="navbar bg-white px-4 lg:px-8 py-2">
        {/* Logo Section */}
        <div className="navbar-start">
          <Link to="/" className="flex items-center gap-4">
            <img src={Logo} alt="Logo" className="h-20 w-50 rounded-full" />
            <div>
              <p className="font-bold text-base">
                องค์การบริหารส่วนจังหวัดนนทบุรี
              </p>
              <p className="text-xs text-gray-500">
                Nonthaburi Provincial Administrative Organization
              </p>
            </div>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-end hidden lg:flex w-full justify-end gap-4">
          {isLoggedIn ? (
            <ul className="menu menu-horizontal px-1 gap-4 text-sm">
              <li>
                <Link to="/main" className="hover:text-purple-600">
                  หน้าหลัก
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-purple-600">
                  ข้อมูลส่วนตัว
                </Link>
              </li>
              <li>
                <Link to="/apply" className="hover:text-purple-600">
                  สมัครสอบ
                </Link>
              </li>
              <li>
                <Link to="/history" className="hover:text-purple-600">
                  ประวัติการสมัคร
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="hover:text-purple-600">
                  ประกาศงาน
                </Link>
              </li>
              <li>
                <button
                  className="btn btn-outline btn-primary text-sm"
                  onClick={handleLogout}
                >
                  ออกจากระบบ
                </button>
              </li>
            </ul>
          ) : (
            <p className="text-sm text-purple-600">กรุณาล็อกอิน</p>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="navbar-end lg:hidden">
          <button
            className="btn btn-ghost"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Items */}
      {isMenuOpen && (
        <div className="bg-white shadow-lg lg:hidden">
          <ul className="menu menu-vertical p-4 text-sm">
            {isLoggedIn ? (
              <>
                <li>
                  <Link to="/main" className="hover:text-purple-600">
                    หน้าหลัก
                  </Link>
                </li>
                <li>
                  <Link to="/profile" className="hover:text-purple-600">
                    ข้อมูลส่วนตัว
                  </Link>
                </li>
                <li>
                  <Link to="/apply" className="hover:text-purple-600">
                    สมัครสอบ
                  </Link>
                </li>
                <li>
                  <Link to="/history" className="hover:text-purple-600">
                    ประวัติการสมัคร
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" className="hover:text-purple-600">
                    ประกาศงาน
                  </Link>
                </li>
                <li>
                  <button
                    className="btn btn-outline btn-primary text-sm"
                    onClick={handleLogout}
                  >
                    ออกจากระบบ
                  </button>
                </li>
              </>
            ) : (
              <li>
                <p className="text-sm text-gray-500 text-center">
                  กรุณาล็อกอิน
                </p>
              </li>
            )}
          </ul>
        </div>
      )}

      <div className="h-1 bg-purple-600"></div>
    </div>
  );
}
