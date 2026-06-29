function DoctorCard({ doctor }) {
  return (
    <div className="doctor-card">

      <div className="doctor-avatar">
        👨‍⚕️
      </div>

      <h2>{doctor.name}</h2>

      <p><strong>Specialty:</strong> {doctor.specialty}</p>

      <p><strong>Rating:</strong> ⭐ {doctor.rating}</p>

      <p><strong>Consultation:</strong> ${doctor.price}</p>

      <button>Request Second Opinion</button>

    </div>
  );
}

export default DoctorCard;