import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import api from '../services/api';

function WaitTimeChart({ operationDayId, height = 300 }) {
  const [waitTimeData, setWaitTimeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWaitTimeData = async () => {
      if (!operationDayId) {
        setWaitTimeData(mockWaitTimeData);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await api.get(`/anal/wait-times?operation_day_id=${operationDayId}`);
        
        if (response.data && response.data.hourly_wait_times) {
          const chartData = response.data.hourly_wait_times.map(item => ({
            name: `${item.hour}:00`,
            posted: Math.round(item.avg_posted_wait),
            actual: Math.round(item.avg_actual_wait),
          }));
          
          setWaitTimeData(chartData);
        } else {
          setWaitTimeData(mockWaitTimeData);
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching wait time data:', err);
        setError('Failed to load wait time data');
        setWaitTimeData(mockWaitTimeData);
      } finally {
        setLoading(false);
      }
    };

    fetchWaitTimeData();
  }, [operationDayId]);

  const mockWaitTimeData = [
    { name: '8:00', posted: 30, actual: 28 },
    { name: '9:00', posted: 35, actual: 37 },
    { name: '10:00', posted: 50, actual: 48 },
    { name: '11:00', posted: 65, actual: 63 },
    { name: '12:00', posted: 70, actual: 75 },
    { name: '13:00', posted: 55, actual: 60 },
    { name: '14:00', posted: 45, actual: 43 },
    { name: '15:00', posted: 40, actual: 38 },
    { name: '16:00', posted: 35, actual: 34 },
    { name: '17:00', posted: 40, actual: 42 },
    { name: '18:00', posted: 30, actual: 32 },
    { name: '19:00', posted: 25, actual: 22 },
  ];

  const avgPosted = waitTimeData.length 
    ? Math.round(waitTimeData.reduce((sum, item) => sum + item.posted, 0) / waitTimeData.length)
    : 0;
    
  const avgActual = waitTimeData.length 
    ? Math.round(waitTimeData.reduce((sum, item) => sum + item.actual, 0) / waitTimeData.length)
    : 0;

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
        Wait Time Analysis
      </h3>
      
      {loading && <div style={{ textAlign: 'center', padding: '20px' }}>Loading wait time data...</div>}
      
      {error && <div style={{ color: '#ef4444', padding: '10px', backgroundColor: '#fee2e2', borderRadius: '6px', marginBottom: '20px' }}>{error}</div>}
      
      {!loading && waitTimeData.length > 0 && (
        <>
          <div style={{ height: height, width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={waitTimeData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value) => [`${value} minutes`]} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="posted" 
                  name="Posted Wait Time" 
                  stroke="#0066b2" 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  name="Actual Wait Time" 
                  stroke="#f59e0b" 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-around', 
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#f8fbff',
            borderRadius: '8px',
            border: '1px solid #eef2f8'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '14px', color: '#637385', marginBottom: '5px' }}>Average Posted</div>
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#0066b2' }}>{avgPosted} min</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '14px', color: '#637385', marginBottom: '5px' }}>Average Actual</div>
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#f59e0b' }}>{avgActual} min</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '14px', color: '#637385', marginBottom: '5px' }}>Accuracy</div>
              <div style={{ 
                fontSize: '22px', 
                fontWeight: 'bold', 
                color: Math.abs(avgPosted - avgActual) <= 5 ? '#10b981' : '#ef4444' 
              }}>
                {Math.round((avgActual / avgPosted) * 100)}%
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default WaitTimeChart;
