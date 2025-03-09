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
import AdminDashboard from "./admin/Adminpagehistory";
import DetailsPage from "./pages/DetailsPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");

      console.log("🔹 Checking token:", token);
      console.log("🔹 Checking userData:", userData);

      setIsLoggedIn(!!token);

      if (userData && userData !== "undefined") {
        try {
          setUserRole(JSON.parse(userData).role);
        } catch (error) {
          console.error("❌ Error parsing userData:", error);
          setUserRole(null);
        }
      } else {
        setUserRole(null);
      }
    };

    checkAuth();
    const interval = setInterval(checkAuth, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserRole(null);
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

        {/* ✅ User Routes */}
        <Route
          path="/main"
          element={isLoggedIn ? <HomeMain /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/profile"
          element={isLoggedIn ? <Profile /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/job-history"
          element={
            isLoggedIn ? <JobHistoryPage /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/registerJob"
          element={
            isLoggedIn ? <RegisterJob /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/ifpage/:jobId"
          element={isLoggedIn ? <Ifpage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/DetailPage/:jobId"
          element={
            isLoggedIn ? <DetailsPage /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/registerFrom/:jobId"
          element={
            isLoggedIn ? <RegisterFromPage /> : <Navigate to="/login" replace />
          }
        />

        {/* ✅ Admin Routes (Admin เท่านั้น) */}
        <Route
          path="/adminHis"
          element={
            isLoggedIn && userRole === "admin" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/jobs"
          element={
            isLoggedIn && userRole === "admin" ? (
              <JobPage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* <Route
          path="/registerJobStep1/:jobId"
          element={isLoggedIn ? <JobApplicationForm /> : <Navigate to="/login" replace />}
        /> */}
      </Routes>
    </>
  );
}

export default App;
