import React, { useState } from "react";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import AgencyList from "./components/AgencyList";
import CaseList from "./components/CaseList";
import DebtAssignment from "./components/DebtAssignment";
import Reports from "./components/Reports";
import SLAConfig from "./components/SLAConfig";
import StatusView from "./components/StatusView";

type Page =
  | "dashboard"
  | "agencies"
  | "cases"
  | "assignment"
  | "reports"
  | "sla"
  | "status";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<Page>("dashboard");

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard />;
      case "agencies":
        return <AgencyList />;
      case "cases":
        return <CaseList />;
      case "assignment":
        return <DebtAssignment />;
      case "reports":
        return <Reports />;
      case "sla":
        return <SLAConfig />;
      case "status":
        return <StatusView />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout
      activePage={activePage}
      onNavigate={(page: Page) => setActivePage(page)}
    >
      {renderPage()}
    </Layout>
  );
};

export default App;
