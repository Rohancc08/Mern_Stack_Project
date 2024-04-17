import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Bike = () => {
  const [cycleStatusData, setCycleStatusData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/data');
      setCycleStatusData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const postData = async () => {
    try {
      const data = {
        ts: new Date().toISOString(), // Example timestamp
        machine_status: true, // Example machine status
        vibration: [1, 2, 3] // Example vibration data
      };
      const response = await axios.post('/api/post', data);
      console.log('Data posted:', response.data);
      // If you want to update the UI after posting data, you can call fetchData() here
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  return (
    <div className="cycle-status-container">
      <h2>Bike Status</h2>
      <button onClick={postData}>Post Data</button>
      <ul className="cycle-status-list">
        {cycleStatusData.map((item, index) => (
          <li key={index} className="cycle-status-item">
            {item.ts} - {item.machine_status ? 'Active' : 'Inactive'} - {item.vibration.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Bike;