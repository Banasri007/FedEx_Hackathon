import React, { useState } from "react";

const SLAConfig: React.FC = () => {
  const [threshold, setThreshold] = useState<number>(72);
  const [penalty, setPenalty] = useState<number>(5);

  const handleSave = () => {
    alert(
      `SLA Config Saved:\nThreshold = ${threshold} hrs\nPenalty = ${penalty}%`
    );
  };

  return (
    <div style={{ padding: "24px" }}>
      <h2>SLA Configuration</h2>

      <div style={{ marginTop: "20px", maxWidth: "400px" }}>
        <label>
          SLA Threshold (hours)
          <input
            type="number"
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            style={{ display: "block", marginTop: "6px", padding: "6px" }}
          />
        </label>

        <label style={{ marginTop: "12px", display: "block" }}>
          Penalty (%)
          <input
            type="number"
            value={penalty}
            onChange={(e) => setPenalty(Number(e.target.value))}
            style={{ display: "block", marginTop: "6px", padding: "6px" }}
          />
        </label>

        <button
          onClick={handleSave}
          style={{
            marginTop: "16px",
            padding: "8px 14px",
            cursor: "pointer"
          }}
        >
          Save SLA Settings
        </button>
      </div>
    </div>
  );
};

export default SLAConfig;
