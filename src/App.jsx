import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import FindDoctors from "./pages/FindDoctors";
import ComparePrices from "./pages/ComparePrices";
import UploadRecords from "./pages/UploadRecords";
import Schedule from "./pages/Schedule";
import Dashboard from "./pages/Dashboard";

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
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;