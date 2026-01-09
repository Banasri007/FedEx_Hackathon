import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  { name: "Jan", recovery: 65 },
  { name: "Feb", recovery: 70 },
  { name: "Mar", recovery: 75 },
  { name: "Apr", recovery: 68 },
  { name: "May", recovery: 80 }
];

const Reports: React.FC = () => {
  return (
    <div style={{ padding: "24px" }}>
      <h2>Reports & Analytics</h2>

      <div style={{ width: "100%", height: 300, marginTop: "24px" }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="recovery" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Reports;
