import DoctorCard from "../components/DoctorCard";
import doctors from "../data/doctors";

function FindDoctors() {
  return (
    <div className="page">
      <h1>Find Healthcare Providers</h1>

      <p className="page-description">
        Browse healthcare providers, compare specialties and consultation
        prices, and request a second opinion.
      </p>

      <div className="doctor-grid">
        {doctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </div>
  );
}

export default FindDoctors;