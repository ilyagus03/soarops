import React, { useState, useEffect } from 'react';
import CapacityChart from './components/CapacityChart';
import MaintenanceLog from './components/MaintenanceLog';
import StaffingTable from './components/StaffingTable';
import WaitTimeChart from './components/WaitTimeChart';
import { mockWaitTimeData } from './utils/mockData';

const Main = () => {
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminCode, setAdminCode] = useState('');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showCastAccess, setShowCastAccess] = useState(false);
  const [guestCount, setGuestCount] = useState(36542);
  const [liveWaitTime, setLiveWaitTime] = useState(45);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);


  const theaterCapacityData = [
    { name: 'Theater A', capacity: 87, currentLoad: 82 },
    { name: 'Theater B', capacity: 87, currentLoad: 79 },
    { name: 'Theater C', capacity: 87, currentLoad: 0 }, 
  ];

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

  const verifyAdminCode = () => {
    if (adminCode === '123456789') {
      setIsAdminMode(true);
      setShowAdminModal(false);
    } else {
      alert('Incorrect admin code');
    }
  };

  return (
    <div style={{
      padding: '30px',
      backgroundColor: '#f5f9ff',
      fontFamily: 'Segoe UI, Arial, sans-serif',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      maxWidth: '1100px',
      margin: '30px auto',
      border: '1px solid #e0e8f5'
    }}>
      {showAdminModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '10px',
            width: '350px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
          }}>
            <h2 style={{ 
              margin: '0 0 20px 0', 
              color: '#0066b2',
              fontSize: '20px'
            }}>Admin Login</h2>
            
            <p style={{ fontSize: '14px', color: '#637385', marginBottom: '15px' }}>
              Enter admin code to access staff management:
            </p>
            
            <input 
              type="password"
              value={adminCode}
              onChange={(e) => setAdminCode(e.target.value)}
              placeholder="Enter admin code"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #ddd',
                marginBottom: '20px',
                fontSize: '15px'
              }}
            />
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                style={{
                  padding: '10px 15px',
                  backgroundColor: '#f5f5f5',
                  color: '#333',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
                onClick={() => setShowAdminModal(false)}
              >
                Cancel
              </button>
              
              <button
                style={{
                  padding: '10px 15px',
                  backgroundColor: '#0066b2',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
                onClick={verifyAdminCode}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px',
        borderBottom: '2px solid #e0e8f5',
        paddingBottom: '15px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            backgroundColor: '#0066b2',
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
              color: '#0066b2', 
              fontSize: '26px',
              margin: '0 0 4px 0',
              fontWeight: '600',
              letterSpacing: '-0.5px'
            }}>SoarOps Dashboard</h1>
            <p style={{ 
              color: '#637385', 
              fontSize: '15px',
              margin: 0
            }}>{formattedDate} • {formattedTime}</p>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            style={{
              padding: '12px 20px',
              backgroundColor: '#f1f5fb',
              color: '#0066b2',
              border: '1px solid #e0e8f5',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600'
            }}
            onClick={() => setShowCastAccess(true)}
          >
            Cast Access
          </button>
          
          <button
            style={{
              padding: '12px 20px',
              backgroundColor: isAdminMode ? '#10b981' : '#0066b2',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)'
            }}
            onClick={() => isAdminMode ? setIsAdminMode(false) : setShowAdminModal(true)}
          >
            {isAdminMode ? 'Exit Admin Mode' : 'Admin Access'}
          </button>
        </div>
      </div>
      
      <div style={{ marginBottom: '32px' }}>
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '25px',
          marginBottom: '25px'
        }}>
          <div style={{ 
            padding: '25px', 
            backgroundColor: 'white', 
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            border: '1px solid #eef2f8'
          }}>
            <h3 style={{ 
              color: '#0066b2', 
              borderBottom: '1px solid #eef2f8',
              paddingBottom: '12px',
              marginTop: 0,
              marginBottom: '20px',
              fontSize: '18px',
              fontWeight: '600'
            }}>Current Statistics</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ 
                backgroundColor: '#f8fbff', 
                padding: '15px', 
                borderRadius: '8px',
                border: '1px solid #eef2f8'
              }}>
                <p style={{ 
                  margin: '0 0 5px 0', 
                  color: '#637385', 
                  fontSize: '14px' 
                }}>Total Guests Today</p>
                <p style={{ 
                  margin: 0, 
                  fontSize: '24px', 
                  fontWeight: 'bold', 
                  color: '#0066b2' 
                }}>{guestCount.toLocaleString()}</p>
              </div>
              
              <div style={{ 
                backgroundColor: '#f8fbff', 
                padding: '15px', 
                borderRadius: '8px',
                border: '1px solid #eef2f8'
              }}>
                <p style={{ 
                  margin: '0 0 5px 0', 
                  color: '#637385', 
                  fontSize: '14px' 
                }}>Current Wait Time</p>
                <p style={{ 
                  margin: 0, 
                  fontSize: '24px', 
                  fontWeight: 'bold', 
                  color: '#0066b2' 
                }}>{liveWaitTime} min</p>
              </div>
              
              <div style={{ 
                backgroundColor: '#f8fbff', 
                padding: '15px', 
                borderRadius: '8px',
                border: '1px solid #eef2f8',
                gridColumn: '1 / span 2'
              }}>
                <p style={{ 
                  margin: '0 0 5px 0', 
                  color: '#637385', 
                  fontSize: '14px' 
                }}>Efficiency Rating</p>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <p style={{ 
                    margin: 0, 
                    fontSize: '24px', 
                    fontWeight: 'bold', 
                    color: '#0066b2',
                    marginRight: '10px'
                  }}>94%</p>
                  <div style={{
                    height: '6px',
                    backgroundColor: '#e0e8f5',
                    borderRadius: '3px',
                    width: '150px',
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      height: '6px',
                      width: '94%',
                      backgroundColor: '#0066b2',
                      borderRadius: '3px'
                    }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div style={{ 
            padding: '25px', 
            backgroundColor: 'white', 
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            border: '1px solid #eef2f8'
          }}>
            <h3 style={{ 
              color: '#0066b2', 
              borderBottom: '1px solid #eef2f8',
              paddingBottom: '12px',
              marginTop: 0,
              marginBottom: '30px',
              fontSize: '18px',
              fontWeight: '600'
            }}>Theater Status</h3>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-around', 
              alignItems: 'center',
              height: '100%'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: '50px', 
                  height: '50px', 
                  borderRadius: '50%', 
                  backgroundColor: '#10b981',
                  margin: '0 auto 12px',
                  boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '18px'
                }}>A</div>
                <p style={{ 
                  margin: 0,
                  color: '#333',
                  fontWeight: '500'
                }}>Theater A</p>
                <p style={{ 
                  margin: '5px 0 0 0',
                  color: '#10b981',
                  fontSize: '13px',
                  fontWeight: '500'
                }}>Operational</p>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: '50px', 
                  height: '50px', 
                  borderRadius: '50%', 
                  backgroundColor: '#10b981',
                  margin: '0 auto 12px',
                  boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '18px'
                }}>B</div>
                <p style={{ 
                  margin: 0,
                  color: '#333',
                  fontWeight: '500'
                }}>Theater B</p>
                <p style={{ 
                  margin: '5px 0 0 0',
                  color: '#10b981',
                  fontSize: '13px',
                  fontWeight: '500'
                }}>Operational</p>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: '50px', 
                  height: '50px', 
                  borderRadius: '50%', 
                  backgroundColor: '#f59e0b',
                  margin: '0 auto 12px',
                  boxShadow: '0 2px 8px rgba(245, 158, 11, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '18px'
                }}>C</div>
                <p style={{ 
                  margin: 0,
                  color: '#333',
                  fontWeight: '500'
                }}>Theater C</p>
                <p style={{ 
                  margin: '5px 0 0 0',
                  color: '#f59e0b',
                  fontSize: '13px',
                  fontWeight: '500'
                }}>Maintenance</p>
              </div>
            </div>
          </div>
        </div>
        
        <div style={{ marginBottom: '25px' }}>
          <CapacityChart data={theaterCapacityData} />
        </div>

        <div style={{ marginBottom: '25px' }}>
          <WaitTimeChart operationDayId="1" />
        </div>

        <div style={{ marginBottom: '25px' }}>
          <MaintenanceLog />
        </div>

        <div>
          <StaffingTable isEditable={isAdminMode} />
        </div>
      </div>
    </div>
  );
};

export default Main;
