import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import FindDoctors from "./pages/FindDoctors";
import ComparePrices from "./pages/ComparePrices";
import UploadRecords from "./pages/UploadRecords";
import Schedule from "./pages/Schedule";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />

        <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/doctors" element={<FindDoctors />} />
  <Route path="/prices" element={<ComparePrices />} />
  <Route path="/records" element={<UploadRecords />} />
  <Route path="/schedule" element={<Schedule />} />
  <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>
  <Route path="/login" element={<Login />} />
  <Route path="/create-account" element={<CreateAccount />} />
</Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;