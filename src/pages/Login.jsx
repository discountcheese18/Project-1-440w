function Login() {
  return (
    <div className="page">
      <h1>Patient Login</h1>

      <div className="schedule-card">
        <input type="email" placeholder="Email Address" />
        <input type="password" placeholder="Password" />

        <button>Sign In</button>

        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Don't have an account? Create one.
        </p>
      </div>
    </div>
  );
}

export default Login;