import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

const NotificationContext = createContext();

export const useNotification = () => {
  return useContext(NotificationContext);
};

const initialNotifications = [
  { id: 1, message: "Welcome to the platform!", read: false, time: "2 hours ago" },
  { id: 2, message: "You earned a 23 day streak badge!", read: false, time: "1 day ago" }
];

export const NotificationProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const [notifications, setNotifications] = useState(initialNotifications);
  
  const nextToastId = useRef(0);

  const addToast = useCallback((message, type = 'success') => {
    const id = nextToastId.current++;
    setToasts((prevToasts) => [...prevToasts, { id, message, type }]);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
      removeToast(id);
    }, 3000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter(toast => toast.id !== id));
  }, []);

  const markNotificationsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const value = {
    toasts,
    addToast,
    removeToast,
    notifications,
    markNotificationsRead
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
