import React from "react";
import {
  Home,
  Users,
  FileText,
  Shuffle,
  BarChart3,
  Settings,
  Activity
} from "lucide-react";

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activePage,
  onNavigate
}) => {
  const menuItems = [
    { key: "dashboard", label: "Dashboard", icon: Home },
    { key: "agencies", label: "Agencies", icon: Users },
    { key: "cases", label: "Cases", icon: FileText },
    { key: "assignment", label: "Debt Assignment", icon: Shuffle },
    { key: "reports", label: "Reports", icon: BarChart3 },
    { key: "sla", label: "SLA Config", icon: Settings },
    { key: "status", label: "Status", icon: Activity }
  ];

  return (
    <aside
      style={{
        width: "240px",
        background: "#1e293b",
        color: "#fff",
        padding: "16px"
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>FedEx</h2>

      {menuItems.map((item) => (
        <div
          key={item.key}
          onClick={() => onNavigate(item.key)}
          style={{
            padding: "10px",
            marginBottom: "8px",
            cursor: "pointer",
            borderRadius: "6px",
            background:
              activePage === item.key ? "#334155" : "transparent"
          }}
        >
          <item.icon size={16} style={{ marginRight: "8px" }} />
          {item.label}
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
