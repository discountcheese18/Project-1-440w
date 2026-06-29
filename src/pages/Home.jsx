import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">

      <section className="hero">
        <h1>Remedium Health Market</h1>

        <h2>Your Healthcare Marketplace</h2>

        <p>
          Compare treatment prices, request multiple medical opinions,
          securely upload MRI and medical imaging, and schedule appointments—
          all from one platform.
        </p>

        <Link to="/doctors">
          <button>Get Started</button>
        </Link>
      </section>

      <section className="features">

        <div className="feature">
          <h3>💲 Compare Prices</h3>
          <p>
            View treatment costs from multiple providers to help patients make
            informed healthcare decisions.
          </p>
        </div>

        <div className="feature">
          <h3>👨‍⚕️ Multiple Doctor Opinions</h3>
          <p>
            Connect with different specialists for additional medical opinions.
          </p>
        </div>

        <div className="feature">
          <h3>🩻 Medical Imaging</h3>
          <p>
            Securely upload MRI scans and medical records for review.
          </p>
        </div>

        <div className="feature">
          <h3>📅 Appointment Scheduling</h3>
          <p>
            Schedule appointments after comparing providers and pricing.
          </p>
        </div>

      </section>

    </div>
  );
}

export default Home;