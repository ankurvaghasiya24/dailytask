import React, { createContext, useContext, useState } from 'react';


const NotificationContext = createContext();


export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, duration = 3000) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification = { id, message };

    setNotifications((prev) => [...prev, newNotification]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter(n => n.id !== id));
    }, duration);
  };

  return (
    <NotificationContext.Provider value={addNotification}>
      {children}
      <NotificationList notifications={notifications} />
    </NotificationContext.Provider>
  );
};

const NotificationList = ({ notifications }) => {
  return (
    <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 1000 }}>
      {notifications.map((notification) => (
        <div key={notification.id} className="alert alert-dark" style={{ margin: '5px' }}>
          {notification.message}
        </div>
      ))}
    </div>
  );
};

export const useNotification = () => {
  return useContext(NotificationContext);
};

const ExampleComponent = () => {
  const addNotification = useNotification();

  const triggerNotification = () => {
    addNotification("This is a test notification!", 3000);
  };

  return (
    <button className="btn btn-primary" onClick={triggerNotification}>
      Trigger Notification
    </button>
  );
};

const App = () => {
  return (
    <NotificationProvider>
      <div className="container mt-5">
        <h1>Global Notification System</h1>
        <ExampleComponent />
      </div>
    </NotificationProvider>
  );
};

export default App;
