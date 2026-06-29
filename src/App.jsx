function App() {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "40px",
        backgroundColor: "#f5f7fa",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ color: "#0066cc" }}>MedConnect</h1>

      <h2>Your Healthcare Marketplace</h2>

      <p>
        Compare treatment prices, receive multiple medical opinions,
        securely upload medical imaging, and schedule appointments—all
        in one place.
      </p>

      <hr />

      <h3>Main Features</h3>

      <ul>
        <li>💲 Compare healthcare prices</li>
        <li>👨‍⚕️ Multiple doctor opinions</li>
        <li>🩻 MRI & medical image sharing</li>
        <li>🔒 Secure patient records</li>
        <li>📅 Appointment scheduling</li>
      </ul>

      <button
        style={{
          background: "#0066cc",
          color: "white",
          border: "none",
          padding: "12px 24px",
          borderRadius: "8px",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        Get Started
      </button>
    </div>
  );
}

export default App;