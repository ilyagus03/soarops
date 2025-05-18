import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function CapacityChart({ data }) {
  const defaultData = [
    { name: 'Theater A', capacity: 87, currentLoad: 81 },
    { name: 'Theater B', capacity: 87, currentLoad: 76 },
    { name: 'Theater C', capacity: 87, currentLoad: 45 },
  ];

  const chartData = data || defaultData;

  return (
    <div style={{ width: '100%', height: 300 }}>
      <h3 style={{ 
        color: '#0066b2', 
        borderBottom: '1px solid #eef2f8',
        paddingBottom: '12px',
        marginTop: 0,
        marginBottom: '20px',
        fontSize: '18px',
        fontWeight: '600'
      }}>Theater Capacity</h3>
      
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip 
            formatter={(value, name) => {
              return [
                `${value} guests`, 
                name === 'capacity' ? 'Maximum Capacity' : 'Current Load'
              ];
            }} 
          />
          <Legend />
          <Bar name="Maximum Capacity" dataKey="capacity" fill="#8884d8" />
          <Bar name="Current Guests" dataKey="currentLoad" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CapacityChart;
