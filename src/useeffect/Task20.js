// 20. Online/Offline Status: Track and display the user's online/offline status using useEffect 
// and navigator API.


import React, { useEffect, useState } from 'react';

const Task20 = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [statusMessage, setStatusMessage] = useState('');

  const fetchUserStatus = async () => {
    try {
      const response = await fetch('https://dummyapi.io/data/api/user/status');
      const data = await response.json();
      setStatusMessage(data.status);
    } catch (error) {
      console.error('Error fetching user status:', error);
    }
  };

  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    fetchUserStatus();

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  return (
    <div>
      <h1>User Status</h1>
      <p>Status: {isOnline ? 'Online' : 'Offline'}</p>
      <p>API Status: {statusMessage}</p>
    </div>
  );
};

export default Task20;
