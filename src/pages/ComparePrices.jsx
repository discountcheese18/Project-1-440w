import { useState } from "react";
import PriceCard from "../components/PriceCard";
import prices from "../data/prices";

function ComparePrices() {
  const [selectedIssue, setSelectedIssue] = useState("MRI Scan - Lower Back");
  const [sortOrder, setSortOrder] = useState("low");
  const [selectedWait, setSelectedWait] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  const issues = ["All", ...new Set(prices.map((item) => item.issue))];

  let filteredPrices = prices.filter((item) => {
    const issueMatch = selectedIssue === "All" || item.issue === selectedIssue;
    const waitMatch =
      selectedWait === "All" ||
      (selectedWait === "1-3" && item.waitDays <= 3) ||
      (selectedWait === "4-7" && item.waitDays >= 4 && item.waitDays <= 7) ||
      (selectedWait === "7+" && item.waitDays > 7);

    const typeMatch = selectedType === "All" || item.type === selectedType;

    return issueMatch && waitMatch && typeMatch;
  });

  if (sortOrder === "low") {
    filteredPrices = [...filteredPrices].sort((a, b) => a.price - b.price);
  }

  if (sortOrder === "high") {
    filteredPrices = [...filteredPrices].sort((a, b) => b.price - a.price);
  }

  if (sortOrder === "wait") {
    filteredPrices = [...filteredPrices].sort((a, b) => a.waitDays - b.waitDays);
  }

  return (
    <div className="page price-page">
      <h1>Compare Treatment Prices</h1>

      <p className="page-description">
        Compare estimated prices from different healthcare providers to improve
        price transparency before scheduling an appointment.
      </p>

      <div className="transparency-note enhanced-note">
        <span className="info-icon">i</span>
        <span>
          Prices are estimates and are intended to help patients compare options.
          Final costs may vary based on insurance, provider billing, and treatment details.
        </span>
      </div>

      <div className="price-layout">
        <aside className="filter-panel">
          <h3>⚑ Filter Results</h3>

          <label>Max Wait Time</label>
          <select value={selectedWait} onChange={(e) => setSelectedWait(e.target.value)}>
            <option value="All">Any</option>
            <option value="1-3">1 - 3 Days</option>
            <option value="4-7">4 - 7 Days</option>
            <option value="7+">More than 7 Days</option>
          </select>

          <label>Provider Type</label>
          <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
            <option value="All">All</option>
            <option value="Hospital">Hospitals</option>
            <option value="Imaging Center">Imaging Centers</option>
            <option value="Specialty Clinic">Specialty Clinics</option>
            <option value="Primary Care">Primary Care</option>
          </select>

          <button
            className="clear-button"
            onClick={() => {
              setSelectedIssue("All");
              setSortOrder("default");
              setSelectedWait("All");
              setSelectedType("All");
            }}
          >
            Clear Filters
          </button>
        </aside>

        <main>
          <div className="top-controls">
            <div>
              <label>1. Select Medical Issue / Treatment</label>
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
              <label>2. Sort by Price</label>
              <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                <option value="default">Default</option>
                <option value="low">Lowest to Highest</option>
                <option value="high">Highest to Lowest</option>
                <option value="wait">Shortest Wait Time</option>
              </select>
            </div>
          </div>

          <div className="showing-box">
            Showing {filteredPrices.length} provider(s)
            {selectedIssue !== "All" && (
              <>
                {" "}for: <strong>{selectedIssue}</strong>
              </>
            )}
          </div>

          <div className="price-grid enhanced-price-grid">
            {filteredPrices.map((provider) => (
              <PriceCard key={provider.id} provider={provider} />
            ))}
          </div>

          <p className="verified-note">
            🛡 All providers are verified. Your data is secure and private.
          </p>
        </main>
      </div>
    </div>
  );
}

export default ComparePrices;