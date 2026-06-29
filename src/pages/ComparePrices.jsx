import PriceCard from "../components/PriceCard";
import prices from "../data/prices";

function ComparePrices() {
  return (
    <div className="page">
      <h1>Compare Treatment Prices</h1>

      <p className="page-description">
        Compare estimated prices from different healthcare providers to improve
        price transparency before scheduling an appointment.
      </p>

      <div className="price-grid">
        {prices.map((provider) => (
          <PriceCard key={provider.id} provider={provider} />
        ))}
      </div>
    </div>
  );
}

export default ComparePrices;