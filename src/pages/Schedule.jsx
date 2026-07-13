import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

function Schedule() {
  const [fullName, setFullName] = useState("");
  const [provider, setProvider] = useState("");
  const [specialty, setSpecialty] = useState("Orthopedics");
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    const user = auth.currentUser;

    if (!user) {
      setMessage("You must be logged in to schedule an appointment.");
      return;
    }

    if (!fullName || !provider || !date || !reason) {
      setMessage("Please complete all appointment fields.");
      return;
    }

    try {
      setIsSaving(true);

      await addDoc(collection(db, "appointments"), {
        userId: user.uid,
        userEmail: user.email,
        fullName,
        provider,
        specialty,
        date,
        reason,
        status: "Requested",
        createdAt: serverTimestamp(),
      });

      setMessage("Appointment request submitted successfully.");

      setFullName("");
      setProvider("");
      setSpecialty("Orthopedics");
      setDate("");
      setReason("");
    } catch (error) {
      console.error("Error saving appointment:", error);
      setMessage("Appointment could not be saved. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="page">
      <h1>Schedule Appointment</h1>

      <p className="page-description">
        Select a provider and request an appointment.
      </p>

      <form className="schedule-card" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
        />

        <input
          type="text"
          placeholder="Healthcare Provider"
          value={provider}
          onChange={(event) => setProvider(event.target.value)}
        />

        <select
          value={specialty}
          onChange={(event) => setSpecialty(event.target.value)}
        >
          <option value="Orthopedics">Orthopedics</option>
          <option value="Neurology">Neurology</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Radiology">Radiology</option>
        </select>

        <input
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />

        <textarea
          rows="5"
          placeholder="Describe your symptoms or reason for appointment"
          value={reason}
          onChange={(event) => setReason(event.target.value)}
        />

        <button type="submit" disabled={isSaving}>
          {isSaving ? "Saving..." : "Request Appointment"}
        </button>

        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default Schedule;