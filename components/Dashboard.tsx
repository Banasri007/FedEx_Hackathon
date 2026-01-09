import React, { useState } from "react";
import { MessageSquare } from "lucide-react";
import { UserRole } from "../types";
import { chatWithAI } from "../services/geminiService";

const Dashboard: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleAskAI = async () => {
    if (!prompt.trim()) return;
    const result = await chatWithAI(prompt);
    setResponse(result);
  };

  return (
    <div style={{ padding: "24px" }}>
      <h2>Dashboard</h2>

      <div style={{ marginTop: "20px" }}>
        <textarea
          placeholder="Ask AI something..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          style={{
            width: "100%",
            height: "80px",
            padding: "10px",
            fontSize: "14px"
          }}
        />

        <button
          onClick={handleAskAI}
          style={{
            marginTop: "10px",
            padding: "8px 16px",
            cursor: "pointer"
          }}
        >
          Ask AI
        </button>

        {response && (
          <div
            style={{
              marginTop: "15px",
              padding: "12px",
              background: "#f4f4f4",
              borderRadius: "4px"
            }}
          >
            {response}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
