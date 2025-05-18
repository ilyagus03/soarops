import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import Main from './Main';
import NavBARS from './components/NavBARS';

const AppContent = () => {
  const { currentUser } = useAuth();

  return (
    <>
      {currentUser ? (
        <div className="dashboard-container">
          <NavBARS />
          <Main />
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
