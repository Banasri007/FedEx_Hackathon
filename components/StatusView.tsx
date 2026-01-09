import React from "react";
import { CheckCircle, Clock, AlertTriangle } from "lucide-react";

const statuses = [
  {
    label: "Active Cases",
    value: 124,
    icon: CheckCircle,
    color: "#22c55e"
  },
  {
    label: "Pending Review",
    value: 37,
    icon: Clock,
    color: "#f59e0b"
  },
  {
    label: "Overdue",
    value: 19,
    icon: AlertTriangle,
    color: "#ef4444"
  }
];

const StatusView: React.FC = () => {
  return (
    <div style={{ padding: "24px" }}>
      <h2>System Status</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "24px"
        }}
      >
        {statuses.map((s) => (
          <div
            key={s.label}
            style={{
              flex: 1,
              padding: "16px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              textAlign: "center"
            }}
          >
            <s.icon size={32} color={s.color} />
            <h3 style={{ marginTop: "10px" }}>{s.value}</h3>
            <p>{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusView;
