import { useState } from "react";
import DoctorCard from "../components/DoctorCard";
import doctors from "../data/doctors";

function FindDoctors() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDoctors = doctors.filter((doctor) => {
    const searchText = searchTerm.toLowerCase();

    return (
      doctor.name.toLowerCase().includes(searchText) ||
      doctor.specialty.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="page">
      <h1>Find Healthcare Providers</h1>

      <p className="page-description">
        Browse healthcare providers, compare specialties and consultation
        prices, and request a second opinion.
      </p>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search by doctor name or specialty..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>

      <p className="results-count">
        Showing {filteredDoctors.length} provider(s)
      </p>

      <div className="doctor-grid">
        {filteredDoctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </div>
  );
}

export default FindDoctors;