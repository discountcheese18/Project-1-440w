import React from "react";
import "../App.css";

function Dashboard() {
  return (
    <div className="page">
      <div className="dashboard-header">
        <div>
          <p className="eyebrow">Patient Portal</p>
          <h1>Welcome back</h1>
          <p>
            Manage second opinions, appointments, uploaded records, and treatment price comparisons.
          </p>
        </div>

        <button className="primary-action">Schedule Appointment</button>
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
          <h2>2</h2>
          <p>Next visit: June 14</p>
        </div>

        <div className="stat-card">
          <span>Estimated Savings</span>
          <h2>$440</h2>
          <p>Based on recent price searches</p>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="panel">
          <h2>Upcoming Appointments</h2>

          <div className="list-item">
            <div>
              <strong>Orthopedic Consultation</strong>
              <p>Dr. Emily Carter • June 14, 10:30 AM</p>
            </div>
            <span className="status confirmed">Confirmed</span>
          </div>

          <div className="list-item">
            <div>
              <strong>MRI Review</strong>
              <p>Radiology Center • June 18, 2:00 PM</p>
            </div>
            <span className="status pending">Pending</span>
          </div>
        </div>

        <div className="panel">
          <h2>Recent Activity</h2>

          <div className="activity-item">
            <span className="dot"></span>
            <p>MRI records uploaded successfully.</p>
          </div>

          <div className="activity-item">
            <span className="dot"></span>
            <p>Price comparison found a lower-cost imaging option.</p>
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