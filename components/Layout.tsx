import React from "react";
import Sidebar from "./Sidebar";

interface LayoutProps {
  activePage: string;
  onNavigate: (page: string) => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
  activePage,
  onNavigate,
  children
}) => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar activePage={activePage} onNavigate={onNavigate} />

      <main
        style={{
          flex: 1,
          padding: "24px",
          background: "#f9fafb"
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
