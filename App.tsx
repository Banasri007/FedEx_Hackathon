import React, { useState } from 'react';
import { Layout } from './components/Layout.tsx';
import { Login } from './components/Login.tsx';
import { Dashboard } from './components/Dashboard.tsx';
import { AgencyList } from './components/AgencyList.tsx';
import { DebtAssignment } from './components/DebtAssignment.tsx';
import { CaseList } from './components/CaseList.tsx';
import { SLAConfig } from './components/SLAConfig.tsx';
import { StatusView } from './components/StatusView.tsx';
import { Reports } from './components/Reports.tsx';
import { UserRole } from './types.ts';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [userRole, setUserRole] = useState<UserRole>(UserRole.FEDEX_ADMIN);

  const handleLogin = (role: UserRole) => {
      setUserRole(role);
      setIsAuthenticated(true);
      setCurrentView('dashboard');
  };

  const handleLogout = () => {
      setIsAuthenticated(false);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard role={userRole} />;
      
      // FedEx Routes
      case 'case-management':
        return userRole === UserRole.FEDEX_ADMIN ? <DebtAssignment /> : null;
      case 'status-hub':
        return userRole === UserRole.FEDEX_ADMIN ? <StatusView /> : null;

      // DCA Routes
      case 'assigned-cases':
        return userRole === UserRole.DCA_MANAGER ? <CaseList /> : null;
      case 'sla-view':
         return userRole === UserRole.DCA_MANAGER ? <SLAConfig /> : null;
      case 'dca-reports':
        return userRole === UserRole.DCA_MANAGER ? <Reports /> : null;

      default:
        return <div className="flex items-center justify-center h-full text-gray-400">Module Under Construction</div>;
    }
  };

  if (!isAuthenticated) {
      return <Login onLogin={handleLogin} />;
  }

  return (
    <Layout 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        role={userRole}
        setRole={setUserRole}
        onLogout={handleLogout}
    >
      {renderContent()}
    </Layout>
  );
}

export default App;
