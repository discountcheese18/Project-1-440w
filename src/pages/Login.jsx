import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "../App.css";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    setError("");
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

      await signInWithEmailAndPassword(
        auth,
        form.email.trim(),
        form.password
      );

      navigate("/dashboard");
    } catch (firebaseError) {
      console.error(firebaseError);

      let message = "Unable to sign in. Please try again.";

      if (
        firebaseError.code === "auth/invalid-credential" ||
        firebaseError.code === "auth/wrong-password" ||
        firebaseError.code === "auth/user-not-found"
      ) {
        message = "The email or password is incorrect.";
      } else if (firebaseError.code === "auth/invalid-email") {
        message = "Please enter a valid email address.";
      } else if (firebaseError.code === "auth/too-many-requests") {
        message =
          "Too many unsuccessful attempts. Please wait and try again.";
      }

      setError(message);
    } finally {
      setIsLoading(false);
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

        {error && <p className="firebase-error">{error}</p>}

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