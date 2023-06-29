import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import OTPPage from "./pages/OTPPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/verify-otp" element={<OTPPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
