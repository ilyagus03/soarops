import React, { useState, useEffect } from 'react';
// Import other components as needed
// import CapacityChart from './CapacityChart';
// import MaintenanceLog from './MaintenanceLog';
// import StaffingTable from './StaffingTable';
// import WaitTimeChart from './WaitTimeChart';

function Dashboard() {
  const [refreshCount, setRefreshCount] = useState(0);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminCode, setAdminCode] = useState('');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [guestCount, setGuestCount] = useState(36542);
  const [waitTime, setWaitTime] = useState(45);
  const [staffList, setStaffList] = useState([
    { id: 1, name: 'John Smith', position: 'Lead', theater: 'A', efficiency: 95, active: true },
    { id: 2, name: 'Sarah Johnson', position: 'Operator', theater: 'A', efficiency: 92, active: true },
    { id: 3, name: 'Michael Brown', position: 'Greeter', theater: 'A', efficiency: 88, active: true },
    { id: 4, name: 'Emily Davis', position: 'Operator', theater: 'B', efficiency: 94, active: true },
    { id: 5, name: 'David Wilson', position: 'Lead', theater: 'B', efficiency: 90, active: true },
    { id: 6, name: 'Jessica Taylor', position: 'Greeter', theater: 'B', efficiency: 89, active: true },
    { id: 7, name: 'Robert Martinez', position: 'Lead', theater: 'C', efficiency: 91, active: false },
    { id: 8, name: 'Lisa Anderson', position: 'Operator', theater: 'C', efficiency: 87, active: true },
  ]);
  
  // Calculate theater efficiency rates
  const theaterEfficiency = {
    'A': staffList.filter(staff => staff.theater === 'A' && staff.active).reduce((sum, staff) => sum + staff.efficiency, 0) / 
         staffList.filter(staff => staff.theater === 'A' && staff.active).length || 0,
    'B': staffList.filter(staff => staff.theater === 'B' && staff.active).reduce((sum, staff) => sum + staff.efficiency, 0) / 
         staffList.filter(staff => staff.theater === 'B' && staff.active).length || 0,
    'C': staffList.filter(staff => staff.theater === 'C' && staff.active).reduce((sum, staff) => sum + staff.efficiency, 0) / 
         staffList.filter(staff => staff.theater === 'C' && staff.active).length || 0,
  };
  
  const theaterStatus = {
    'A': 'Operational',
    'B': 'Operational',
    'C': 'Maintenance'
  };
  
  const verifyAdminCode = () => {
    if (adminCode === '123456789') {
      setIsAdminMode(true);
      setShowAdminModal(false);
    } else {
      alert('Incorrect admin code');
    }
  };
  
  const handlePositionChange = (id, newPosition) => {
    setStaffList(staffList.map(staff => 
      staff.id === id ? {...staff, position: newPosition} : staff
    ));
  };
  
  const handleTheaterChange = (id, newTheater) => {
    setStaffList(staffList.map(staff => 
      staff.id === id ? {...staff, theater: newTheater} : staff
    ));
  };

  const handleActiveChange = (id, isActive) => {
    setStaffList(staffList.map(staff => 
      staff.id === id ? {...staff, active: isActive} : staff
    ));
  };

  const handleGuestCountChange = (amount) => {
    setGuestCount(Math.max(0, guestCount + amount));
  };

  const handleWaitTimeChange = (amount) => {
    setWaitTime(Math.max(0, waitTime + amount));
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
      {/* Admin Login Modal */}
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
      
      {/* Header with Logo, Title and ADMIN BUTTON */}
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
            }}>Attraction Operations Management System</p>
          </div>
        </div>
        
        {/* ADMIN BUTTON - Very prominent */}
        <button
          style={{
            padding: '12px 20px',
            backgroundColor: isAdminMode ? '#10b981' : '#0066b2',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '500',
            boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)'
          }}
          onClick={() => isAdminMode ? setIsAdminMode(false) : setShowAdminModal(true)}
        >
          {isAdminMode ? 'Exit Admin Mode' : 'Admin Access'}
        </button>
      </div>
      
      {/* Main Dashboard Content */}
      {!isAdminMode ? (
        <>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
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
                  }}>Average Wait Time</p>
                  <p style={{ 
                    margin: 0, 
                    fontSize: '24px', 
                    fontWeight: 'bold', 
                    color: '#0066b2' 
                  }}>{waitTime} min</p>
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
        </>
      ) : (
        /* Admin Dashboard */
        <div style={{ marginBottom: '25px' }}>
          {/* Staff Management Section */}
          <div style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            border: '1px solid #eef2f8',
            marginBottom: '25px'
          }}>
            <h3 style={{ 
              color: '#0066b2', 
              margin: '0 0 20px 0',
              fontSize: '18px',
              fontWeight: '600'
            }}>
              Staff Management
            </h3>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8fbff' }}>
                    <th style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid #eef2f8', fontSize: '14px', fontWeight: '600', color: '#333' }}>ID</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid #eef2f8', fontSize: '14px', fontWeight: '600', color: '#333' }}>Name</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid #eef2f8', fontSize: '14px', fontWeight: '600', color: '#333' }}>Position</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid #eef2f8', fontSize: '14px', fontWeight: '600', color: '#333' }}>Theater</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid #eef2f8', fontSize: '14px', fontWeight: '600', color: '#333' }}>Efficiency</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid #eef2f8', fontSize: '14px', fontWeight: '600', color: '#333' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {staffList.map(staff => (
                    <tr key={staff.id} style={{ borderBottom: '1px solid #eef2f8' }}>
                      <td style={{ padding: '12px 15px', fontSize: '14px' }}>{staff.id}</td>
                      <td style={{ padding: '12px 15px', fontSize: '14px' }}>{staff.name}</td>
                      <td style={{ padding: '12px 15px', fontSize: '14px' }}>
                        <select
                          value={staff.position}
                          onChange={(e) => handlePositionChange(staff.id, e.target.value)}
                          style={{
                            padding: '6px 10px',
                            borderRadius: '4px',
                            border: '1px solid #ddd',
                            fontSize: '14px'
                          }}
                        >
                          <option value="Lead">Lead</option>
                          <option value="Operator">Operator</option>
                          <option value="Greeter">Greeter</option>
                        </select>
                      </td>
                      <td style={{ padding: '12px 15px', fontSize: '14px' }}>
                        <select
                          value={staff.theater}
                          onChange={(e) => handleTheaterChange(staff.id, e.target.value)}
                          style={{
                            padding: '6px 10px',
                            borderRadius: '4px',
                            border: '1px solid #ddd',
                            fontSize: '14px'
                          }}
                        >
                          <option value="A">Theater A</option>
                          <option value="B">Theater B</option>
                          <option value="C">Theater C</option>
                        </select>
                      </td>
                      <td style={{ padding: '12px 15px', fontSize: '14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span>{staff.efficiency}%</span>
                          <div style={{
                            height: '8px',
                            backgroundColor: '#e0e8f5',
                            borderRadius: '4px',
                            width: '100px'
                          }}>
                            <div style={{
                              height: '8px',
                              width: `${staff.efficiency}%`,
                              backgroundColor: staff.efficiency >= 90 ? '#10b981' : 
                                             staff.efficiency >= 80 ? '#f59e0b' : '#ef4444',
                              borderRadius: '4px'
                            }}></div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '12px 15px', fontSize: '14px' }}>
                        <select
                          value={staff.active ? "active" : "inactive"}
                          onChange={(e) => handleActiveChange(staff.id, e.target.value === "active")}
                          style={{
                            padding: '6px 10px',
                            borderRadius: '4px',
                            border: '1px solid #ddd',
                            fontSize: '14px',
                            backgroundColor: staff.active ? '#eefbf3' : '#fef2f2',
                            color: staff.active ? '#10b981' : '#ef4444'
                          }}
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Theater Efficiency Section */}
          <div style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            border: '1px solid #eef2f8',
            marginBottom: '25px'
          }}>
            <h3 style={{ 
              color: '#0066b2', 
              margin: '0 0 20px 0',
              fontSize: '18px',
              fontWeight: '600'
            }}>
              Theater Efficiency Rates
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
              {['A', 'B', 'C'].map(theater => (
                <div key={theater} style={{ 
                  backgroundColor: '#f8fbff', 
                  padding: '20px', 
                  borderRadius: '8px',
                  border: '1px solid #eef2f8'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <div style={{ 
                      width: '36px', 
                      height: '36px', 
                      borderRadius: '50%', 
                      backgroundColor: theaterStatus[theater] === 'Operational' ? '#10b981' : '#f59e0b',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '16px',
                      marginRight: '10px'
                    }}>{theater}</div>
                    <div>
                      <p style={{ 
                        margin: '0 0 2px 0',
                        fontWeight: '500',
                        fontSize: '16px'
                      }}>Theater {theater}</p>
                      <p style={{ 
                        margin: 0,
                        fontSize: '13px',
                        color: theaterStatus[theater] === 'Operational' ? '#10b981' : '#f59e0b',
                      }}>{theaterStatus[theater]}</p>
                    </div>
                  </div>
                  
                  <p style={{ 
                    margin: '0 0 5px 0', 
                    color: '#637385', 
                    fontSize: '14px' 
                  }}>Efficiency Rating</p>
                  
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <p style={{ 
                      margin: 0, 
                      fontSize: '22px', 
                      fontWeight: 'bold', 
                      color: '#0066b2',
                      marginRight: '10px'
                    }}>{theaterEfficiency[theater].toFixed(1)}%</p>
                    <div style={{
                      height: '6px',
                      backgroundColor: '#e0e8f5',
                      borderRadius: '3px',
                      width: '130px',
                      position: 'relative'
                    }}>
                      <div style={{
                        position: 'absolute',
                        height: '6px',
                        width: `${theaterEfficiency[theater]}%`,
                        backgroundColor: theaterEfficiency[theater] >= 90 ? '#10b981' : 
                                        theaterEfficiency[theater] >= 80 ? '#f59e0b' : '#ef4444',
                        borderRadius: '3px'
                      }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Counters Management Section */}
          <div style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            border: '1px solid #eef2f8'
          }}>
            <h3 style={{ 
              color: '#0066b2', 
              margin: '0 0 20px 0',
              fontSize: '18px',
              fontWeight: '600'
            }}>
              Update Statistics
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
              <div style={{
                padding: '20px',
                backgroundColor: '#f8fbff',
                borderRadius: '8px',
                border: '1px solid #eef2f8'
              }}>
                <p style={{ 
                  margin: '0 0 15px 0', 
                  fontWeight: '500', 
                  color: '#333',
                  fontSize: '16px'
                }}>Total Guests Today: {guestCount.toLocaleString()}</p>
                
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    style={{
                      padding: '8px 15px',
                      backgroundColor: '#ef4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                    onClick={() => handleGuestCountChange(-10)}
                  >
                    -10
                  </button>
                  
                  <button
                    style={{
                      padding: '8px 15px',
                      backgroundColor: '#0066b2',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                    onClick={() => handleGuestCountChange(10)}
                  >
                    +10
                  </button>
                  
                  <button
                    style={{
                      padding: '8px 15px',
                      backgroundColor: '#0066b2',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                    onClick={() => handleGuestCountChange(50)}
                  >
                    +50
                  </button>
                  
                  <button
                    style={{
                      padding: '8px 15px',
                      backgroundColor: '#10b981',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '500'