import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import JobPage from "./pages/๋JopPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // ตรวจสอบว่า token มีค่าไหม
  }, []);

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} />
      <Routes>
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
          path="/jobs"
          element={isLoggedIn ? <JobPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}

export default App;
