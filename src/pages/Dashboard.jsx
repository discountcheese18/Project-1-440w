function Dashboard() {
  return (
    <div className="page">
      <h1>Patient Dashboard</h1>
      <p className="page-description">
        Overview of patient activity, second opinions, uploaded records, and
        price transparency results.
      </p>

      <div className="dashboard">
        <div className="dashboard-box">
          <h2>5</h2>
          <p>Uploaded Records</p>
        </div>
        <div className="dashboard-box">
          <h2>3</h2>
          <p>Second Opinion Requests</p>
        </div>
        <div className="dashboard-box">
          <h2>2</h2>
          <p>Appointments Scheduled</p>
        </div>
        <div className="dashboard-box">
          <h2>$420</h2>
          <p>Estimated Cost Difference Found</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;