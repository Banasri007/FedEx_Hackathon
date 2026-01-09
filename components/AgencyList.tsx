import React from "react";
import {
  Search,
  ShieldAlert,
  CheckCircle,
  BarChart3,
  Bot
} from "lucide-react";
import { Agency, AgencyStatus } from "../types";
import { analyzeAgencyRisk } from "../services/geminiService";

const mockAgencies: Agency[] = [
  {
    id: "A001",
    name: "Alpha Collections",
    status: AgencyStatus.ACTIVE,
    assignedCases: 120,
    recoveryRate: 72
  },
  {
    id: "A002",
    name: "Beta Recoveries",
    status: AgencyStatus.UNDER_REVIEW,
    assignedCases: 80,
    recoveryRate: 58
  }
];

const AgencyList: React.FC = () => {
  const handleAnalyzeRisk = async (agencyName: string) => {
    const result = await analyzeAgencyRisk(agencyName);
    alert(result);
  };

  return (
    <div style={{ padding: "24px" }}>
      <h2>Agency Management</h2>

      <ul style={{ marginTop: "20px" }}>
        {mockAgencies.map((agency) => (
          <li
            key={agency.id}
            style={{
              listStyle: "none",
              marginBottom: "16px",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "6px"
            }}
          >
            <strong>{agency.name}</strong>
            <p>Status: {agency.status}</p>
            <p>Assigned Cases: {agency.assignedCases}</p>
            <p>Recovery Rate: {agency.recoveryRate}%</p>

            <button
              onClick={() => handleAnalyzeRisk(agency.name)}
              style={{
                marginTop: "8px",
                padding: "6px 12px",
                cursor: "pointer"
              }}
            >
              <Bot size={16} /> Analyze Risk
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AgencyList;
