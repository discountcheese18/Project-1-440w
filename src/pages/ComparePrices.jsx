import { useState } from "react";
import PriceCard from "../components/PriceCard";
import prices from "../data/prices";

function ComparePrices() {
  const [selectedIssue, setSelectedIssue] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");

  const issues = ["All", ...new Set(prices.map((item) => item.issue))];
  const locations = ["All", ...new Set(prices.map((item) => item.location))];
  const types = ["All", ...new Set(prices.map((item) => item.type))];

  let filteredPrices = prices.filter((item) => {
    const issueMatch = selectedIssue === "All" || item.issue === selectedIssue;
    const locationMatch =
      selectedLocation === "All" || item.location === selectedLocation;
    const typeMatch = selectedType === "All" || item.type === selectedType;

    return issueMatch && locationMatch && typeMatch;
  });

  if (sortOrder === "low") {
    filteredPrices = [...filteredPrices].sort((a, b) => a.price - b.price);
  }

  if (sortOrder === "high") {
    filteredPrices = [...filteredPrices].sort((a, b) => b.price - a.price);
  }

  if (sortOrder === "wait") {
    filteredPrices = [...filteredPrices].sort(
      (a, b) => a.waitDays - b.waitDays
    );
  }

  return (
    <div className="page">
      <h1>Compare Treatment Prices</h1>

      <p className="page-description">
        Compare estimated prices from different healthcare providers to improve
        price transparency before scheduling an appointment.
      </p>

      <div className="transparency-note">
        Prices are estimates and are intended to help patients compare options.
        Final costs may vary based on insurance, provider billing, and treatment
        details.
      </div>

      <div className="comparison-controls">
        <div>
          <label>Select Medical Issue / Treatment</label>
          <select
            value={selectedIssue}
            onChange={(e) => setSelectedIssue(e.target.value)}
          >
            {issues.map((issue) => (
              <option key={issue} value={issue}>
                {issue}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Location</label>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Provider Type</label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Sort Results</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="low">Lowest Price</option>
            <option value="high">Highest Price</option>
            <option value="wait">Shortest Wait Time</option>
          </select>
        </div>
      </div>

      <p className="results-count">
        Showing {filteredPrices.length} provider(s)
      </p>

      <div className="price-grid">
        {filteredPrices.map((provider) => (
          <PriceCard key={provider.id} provider={provider} />
        ))}
      </div>
    </div>
  );
}

export default ComparePrices;