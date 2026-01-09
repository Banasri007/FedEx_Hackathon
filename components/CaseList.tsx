import React from "react";
import { FileText, Bot } from "lucide-react";
import { Case } from "../types";
import { prioritizeCases } from "../services/geminiService";

const mockCases: Case[] = [
  {
    id: "C001",
    customerName: "John Doe",
    amount: 12000,
    status: "Pending"
  },
  {
    id: "C002",
    customerName: "Jane Smith",
    amount: 45000,
    status: "Overdue"
  }
];

const CaseList: React.FC = () => {
  const handlePrioritize = async () => {
    const result = await prioritizeCases(mockCases.length);
    alert(result);
  };

  return (
    <div style={{ padding: "24px" }}>
      <h2>Case Management</h2>

      <button
        onClick={handlePrioritize}
        style={{
          marginBottom: "16px",
          padding: "8px 14px",
          cursor: "pointer"
        }}
      >
        <Bot size={16} /> Prioritize Cases
      </button>

      <ul>
        {mockCases.map((c) => (
          <li
            key={c.id}
            style={{
              listStyle: "none",
              marginBottom: "12px",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "6px"
            }}
          >
            <strong>{c.customerName}</strong>
            <p>Amount: ₹{c.amount}</p>
            <p>Status: {c.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CaseList;
