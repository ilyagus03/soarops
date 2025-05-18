import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

const Login = () => {
  const [activeTab, setActiveTab] = useState('cast');
  const [castId, setCastId] = useState('');
  const [adminCode, setAdminCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { loginCastMember, loginAdmin } = useAuth();
  
  const handleCastLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!castId.trim()) {
      setError('Please enter your Cast ID');
      return;
    }
    
    setLoading(true);
    
    try {
      // In a real app, this would verify with backend
      
      // Try to get staff member from API (if connected)
      let staffData = null;
      try {
        const response = await api.get(`/staff?employee_id=${castId}`);
        if (response.data && response.data.length > 0) {
          staffData = response.data[0];
        }
      } catch (err) {
        console.log('API connection error:', err);
        if (castId === '482529' || castId === 'CM00001') {
          staffData = {
            id: '1',
            name: 'John Smith',
            position: 'Lead',
            employee_id: castId
          };
        }
      }
      
      if (staffData) {
        loginCastMember(castId, staffData);
      } else {
        setError('Invalid Cast ID. Please try again.');
      }
    } catch (error) {
      setError('Failed to login. Please try again.');
      console.error('Login error:', error);
    }
    
    setLoading(false);
  };
  
  const handleAdminLogin = (e) => {
    e.preventDefault();
    setError('');
    
    if (!adminCode.trim()) {
      setError('Please enter the admin code');
      return;
    }
    
    setLoading(true);
    
    try {
      const success = loginAdmin(adminCode);
      
      if (!success) {
        setError('Invalid admin code. Please try again.');
      }
    } catch (error) {
      setError('Failed to login. Please try again.');
      console.error('Login error:', error);
    }
    
    setLoading(false);
  };
  
  return (
    <div className="dashboard-container" style={{ maxWidth: '500px' }}>
      <div className="text-center mb-4">
        <div style={{
          width: '60px',
          height: '60px',
          backgroundColor: 'var(--color-primary)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '28px',
          margin: '0 auto 15px'
        }}>S</div>
        <h1 className="mt-0 mb-2">SoarOps</h1>
        <p className="text-secondary">Attraction Operations Management System</p>
      </div>
      
      <div className="card">
        {/* Tabs */}
        <div className="d-flex mb-4" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <button 
            className={`btn ${activeTab === 'cast' ? '' : 'btn-outline'}`}
            style={{ 
              borderRadius: '8px 0 0 0', 
              flex: 1, 
              borderBottom: activeTab === 'cast' ? '2px solid var(--color-primary)' : 'none'
            }}
            onClick={() => setActiveTab('cast')}
          >
            Cast Member
          </button>
          <button 
            className={`btn ${activeTab === 'admin' ? '' : 'btn-outline'}`}
            style={{ 
              borderRadius: '0 8px 0 0', 
              flex: 1,
              borderBottom: activeTab === 'admin' ? '2px solid var(--color-primary)' : 'none'
            }}
            onClick={() => setActiveTab('admin')}
          >
            Leadership
          </button>
        </div>
        
        {/* Error message */}
        {error && (
          <div className="status status-danger p-4 mb-4" style={{ width: '100%' }}>
            {error}
          </div>
        )}
        
        {/* Cast Login Form */}
        {activeTab === 'cast' && (
          <form onSubmit={handleCastLogin}>
            <div className="mb-4">
              <label htmlFor="castId">Cast Member ID</label>
              <input
                id="castId"
                type="text"
                value={castId}
                onChange={(e) => setCastId(e.target.value)}
                placeholder="Enter your Cast ID number"
                required
              />
              <p className="text-secondary" style={{ fontSize: '12px' }}>
                Sample Cast ID for demo: 482529
              </p>
            </div>
            
            <button 
              type="submit" 
              className="btn btn-secondary" 
              style={{ width: '100%' }}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Access Cast Portal'}
            </button>
          </form>
        )}
        
        {/* Admin Login Form */}
        {activeTab === 'admin' && (
          <form onSubmit={handleAdminLogin}>
            <div className="mb-4">
              <label htmlFor="adminCode">Leadership Access Code</label>
              <input
                id="adminCode"
                type="password"
                value={adminCode}
                onChange={(e) => setAdminCode(e.target.value)}
                placeholder="Enter admin access code"
                required
              />
              <p className="text-secondary" style={{ fontSize: '12px' }}>
                Admin passcode for demo: 123456789
              </p>
            </div>
            
            <button 
              type="submit" 
              className="btn" 
              style={{ width: '100%' }}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Access Leadership Portal'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
