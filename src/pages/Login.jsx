import { Link } from "react-router-dom";
function Login() {
  return (
    <div className="page">
      <h1>Patient Login</h1>

      <div className="schedule-card">
        <input type="email" placeholder="Email Address" />
        <input type="password" placeholder="Password" />

        <button>Sign In</button>

        <p style={{ textAlign: "center", marginTop: "20px" }}>
  Don't have an account?{" "}
  <Link
    to="/create-account"
    style={{
      color: "#2f62e8",
      textDecoration: "none",
      fontWeight: "600",
    }}
  >
    Create one.
  </Link>
</p>
      </div>
    </div>
  );
}

export default Login;