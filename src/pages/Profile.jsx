import React, { useEffect, useState } from "react";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";
import "../App.css";

function Profile() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    insurance: "",
    emergencyContact: "",
    dateOfBirth: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        const userDocument = await getDoc(
          doc(db, "users", currentUser.uid)
        );

        if (userDocument.exists()) {
          const userData = userDocument.data();

          setForm({
            fullName:
              userData.fullName || currentUser.displayName || "",
            email: currentUser.email || "",
            phone: userData.phone || "",
            insurance: userData.insurance || "",
            emergencyContact: userData.emergencyContact || "",
            dateOfBirth: userData.dateOfBirth || "",
          });
        } else {
          setForm((currentForm) => ({
            ...currentForm,
            fullName: currentUser.displayName || "",
            email: currentUser.email || "",
          }));
        }
      } catch (error) {
        console.error("Error loading profile:", error);
        setMessage("Profile could not be loaded.");
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleSave = async (event) => {
    event.preventDefault();

    const currentUser = auth.currentUser;

    if (!currentUser) {
      setMessage("You must be logged in to update your profile.");
      return;
    }

    try {
      setSaving(true);
      setMessage("");

      await updateProfile(currentUser, {
        displayName: form.fullName.trim(),
      });

      await setDoc(
        doc(db, "users", currentUser.uid),
        {
          userId: currentUser.uid,
          fullName: form.fullName.trim(),
          email: currentUser.email || "",
          phone: form.phone.trim(),
          insurance: form.insurance.trim(),
          emergencyContact: form.emergencyContact.trim(),
          dateOfBirth: form.dateOfBirth,
          role: "patient",
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      setMessage("Profile updated successfully.");
    } catch (error) {
      console.error("Error saving profile:", error);
      setMessage("Profile could not be updated.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="page">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Patient Profile</h1>

      <p className="page-description">
        View and update your personal healthcare information.
      </p>

      <form className="schedule-card" onSubmit={handleSave}>
        <label htmlFor="fullName">Full Name</label>

        <input
          id="fullName"
          type="text"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          required
        />

        <label htmlFor="email">Email Address</label>

        <input
          id="email"
          type="email"
          name="email"
          value={form.email}
          disabled
        />

        <label htmlFor="phone">Phone Number</label>

        <input
          id="phone"
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
        />

        <label htmlFor="insurance">Insurance Provider</label>

        <input
          id="insurance"
          type="text"
          name="insurance"
          value={form.insurance}
          onChange={handleChange}
          placeholder="Insurance Provider"
        />

        <label htmlFor="emergencyContact">
          Emergency Contact
        </label>

        <input
          id="emergencyContact"
          type="text"
          name="emergencyContact"
          value={form.emergencyContact}
          onChange={handleChange}
          placeholder="Emergency Contact Name and Phone"
        />

        <label htmlFor="dateOfBirth">Date of Birth</label>

        <input
          id="dateOfBirth"
          type="date"
          name="dateOfBirth"
          value={form.dateOfBirth}
          onChange={handleChange}
        />

        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </button>

        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default Profile;