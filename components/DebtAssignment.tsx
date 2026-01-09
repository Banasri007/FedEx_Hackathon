import React from "react";
import { ArrowRightCircle } from "lucide-react";
import { Case, Agency } from "../types";

const mockCases: Case[] = [
  {
    id: "C101",
    customerName: "Rahul Kumar",
    amount: 25000,
    status: "Pending"
  },
  {
    id: "C102",
    customerName: "Anita Sharma",
    amount: 18000,
    status: "Overdue"
  }
];

const mockAgencies: Agency[] = [
  {
    id: "A01",
    name: "Alpha Collections",
    status: "ACTIVE",
    assignedCases: 120,
    recoveryRate: 72
  },
  {
    id: "A02",
    name: "Beta Recoveries",
    status: "ACTIVE",
    assignedCases: 95,
    recoveryRate: 65
  }
];

const DebtAssignment: React.FC = () => {
  const handleAssign = (caseId: string, agencyName: string) => {
    alert(`Assigned case ${caseId} to ${agencyName}`);
  };

  return (
    <div style={{ padding: "24px" }}>
      <h2>Debt Assignment</h2>

      {mockCases.map((c) => (
        <div
          key={c.id}
          style={{
            marginTop: "16px",
            padding: "12px",
            border: "1px solid #ddd",
            borderRadius: "6px"
          }}
        >
          <strong>{c.customerName}</strong>
          <p>Amount: ₹{c.amount}</p>

          <select
            defaultValue=""
            style={{ marginTop: "8px", padding: "6px" }}
            onChange={(e) => handleAssign(c.id, e.target.value)}
          >
            <option value="" disabled>
              Assign to agency
            </option>
            {mockAgencies.map((a) => (
              <option key={a.id} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default DebtAssignment;
