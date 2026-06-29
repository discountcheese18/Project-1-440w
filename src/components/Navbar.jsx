import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        background: "#0f766e",
        padding: "18px",
        display: "flex",
        gap: "25px",
      }}
    >
      <Link style={{ color: "white" }} to="/">Home</Link>
      <Link style={{ color: "white" }} to="/dashboard">Dashboard</Link>
      <Link style={{ color: "white" }} to="/doctors">Doctors</Link>
      <Link style={{ color: "white" }} to="/prices">Prices</Link>
      <Link style={{ color: "white" }} to="/records">Records</Link>
      <Link style={{ color: "white" }} to="/schedule">Schedule</Link>
    </nav>
  );
}

export default Navbar;