import React, { useState, useEffect } from 'react';
import api from '../services/api';

function StaffingTable({ isEditable = false, onStaffChange = null }) {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        setLoading(true);
        const response = await api.get('/staff?is_active=true');
        setStaffList(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching staff data:', err);
        setError('Failed to load staff data. Please try again later.');
        setStaffList(mockStaffList);
      } finally {
        setLoading(false);
      }
    };

    fetchStaffData();
  }, []);

  const mockStaffList = [
    { id: 1, name: 'John Smith', position: 'Lead', theater: 'A', efficiency: 95, active: true },
    { id: 2, name: 'Sarah Johnson', position: 'Operator', theater: 'A', efficiency: 92, active: true },
    { id: 3, name: 'Michael Brown', position: 'Greeter', theater: 'A', efficiency: 88, active: true },
    { id: 4, name: 'Emily Davis', position: 'Operator', theater: 'B', efficiency: 94, active: true },
    { id: 5, name: 'David Wilson', position: 'Lead', theater: 'B', efficiency: 90, active: true },
    { id: 6, name: 'Jessica Taylor', position: 'Greeter', theater: 'B', efficiency: 89, active: true },
    { id: 7, name: 'Robert Martinez', position: 'Lead', theater: 'C', efficiency: 91, active: false },
    { id: 8, name: 'Lisa Anderson', position: 'Operator', theater: 'C', efficiency: 87, active: true },
  ];

  const theaterOptions = ['A', 'B', 'C'];
  const positionOptions = ['Lead', 'Operator', 'Greeter', 'Console', 'Loader', 'Unloader', 'Grouper'];

  const handlePositionChange = (id, newPosition) => {
    const updatedStaff = staffList.map(staff => 
      staff.id === id ? {...staff, position: newPosition} : staff
    );
    setStaffList(updatedStaff);
    if (onStaffChange) onStaffChange(updatedStaff);
  };
  
  const handleTheaterChange = (id, newTheater) => {
    const updatedStaff = staffList.map(staff => 
      staff.id === id ? {...staff, theater: newTheater} : staff
    );
    setStaffList(updatedStaff);
    if (onStaffChange) onStaffChange(updatedStaff);
  };

  const handleActiveChange = (id, isActive) => {
    const updatedStaff = staffList.map(staff => 
      staff.id === id ? {...staff, active: isActive} : staff
    );
    setStaffList(updatedStaff);
    if (onStaffChange) onStaffChange(updatedStaff);
  };

  const getEfficiencyColor = (efficiency) => {
    if (efficiency >= 90) return '#10b981'; // gren
    if (efficiency >= 80) return '#f59e0b'; // oran
    return '#ef4444'; // rod
  };

  return (
    <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', border: '1px solid #eef2f8' }}>
      <h3 style={{ 
        color: '#0066b2', 
        borderBottom: '1px solid #eef2f8',
        paddingBottom: '12px',
        marginTop: 0,
        marginBottom: '20px',
        fontSize: '18px',
        fontWeight: '600'
      }}>
        Staff Assignments
      </h3>
      
      {loading && <div style={{ textAlign: 'center', padding: '20px' }}>Loading staff assignments...</div>}
      
      {error && <div style={{ color: '#ef4444', padding: '10px', backgroundColor: '#fee2e2', borderRadius: '6px', marginBottom: '20px' }}>{error}</div>}
      
      {!loading && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fbff' }}>
                <th style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid #eef2f8', fontWeight: '600', color: '#333' }}>Name</th>
                <th style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid #eef2f8', fontWeight: '600', color: '#333' }}>Position</th>
                <th style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid #eef2f8', fontWeight: '600', color: '#333' }}>Theater</th>
                <th style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid #eef2f8', fontWeight: '600', color: '#333' }}>Efficiency</th>
                <th style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid #eef2f8', fontWeight: '600', color: '#333' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {staffList.map(staff => (
                <tr key={staff.id} style={{ borderBottom: '1px solid #eef2f8' }}>
                  <td style={{ padding: '12px 15px' }}>{staff.name}</td>
                  <td style={{ padding: '12px 15px' }}>
                    {isEditable ? (
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
                        {positionOptions.map(position => (
                          <option key={position} value={position}>{position}</option>
                        ))}
                      </select>
                    ) : (
                      staff.position
                    )}
                  </td>
                  <td style={{ padding: '12px 15px' }}>
                    {isEditable ? (
                      <select
                        value={staff.theater || ''}
                        onChange={(e) => handleTheaterChange(staff.id, e.target.value)}
                        style={{
                          padding: '6px 10px',
                          borderRadius: '4px',
                          border: '1px solid #ddd',
                          fontSize: '14px'
                        }}
                      >
                        <option value="">-</option>
                        {theaterOptions.map(theater => (
                          <option key={theater} value={theater}>Theater {theater}</option>
                        ))}
                      </select>
                    ) : (
                      staff.theater ? `Theater ${staff.theater}` : '-'
                    )}
                  </td>
                  <td style={{ padding: '12px 15px' }}>
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
                          backgroundColor: getEfficiencyColor(staff.efficiency),
                          borderRadius: '4px'
                        }}></div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '12px 15px' }}>
                    {isEditable ? (
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
                    ) : (
                      <span style={{ 
                        color: staff.active ? '#10b981' : '#ef4444',
                        fontWeight: '500',
                        backgroundColor: staff.active ? '#eefbf3' : '#fef2f2',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px'
                      }}>
                        {staff.active ? 'Active' : 'Inactive'}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default StaffingTable;
