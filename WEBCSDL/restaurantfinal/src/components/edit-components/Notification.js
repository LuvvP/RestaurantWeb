import React, { useState, useEffect } from 'react';
import './style/notification.css';

function Notification({ message, onClose }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onClose();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleClose = () => {
    setShow(false);
    onClose();
  };

  const handleTransitionEnd = () => {
    if (!show) {
      // Thực hiện các hành động sau khi component được thu lại
    }
  };

  return (
    <div
      className={`notification ${show ? 'show' : 'hide'}`}
      onTransitionEnd={handleTransitionEnd}
    >
      <span className="notification-message">{message}</span>
      <button className="notification-close" onClick={handleClose}>
        X
      </button>
    </div>
  );
}

export default Notification;