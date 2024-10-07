import React, { createContext, useContext, useState } from 'react';


const AuthContext = createContext();

const roles = {
  ADMIN: 'ADMIN',
  USER: 'USER',
};

const permissions = {
  [roles.ADMIN]: ['view_dashboard', 'edit_users'],
  [roles.USER]: ['view_dashboard'],
};

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(roles.USER);

  const hasPermission = (permission) => {
    return permissions[role]?.includes(permission);
  };

  return (
    <AuthContext.Provider value={{ role, setRole, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

const Dashboard = () => {
  const { hasPermission } = useAuth();

  return (
    <div className="container mt-3">
      <h1>Dashboard</h1>
      {hasPermission('view_dashboard') ? (
        <p>Welcome to the dashboard!</p>
      ) : (
        <p>You do not have access to view the dashboard.</p>
      )}
    </div>
  );
};

const AdminPanel = () => {
  const { hasPermission } = useAuth();

  return (
    <div className="container mt-3">
      <h1>Admin Panel</h1>
      {hasPermission('edit_users') ? (
        <p>You can edit users here.</p>
      ) : (
        <p>You do not have permission to access the Admin Panel.</p>
      )}
    </div>
  );
};

const RoleSwitcher = () => {
  const { setRole } = useAuth();

  return (
    <div className="container mt-3">
      <h2>Switch Role</h2>
      <div className="btn-group" role="group">
        <button className="btn btn-primary" onClick={() => setRole('USER')}>User</button>
        <button className="btn btn-secondary" onClick={() => setRole('ADMIN')}>Admin</button>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <RoleSwitcher />
      <Dashboard />
      <AdminPanel />
    </AuthProvider>
  );
};

export default App;
