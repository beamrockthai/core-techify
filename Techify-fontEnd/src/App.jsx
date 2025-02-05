import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import JobPage from "./pages/๋JopPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <>
      <NavBar onOpen={() => handleOpen("add")} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />{" "}
        {/* 🔹 รีไดเร็กต์ไป Login */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/jobs" element={<JobPage />} />
      </Routes>
    </>
  );
}

export default App;
