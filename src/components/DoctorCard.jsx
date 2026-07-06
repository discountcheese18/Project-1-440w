function DoctorCard({ doctor }) {
  return (
    <div className="doctor-card professional-doctor-card">
      <div className="doctor-top">
        <div className="doctor-initials">
          {doctor.name
            .replace("Dr. ", "")
            .split(" ")
            .map((part) => part[0])
            .join("")}
        </div>

        <div>
          <h2>{doctor.name}</h2>
          <p className="specialty-tag">{doctor.specialty}</p>
        </div>
      </div>

      <div className="doctor-details">
        <p><strong>Rating:</strong> ⭐ {doctor.rating}</p>
        <p><strong>Consultation:</strong> ${doctor.price}</p>
        <p><strong>Location:</strong> {doctor.location}</p>
        <p><strong>Availability:</strong> {doctor.availability}</p>
        <p><strong>Experience:</strong> {doctor.experience}</p>
      </div>

      <button onClick={() => alert(`Second opinion request sent to ${doctor.name}.`)}>
        Request Second Opinion
      </button>
    </div>
  );
}

export default DoctorCard;