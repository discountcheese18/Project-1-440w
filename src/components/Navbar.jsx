import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>Remedium Health Market</h2>
      <div>
        <Link to="/">Home</Link>
        <Link to="/doctors">Doctors</Link>
        <Link to="/prices">Prices</Link>
        <Link to="/records">Records</Link>
        <Link to="/schedule">Schedule</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;