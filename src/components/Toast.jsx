import React from 'react';
import { useNotification } from '../context/NotificationContext';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import './Toast.css';

const Toast = () => {
  const { toasts, removeToast } = useNotification();

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="toast-icon success" size={20} />;
      case 'error':
        return <AlertCircle className="toast-icon error" size={20} />;
      case 'info':
      default:
        return <Info className="toast-icon info" size={20} />;
    }
  };

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type}`}>
          <div className="toast-content">
            {getIcon(toast.type)}
            <span className="toast-message">{toast.message}</span>
          </div>
          <button className="toast-close" onClick={() => removeToast(toast.id)}>
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;
