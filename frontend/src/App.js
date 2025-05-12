import React from 'react';

const App = () => {
  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#e3f2fd',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{color: '#007AC2'}}>SoarOps Dashboard</h1>
      <p>Attraction Operations Management System</p>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '20px',
        marginTop: '20px'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '15px',
          borderRadius: '4px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h3>Theater Status</h3>
          <p>All theaters operating normally</p>
        </div>
        
        <div style={{
          backgroundColor: 'white',
          padding: '15px',
          borderRadius: '4px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h3>Current Wait Time</h3>
          <p>45 minutes</p>
        </div>
      </div>
      
      <button 
        style={{
          marginTop: '20px',
          padding: '10px 15px',
          backgroundColor: '#007AC2',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
        onClick={() => alert('Dashboard refreshed!')}
      >
        Refresh Dashboard
      </button>
    </div>
  );
};

export default App;