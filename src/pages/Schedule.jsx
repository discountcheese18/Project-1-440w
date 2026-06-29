function Schedule() {
  return (
    <div className="page">

      <h1>Schedule Appointment</h1>

      <p className="page-description">
        Select a provider and request an appointment.
      </p>

      <div className="schedule-card">

        <input placeholder="Full Name" />

        <input placeholder="Healthcare Provider" />

        <select>

          <option>Orthopedics</option>
          <option>Neurology</option>
          <option>Cardiology</option>
          <option>Radiology</option>

        </select>

        <input type="date"/>

        <textarea
          rows="5"
          placeholder="Describe your symptoms or reason for appointment"
        />

        <button>Request Appointment</button>

      </div>

    </div>
  );
}

export default Schedule;