import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase";
import "../App.css";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    setError("");
    setMessage("");
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!form.email.trim() || !form.password) {
      setError("Please enter your email address and password.");
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      setMessage("");

      await signInWithEmailAndPassword(
        auth,
        form.email.trim(),
        form.password
      );

      navigate("/dashboard");
    } catch (firebaseError) {
      console.error(firebaseError);

      let errorMessage = "Unable to sign in. Please try again.";

      if (
        firebaseError.code === "auth/invalid-credential" ||
        firebaseError.code === "auth/wrong-password" ||
        firebaseError.code === "auth/user-not-found"
      ) {
        errorMessage = "The email or password is incorrect.";
      } else if (firebaseError.code === "auth/invalid-email") {
        errorMessage = "Please enter a valid email address.";
      } else if (firebaseError.code === "auth/too-many-requests") {
        errorMessage =
          "Too many unsuccessful attempts. Please wait and try again.";
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    const email = form.email.trim();

    setError("");
    setMessage("");

    if (!email) {
      setError(
        "Enter your email address above before requesting a password reset."
      );
      return;
    }

    try {
      setIsResetting(true);

      await sendPasswordResetEmail(auth, email);

      setMessage(
        "Password reset email sent. Check your inbox and spam folder."
      );
    } catch (firebaseError) {
      console.error("Password reset failed:", firebaseError);

      let errorMessage =
        "The password reset email could not be sent.";

      if (firebaseError.code === "auth/invalid-email") {
        errorMessage = "Please enter a valid email address.";
      } else if (firebaseError.code === "auth/too-many-requests") {
        errorMessage =
          "Too many reset requests. Please wait before trying again.";
      }

      setError(errorMessage);
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="page">
      <h1>Patient Login</h1>

      <form className="schedule-card" onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <button
          type="button"
          onClick={handlePasswordReset}
          disabled={isResetting}
          style={{
            background: "none",
            border: "none",
            color: "#0b63ce",
            cursor: "pointer",
            padding: "0",
            textDecoration: "underline",
          }}
        >
          {isResetting ? "Sending reset email..." : "Forgot Password?"}
        </button>

        {error && <p className="firebase-error">{error}</p>}

        {message && (
          <p style={{ color: "green", textAlign: "center" }}>
            {message}
          </p>
        )}

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Signing In..." : "Sign In"}
        </button>

        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Don&apos;t have an account?{" "}
          <Link to="/create-account">Create one.</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;