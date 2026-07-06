function PriceCard({ provider }) {
  return (
    <div className="price-card enhanced-price-card">
      <div className="hospital-icon">🏥</div>

      <div className="price-content">
        <h2>{provider.provider}</h2>

        <p><strong>Treatment:</strong> {provider.issue}</p>
        <p><strong>Estimated Price:</strong> <span className="green-price">${provider.price}</span></p>
        <p><strong>Location:</strong> {provider.location}</p>
        <p><strong>Wait Time:</strong> {provider.wait}</p>

        <button onClick={() => alert(`${provider.provider} selected. Continue to scheduling.`)}>
          Select Provider
        </button>
      </div>
    </div>
  );
}

export default PriceCard;