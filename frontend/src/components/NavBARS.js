import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const NavBARS = () => {
  const { currentUser, logout, isAdmin } = useAuth();
  const currentTime = new Date();

  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="d-flex align-center justify-between" style={{
      borderBottom: '2px solid var(--color-border)',
      paddingBottom: '15px',
      marginBottom: '20px'
    }}>
      <div className="d-flex align-center">
        <div style={{
          width: '40px',
          height: '40px',
          backgroundColor: 'var(--color-primary)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '20px',
          marginRight: '15px'
        }}>S</div>
        <div>
          <h1 style={{ 
            fontSize: '26px',
            margin: '0 0 4px 0',
            fontWeight: '600',
            letterSpacing: '-0.5px'
          }}>SoarOps Dashboard</h1>
          <p style={{ 
            color: 'var(--color-text-secondary)', 
            fontSize: '15px',
            margin: 0
          }}>{formattedDate} • {formattedTime}</p>
        </div>
      </div>
      
      <div className="d-flex align-center">
        {currentUser && (
          <>
            <div className="text-right mr-4" style={{ marginRight: '15px' }}>
              <div style={{ fontWeight: '500' }}>{currentUser.name}</div>
              <div className="text-secondary" style={{ fontSize: '13px' }}>
                {isAdmin ? 'Leadership Access' : currentUser.position}
              </div>
            </div>
            <button
              className="btn"
              onClick={logout}
            >
              Sign Out
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBARS;
