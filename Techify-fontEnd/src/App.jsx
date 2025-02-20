import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import JobPage from "../src/pages/๋JopPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomeMain from "./pages/HomeMain";
import Profile from "./pages/Profile";
import RegisterJob from "../src/pages/RegisterJopPage";
import JobApplicationForm from "../src/pages/๋JopRegisterFrom"; // นำเข้า JobApplicationForm

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // ตรวจสอบว่า token มีหรือไม่
  }, []);

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} />
      <Routes>
        {/* 🔹 ตรวจสอบว่าผู้ใช้ล็อกอินหรือไม่ */}
        <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to="/main" /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/login"
          element={!isLoggedIn ? <LoginPage /> : <Navigate to="/main" />}
        />
        <Route
          path="/register"
          element={!isLoggedIn ? <RegisterPage /> : <Navigate to="/main" />}
        />
        <Route
          path="/main"
          element={isLoggedIn ? <HomeMain /> : <Navigate to="/login" />}
        />
        <Route
          path="/jobs"
          element={isLoggedIn ? <JobPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/registerJob"
          element={isLoggedIn ? <RegisterJob /> : <Navigate to="/login" />}
        />

        {/* ✅ 🔹 เส้นทางสมัครงานแบบมี jobId */}
        <Route
          path="/registerJobStep1/:jobId"
          element={
            isLoggedIn ? <JobApplicationForm /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </>
  );
}

export default App;
