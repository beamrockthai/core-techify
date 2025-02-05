import { Link } from "react-router-dom";
import Logo from "../assets/logo1.jpg"; // Import โลโก้

export default function NavBar({ onOpen }) {
  return (
    <>
      {/* Navbar Container */}
      <div className="bg-base-100 shadow-lg">
        <div className="navbar bg-white">
          {/* Navbar Start */}
          <div className="navbar-start">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-4">
              <img
                src={Logo} // แสดงโลโก้
                alt="Logo"
                className="h-12 w-12 rounded-full" // ปรับขนาดโลโก้
              />
              <div>
                <p className="font-bold text-lg">
                  องค์การบริหารส่วนจังหวัดนนทบุรี
                </p>
                <p className="text-sm text-gray-500">
                  Nonthaburi Provincial Administrative Organization
                </p>
              </div>
            </Link>
          </div>

          {/* Navbar Center */}
          <div className="navbar-end hidden lg:flex w-full justify-end">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link to="/">หน้าหลัก</Link>
              </li>
              <li>
                <Link to="/profile">ข้อมูลส่วนตัว</Link>
              </li>
              <li>
                <Link to="/apply">สมัครสอบ</Link>
              </li>
              <li>
                <Link to="/history">ประวัติการสมัคร</Link>
              </li>
            </ul>
          </div>

          {/* Navbar End
          <div className="navbar-end">
            <button className="btn btn-primary" onClick={onOpen}>
              ประกาศงาน
            </button>
          </div> */}

          {/* Dropdown for Mobile */}
          <div className="dropdown dropdown-start lg:hidden">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/">หน้าหลัก</Link>
              </li>
              <li>
                <Link to="/profile">ข้อมูลส่วนตัว</Link>
              </li>
              <li>
                <Link to="/apply">สมัครสอบ</Link>
              </li>
              <li>
                <Link to="/history">ประวัติการสมัคร</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Purple Border */}
        <div className="h-1 bg-purple-600"></div>
      </div>
    </>
  );
}
