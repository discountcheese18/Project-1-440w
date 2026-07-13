import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import "../App.css";

function CreateAccount() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    insurance: "",
    emergencyContact: "",
    dateOfBirth: "",
  });

  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
      firebase: "",
    }));
  };

  const handleCreateAccount = async (event) => {
    event.preventDefault();

    const newErrors = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email address is required.";
    }

    if (!form.password) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (form.password !== form.confirmPassword) {
      newErrors.password = "Passwords do not match.";
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsLoading(true);
      setErrors({});

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email.trim(),
        form.password
      );

      const user = userCredential.user;

      await updateProfile(user, {
        displayName: form.fullName.trim(),
      });

      await setDoc(doc(db, "users", user.uid), {
        userId: user.uid,
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        insurance: form.insurance.trim(),
        emergencyContact: form.emergencyContact.trim(),
        dateOfBirth: form.dateOfBirth,
        role: "patient",
        createdAt: serverTimestamp(),
      });

      setShowSuccess(true);
    } catch (error) {
      console.error("Account creation failed:", error);

      let message = "Unable to create account. Please try again.";

      if (error.code === "auth/email-already-in-use") {
        message = "An account already exists with this email address.";
      } else if (error.code === "auth/invalid-email") {
        message = "Please enter a valid email address.";
      } else if (error.code === "auth/weak-password") {
        message = "Password must be at least 6 characters.";
      } else if (error.code === "auth/operation-not-allowed") {
        message = "Email/password sign-in is not enabled in Firebase.";
      } else if (error.code === "permission-denied") {
        message =
          "Your account was created, but the patient profile could not be saved.";
      }

      setErrors({
        firebase: message,
      });
    } finally {
      setIsLoading(false);
    }
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
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
        />

        <input
          type="text"
          name="insurance"
          placeholder="Insurance Provider"
          value={form.insurance}
          onChange={handleChange}
        />

        <input
          type="text"
          name="emergencyContact"
          placeholder="Emergency Contact Name and Phone"
          value={form.emergencyContact}
          onChange={handleChange}
        />

        <label htmlFor="dateOfBirth">Date of Birth</label>

        <input
          id="dateOfBirth"
          type="date"
          name="dateOfBirth"
          value={form.dateOfBirth}
          onChange={handleChange}
        />

        {errors.firebase && (
          <p className="firebase-error">{errors.firebase}</p>
        )}

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Creating Account..." : "Create Account"}
        </button>

        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Already have an account?{" "}
          <Link to="/login">Sign In</Link>
        </p>
      </form>

      {showSuccess && (
        <div className="popup-overlay">
          <div className="success-popup">
            <h2>Account Created</h2>

            <p>
              Your Remedium Health Market account and patient profile
              were created successfully.
            </p>

            <Link className="popup-button" to="/dashboard">
              Continue to Dashboard
            </Link>

            <button
              type="button"
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