import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function CreateAccount() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!form.fullName.trim())
      newErrors.fullName = "Full Name is required.";

    if (!form.email.trim())
      newErrors.email = "Email Address is required.";

    if (!form.password)
      newErrors.password = "Password is required.";

    if (!form.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password.";

    if (
      form.password &&
      form.confirmPassword &&
      form.password !== form.confirmPassword
    ) {
      newErrors.password = "Passwords do not match.";
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setShowSuccess(true);
  };

  return (
    <div className="page">
      <h1>Create Account</h1>

      <form className="schedule-card" onSubmit={handleCreateAccount}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          className={errors.fullName ? "input-error" : ""}
        />
        {errors.fullName && (
          <p className="error-text">{errors.fullName}</p>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          className={errors.email ? "input-error" : ""}
        />
        {errors.email && (
          <p className="error-text">{errors.email}</p>
        )}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className={errors.password ? "input-error" : ""}
        />
        {errors.password && (
          <p className="error-text">{errors.password}</p>
        )}

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          className={errors.confirmPassword ? "input-error" : ""}
        />
        {errors.confirmPassword && (
          <p className="error-text">{errors.confirmPassword}</p>
        )}

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number (Optional)"
          value={form.phone}
          onChange={handleChange}
        />

        <button type="submit">
          Create Account
        </button>

        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Already have an account?{" "}
          <Link to="/login">Sign In</Link>
        </p>
      </form>

      {showSuccess && (
        <div className="popup-overlay">
          <div className="success-popup">
            <h2>✓ Account Created!</h2>

            <p>
              Your Remedium Health Market account has been successfully
              created.
            </p>

            <Link className="popup-button" to="/login">
              Continue to Login
            </Link>

            <button
              className="popup-close"
              onClick={() => setShowSuccess(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateAccount;