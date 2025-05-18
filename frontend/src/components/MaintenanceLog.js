import React, { useState, useEffect } from 'react';
import api from '../services/api';

function MaintenanceLog({ theaterId }) {
  const [maintenanceLogs, setMaintenanceLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMaintenanceLogs = async () => {
      try {
        setLoading(true);

        const endpoint = theaterId 
          ? `/maintenance-logs?theater_id=${theaterId}`
          : '/maintenance-logs';
          
        const response = await api.get(endpoint);
        setMaintenanceLogs(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching maintenance logs:', err);
        setError('Failed to load maintenance logs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMaintenanceLogs();
  }, [theaterId]);

  const mockLogs = [
    {
      id: '1',
      theater_number: 'A',
      maintenance_type: 'PREVENTATIVE',
      technician_name: 'Lisa Thompson',
      start_time: '2023-05-10T08:00:00',
      end_time: '2023-05-10T11:30:00',
      description: 'Scheduled 30-day preventative maintenance. Performed system diagnostics, calibration of motion system, and inspection of all guest restraint systems.',
      parts_replaced: 'None',
      maintenance_result: 'COMPLETED',
      next_maintenance_due: '2023-06-10'
    },
    {
      id: '2',
      theater_number: 'C',
      maintenance_type: 'CORRECTIVE',
      technician_name: 'Mike Johnson',
      start_time: '2023-05-12T14:00:00',
      end_time: '2023-05-12T16:45:00',
      description: 'Diagnosed irregular motion base operation. Found worn hydraulic seals causing pressure fluctuations.',
      parts_replaced: 'Hydraulic seals on primary motion actuator, pressure regulator valve',
      maintenance_result: 'COMPLETED',
      next_maintenance_due: '2023-06-12'
    },
    {
      id: '3',
      theater_number: 'B',
      maintenance_type: 'EMERGENCY',
      technician_name: 'Robert Davis',
      start_time: '2023-05-15T10:30:00',
      end_time: '2023-05-15T18:45:00',
      description: 'Emergency response to guest-reported loud bang during operation. Investigation revealed failure of main support bracket for motion base actuator.',
      parts_replaced: 'Motion base primary support bracket, mounting hardware, hydraulic connectors',
      maintenance_result: 'COMPLETED',
      next_maintenance_due: '2023-05-30'
    }
  ];

  const displayLogs = maintenanceLogs.length > 0 ? maintenanceLogs : mockLogs;


  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Helper function to get status color
  const getMaintenanceTypeColor = (type) => {
    switch (type.toUpperCase()) {
      case 'PREVENTATIVE':
        return '#10b981'; // gren
      case 'CORRECTIVE':
        return '#f59e0b'; // oran
      case 'EMERGENCY':
        return '#ef4444'; // rod
      default:
        return '#0066b2'; // bue
    }
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
        Maintenance Log
      </h3>
      
      {loading && <div style={{ textAlign: 'center', padding: '20px' }}>Loading maintenance logs...</div>}
      
      {error && <div style={{ color: '#ef4444', padding: '10px', backgroundColor: '#fee2e2', borderRadius: '6px', marginBottom: '20px' }}>{error}</div>}
      
      {!loading && !error && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fbff' }}>
                <th style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid #eef2f8', fontWeight: '600', color: '#333' }}>Theater</th>
                <th style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid #eef2f8', fontWeight: '600', color: '#333' }}>Type</th>
                <th style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid #eef2f8', fontWeight: '600', color: '#333' }}>Date</th>
                <th style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid #eef2f8', fontWeight: '600', color: '#333' }}>Technician</th>
                <th style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid #eef2f8', fontWeight: '600', color: '#333' }}>Result</th>
                <th style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid #eef2f8', fontWeight: '600', color: '#333' }}>Next Due</th>
              </tr>
            </thead>
            <tbody>
              {displayLogs.map(log => (
                <tr key={log.id} style={{ borderBottom: '1px solid #eef2f8' }}>
                  <td style={{ padding: '12px 15px' }}>Theater {log.theater_number}</td>
                  <td style={{ padding: '12px 15px' }}>
                    <span style={{ 
                      color: getMaintenanceTypeColor(log.maintenance_type),
                      fontWeight: '500',
                      backgroundColor: log.maintenance_type.toUpperCase() === 'EMERGENCY' ? '#fee2e2' : 
                                       log.maintenance_type.toUpperCase() === 'CORRECTIVE' ? '#fef3c7' : '#ecfdf5',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}>
                      {log.maintenance_type}
                    </span>
                  </td>
                  <td style={{ padding: '12px 15px' }}>{formatDate(log.start_time)}</td>
                  <td style={{ padding: '12px 15px' }}>{log.technician_name}</td>
                  <td style={{ padding: '12px 15px' }}>
                    <span style={{ 
                      color: log.maintenance_result === 'COMPLETED' ? '#10b981' : '#f59e0b',
                      fontWeight: '500'
                    }}>
                      {log.maintenance_result}
                    </span>
                  </td>
                  <td style={{ padding: '12px 15px' }}>{formatDate(log.next_maintenance_due).split(',')[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MaintenanceLog;
