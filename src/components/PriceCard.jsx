function PriceCard({ provider }) {
  return (
    <div className="price-card">
      <h2>{provider.provider}</h2>

      <p>
        <strong>Treatment:</strong> {provider.treatment}
      </p>

      <p>
        <strong>Estimated Price:</strong> ${provider.price}
      </p>

      <p>
        <strong>Location:</strong> {provider.location}
      </p>

      <p>
        <strong>Wait Time:</strong> {provider.wait}
      </p>

      <button>Schedule Appointment</button>
    </div>
  );
}

export default PriceCard;