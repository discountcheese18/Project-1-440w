import React, { useEffect, useState } from "react";
import "../App.css";

function UploadRecords() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileHash, setFileHash] = useState("");
  const [status, setStatus] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [savedRecords, setSavedRecords] = useState([]);

  useEffect(() => {
    const storedRecords = localStorage.getItem("remediumRecords");

    if (storedRecords) {
      setSavedRecords(JSON.parse(storedRecords));
    }
  }, []);

  const createFileHash = async (file) => {
    const fileBuffer = await file.arrayBuffer();

    const hashBuffer = await crypto.subtle.digest(
      "SHA-256",
      fileBuffer
    );

    const hashArray = Array.from(new Uint8Array(hashBuffer));

    return hashArray
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  };

  const createFakeTransactionId = () => {
    const characters = "abcdef0123456789";
    let result = "0x";

    for (let i = 0; i < 64; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    return result;
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];

    setSelectedFile(file || null);
    setFileHash("");
    setStatus("");

    if (!file) {
      return;
    }

    try {
      const hash = await createFileHash(file);
      setFileHash(hash);
    } catch (error) {
      console.error(error);
      setStatus("Unable to process this file.");
    }
  };

  const handleVerify = () => {
    if (!selectedFile || !fileHash) {
      setStatus("Please select a medical record first.");
      return;
    }

    setIsProcessing(true);
    setStatus("Creating secure verification record...");

    setTimeout(() => {
      const newRecord = {
        id: crypto.randomUUID(),
        fileName: selectedFile.name,
        fileSize: selectedFile.size,
        fileType: selectedFile.type || "Unknown",
        fileHash,
        transactionId: createFakeTransactionId(),
        uploadedAt: new Date().toISOString(),
        verified: true,
      };

      const updatedRecords = [newRecord, ...savedRecords];

      setSavedRecords(updatedRecords);

      localStorage.setItem(
        "remediumRecords",
        JSON.stringify(updatedRecords)
      );

      setStatus("Record verified and saved.");
      setSelectedFile(null);
      setFileHash("");
      setIsProcessing(false);
    }, 1500);
  };

  const deleteRecord = (recordId) => {
    const updatedRecords = savedRecords.filter(
      (record) => record.id !== recordId
    );

    setSavedRecords(updatedRecords);

    localStorage.setItem(
      "remediumRecords",
      JSON.stringify(updatedRecords)
    );
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) {
      return `${bytes} bytes`;
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(2)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="page">
      <div className="records-header">
        <div>
          <p className="eyebrow">Secure Medical Records</p>
          <h1>Upload Medical Records</h1>
          <p>
            Select a sample medical record to create a secure SHA-256
            fingerprint and simulated blockchain verification record.
            The actual file never leaves your computer.
          </p>
        </div>
      </div>

      <div className="upload-record-card">
        <div className="upload-section">
          <h2>Select a Record</h2>

          <p className="upload-description">
            Accepted sample file types: PDF, DICOM, JPG, JPEG, and PNG.
          </p>

          <label className="file-upload-box">
            <input
              key={selectedFile ? selectedFile.name : "empty"}
              type="file"
              accept=".pdf,.dcm,.jpg,.jpeg,.png"
              onChange={handleFileChange}
            />

            <span className="file-upload-icon">↑</span>

            <strong>
              {selectedFile
                ? selectedFile.name
                : "Choose a medical record"}
            </strong>

            <small>Click here to browse your computer</small>
          </label>

          {selectedFile && (
            <div className="selected-file-details">
              <p>
                <strong>File name:</strong> {selectedFile.name}
              </p>

              <p>
                <strong>File size:</strong>{" "}
                {formatFileSize(selectedFile.size)}
              </p>

              <p className="record-hash">
                <strong>SHA-256 hash:</strong> {fileHash}
              </p>
            </div>
          )}

          <button
            type="button"
            className="verify-record-button"
            onClick={handleVerify}
            disabled={isProcessing}
          >
            {isProcessing
              ? "Verifying Record..."
              : "Verify and Save Record"}
          </button>

          {status && (
            <p className="verification-message">{status}</p>
          )}
        </div>

        <div className="verification-panel">
          <div className="verification-panel-header">
            <div className="shield-icon">✓</div>

            <div>
              <h2>Privacy Protection</h2>
              <p>Local demonstration storage</p>
            </div>
          </div>

          <div className="privacy-details">
            <div className="privacy-row">
              <span>Actual file stored</span>
              <strong>No</strong>
            </div>

            <div className="privacy-row">
              <span>File fingerprint</span>
              <strong>SHA-256</strong>
            </div>

            <div className="privacy-row">
              <span>Blockchain mode</span>
              <strong>Simulation</strong>
            </div>

            <div className="privacy-row">
              <span>Storage location</span>
              <strong>This browser only</strong>
            </div>
          </div>

          <div className="demo-notice">
            This prototype saves only file details, the file hash, and a
            simulated transaction ID. It does not upload or store the
            selected medical file.
          </div>
        </div>
      </div>

      <section className="saved-records-section">
        <div className="saved-records-header">
          <div>
            <p className="eyebrow">Verification History</p>
            <h2>Saved Records</h2>
          </div>

          <span className="record-count">
            {savedRecords.length}{" "}
            {savedRecords.length === 1 ? "record" : "records"}
          </span>
        </div>

        {savedRecords.length === 0 ? (
          <div className="empty-records">
            <h3>No saved records yet</h3>
            <p>
              Select a sample file above to create your first
              verification record.
            </p>
          </div>
        ) : (
          <div className="saved-records-list">
            {savedRecords.map((record) => (
              <article className="saved-record-card" key={record.id}>
                <div className="saved-record-top">
                  <div>
                    <div className="verified-badge">
                      ✓ Blockchain Demo Verified
                    </div>

                    <h3>{record.fileName}</h3>

                    <p>
                      {formatFileSize(record.fileSize)} ·{" "}
                      {new Date(record.uploadedAt).toLocaleString()}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="delete-record-button"
                    onClick={() => deleteRecord(record.id)}
                  >
                    Delete
                  </button>
                </div>

                <div className="record-detail-grid">
                  <div>
                    <span>File type</span>
                    <strong>{record.fileType}</strong>
                  </div>

                  <div>
                    <span>Status</span>
                    <strong>Verified</strong>
                  </div>
                </div>

                <div className="record-code-section">
                  <span>SHA-256 fingerprint</span>
                  <code>{record.fileHash}</code>
                </div>

                <div className="record-code-section">
                  <span>Simulated transaction ID</span>
                  <code>{record.transactionId}</code>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default UploadRecords;