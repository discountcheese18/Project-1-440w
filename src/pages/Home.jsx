import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <section className="hero">
        <h1>Remedium Health Market</h1>
        <h2>Healthcare decisions made clearer.</h2>
        <p>
          Compare treatment prices, request multiple medical opinions, securely
          upload medical records, and schedule appointments from one platform.
        </p>
        <Link to="/doctors">
          <button>Get Started</button>
        </Link>
      </section>

      <section className="features">
        <div className="feature">
          <h3>Price Transparency</h3>
          <p>Compare estimated costs from different healthcare providers.</p>
        </div>
        <div className="feature">
          <h3>Second Opinions</h3>
          <p>Request feedback from multiple medical professionals.</p>
        </div>
        <div className="feature">
          <h3>Medical Record Sharing</h3>
          <p>Upload MRI images, referrals, and medical documents.</p>
        </div>
        <div className="feature">
          <h3>Appointment Scheduling</h3>
          <p>Book appointments after comparing providers and costs.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;