import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NavbarLogin from "../src/components/NavBar"; // Navbar สำหรับหน้า Login/Register
import NavbarMain from "../src/components/NavBarMain"; // Navbar สำหรับหน้าหลังจากล็อกอิน
import JobPage from "./pages/๋JopPage"; //หน้าประกาศงาน
import LoginPage from "./pages/LoginPage"; // หน้า login
import RegisterFromPage from "./pages/RegisterFromPage"; // หน้าสมัครงาน
import HomeMain from "./pages/HomeMain";
import Profile from "./pages/Profile";
import RegisterJob from "./pages/RegisterJopPage";
import JobApplicationForm from "./pages/๋JopRegisterFrom";
import LoginSuccess from "./components/LoginSuccess";
import JobHistoryPage from "./pages/JobHistoryPage";
import RegisterPage from "./pages/RegisterPage";
import Ifpage from "./pages/Ifpage";
import JobDetail from "./components/Details";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      console.log("🔹 Checking token in App:", token);
      setIsLoggedIn(!!token);
    };

    checkAuth(); // ตรวจสอบสถานะตอนโหลดหน้า
    const interval = setInterval(checkAuth, 1000); // ตรวจสอบทุก 1 วินาที
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <>
      {/* ✅ ใช้ NavbarLogin ในหน้า Login/Register */}
      {/* ✅ ใช้ NavbarMain ในหน้าที่ล็อกอินแล้ว */}
      {isLoggedIn ? (
        <NavbarMain handleLogout={handleLogout} />
      ) : (
        <NavbarLogin />
      )}

      <Routes>
        <Route path="/login-success" element={<LoginSuccess />} />

        {/* ✅ เปลี่ยนเส้นทางตามสถานะล็อกอิน */}
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/main" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/login"
          element={
            !isLoggedIn ? <LoginPage /> : <Navigate to="/main" replace />
          }
        />

        <Route
          path="/register"
          element={
            !isLoggedIn ? <RegisterPage /> : <Navigate to="/main" replace />
          }
        />

        <Route
          path="/main"
          element={isLoggedIn ? <HomeMain /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/jobs"
          element={isLoggedIn ? <JobPage /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/profile"
          element={isLoggedIn ? <Profile /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/ifpage/:jobId"
          element={
            isLoggedIn ? <Ifpage /> : <Navigate to="/login" replace />
          }
        />

<Route
          path="/registerJob"
          element={
            isLoggedIn ? <RegisterJob /> : <Navigate to="/login" replace />
          }
        />

        {/* ✅ เส้นทางหน้า "ประวัติการสมัครงาน" */}
        <Route
          path="/job-history"
          element={
            isLoggedIn ? <JobHistoryPage /> : <Navigate to="/login" replace />
          }
        />

<Route
          path="/jobDetail/:jobId"
          element={
            isLoggedIn ? <JobDetail /> : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/registerFrom/:jobId"
          element={
            isLoggedIn ? <RegisterFromPage /> : <Navigate to="/login" replace />
          }
        />

        {/* <Route
          path="/registerJobStep1/:jobId"
          element={
            isLoggedIn ? (
              <JobApplicationForm />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        /> */}
      </Routes>
    </>
  );
}

export default App;
