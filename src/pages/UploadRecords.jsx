function UploadRecords() {
  return (
    <div className="page">

      <h1>Medical Records</h1>

      <p className="page-description">
        Securely upload MRI images, CT scans, X-rays, referrals, and medical
        documents to share with healthcare providers.
      </p>

      <div className="upload-container">

        <div className="upload-card">

          <h2>Upload New Record</h2>

          <input type="file" />

          <button>Upload File</button>

        </div>

        <div className="records-card">

          <h2>Uploaded Records</h2>

          <table>

            <thead>
              <tr>
                <th>File</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <td>MRI_Left_Knee.pdf</td>
                <td>Uploaded</td>
                <td>06/29/2026</td>
              </tr>

              <tr>
                <td>Xray_Shoulder.jpg</td>
                <td>Shared</td>
                <td>06/18/2026</td>
              </tr>

              <tr>
                <td>Referral.pdf</td>
                <td>Pending Review</td>
                <td>06/15/2026</td>
              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default UploadRecords;