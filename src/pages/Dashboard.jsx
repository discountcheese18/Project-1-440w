import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import "../App.css";

function Dashboard() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("Patient");
  const [userEmail, setUserEmail] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [appointmentsLoading, setAppointmentsLoading] = useState(true);
  const [appointmentsError, setAppointmentsError] = useState("");

  useEffect(() => {
    let unsubscribeAppointments = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/login");
        return;
      }

      setUserName(currentUser.displayName || "Patient");
      setUserEmail(currentUser.email || "");

      const appointmentsQuery = query(
        collection(db, "appointments"),
        where("userId", "==", currentUser.uid)
      );

      unsubscribeAppointments = onSnapshot(
        appointmentsQuery,
        (snapshot) => {
          const appointmentList = snapshot.docs.map((document) => ({
            id: document.id,
            ...document.data(),
          }));

          appointmentList.sort((a, b) =>
            String(a.date || "").localeCompare(String(b.date || ""))
          );

          setAppointments(appointmentList);
          setAppointmentsLoading(false);
          setAppointmentsError("");
        },
        (error) => {
          console.error("Error loading appointments:", error);
          setAppointmentsError("Appointments could not be loaded.");
          setAppointmentsLoading(false);
        }
      );
    });

    return () => {
      unsubscribeAuth();

      if (unsubscribeAppointments) {
        unsubscribeAppointments();
      }
    };
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const formatAppointmentDate = (dateValue) => {
    if (!dateValue) {
      return "Date unavailable";
    }

    const appointmentDate = new Date(`${dateValue}T00:00:00`);

    return appointmentDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const nextAppointment = appointments[0];

  return (
    <div className="page">
      <div className="dashboard-header">
        <div>
          <p className="eyebrow">Patient Portal</p>

          <h1>Welcome back, {userName}</h1>

          <p className="dashboard-email">{userEmail}</p>

          <p>
            Manage second opinions, appointments, uploaded records,
            and treatment price comparisons.
          </p>
        </div>

        <div className="dashboard-header-actions">
          <button
            type="button"
            className="primary-action"
            onClick={() => navigate("/schedule")}
          >
            Schedule Appointment
          </button>

          <button
            type="button"
            className="logout-button"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="stat-card">
          <span>Uploaded Records</span>
          <h2>5</h2>
          <p>2 reviewed by providers</p>
        </div>

        <div className="stat-card">
          <span>Second Opinions</span>
          <h2>3</h2>
          <p>1 response pending</p>
        </div>

        <div className="stat-card">
          <span>Appointments</span>
          <h2>{appointments.length}</h2>
          <p>
            {nextAppointment
              ? `Next visit: ${formatAppointmentDate(nextAppointment.date)}`
              : "No appointments scheduled"}
          </p>
        </div>

        <div className="stat-card">
          <span>Estimated Savings</span>
          <h2>$420</h2>
          <p>Based on recent price searches</p>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="panel">
          <h2>Upcoming Appointments</h2>

          {appointmentsLoading && <p>Loading appointments...</p>}

          {appointmentsError && <p>{appointmentsError}</p>}

          {!appointmentsLoading &&
            !appointmentsError &&
            appointments.length === 0 && (
              <p>You do not have any scheduled appointments.</p>
            )}

          {!appointmentsLoading &&
            !appointmentsError &&
            appointments.map((appointment) => (
              <div className="list-item" key={appointment.id}>
                <div>
                  <strong>
                    {appointment.specialty || "Medical Appointment"}
                  </strong>

                  <p>
                    {appointment.provider || "Healthcare Provider"} •{" "}
                    {formatAppointmentDate(appointment.date)}
                  </p>

                  {appointment.reason && (
                    <p>{appointment.reason}</p>
                  )}
                </div>

                <span className="status pending">
                  {appointment.status || "Requested"}
                </span>
              </div>
            ))}
        </div>

        <div className="panel">
          <h2>Recent Activity</h2>

          <div className="activity-item">
            <span className="dot"></span>
            <p>MRI records uploaded successfully.</p>
          </div>

          <div className="activity-item">
            <span className="dot"></span>
            <p>
              Price comparison found a lower-cost imaging option.
            </p>
          </div>

          <div className="activity-item">
            <span className="dot"></span>
            <p>Second opinion request sent to provider.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;