
import '../../style/message.css'
import React, { useState, useEffect } from 'react';


const MessageInfo = ({ successMessage }) => {
    const [isToastActive, setIsToastActive] = useState(true);
    const [isProgressActive, setIsProgressActive] = useState(true);
  
    useEffect(() => {
        let timer1, timer2;
      
        if (isToastActive && isProgressActive) {
          // Thực hiện đóng toast sau 5 giây
          timer1 = setTimeout(() => {
            setIsToastActive(false);
          }, 5000);
      
          // Thực hiện tắt tiến trình sau 5.3 giây
          timer2 = setTimeout(() => {
            setIsProgressActive(false);
          }, 5300);
        }
      
        return () => {
          clearTimeout(timer1);
          clearTimeout(timer2);
        };
      }, [isToastActive, isProgressActive]);
  
      const handleButtonClick = () => {
        setIsToastActive(true);
        setIsProgressActive(true);
      };
  
      const handleCloseIconClick = () => {
        setIsToastActive(false);
        setIsProgressActive(false);
      };
  
      return (
        <div>
          {successMessage === 'Add success!' && (
            <div className={`toast ${isToastActive ? 'active' : ''}`}>
              {/* Nội dung thông báo */}
              <i className="fas fa-solid fa-check check"></i>
              <div className="message">
                <span className="text text-1">Thành công</span>
                <span className="text text-2">Thay đổi đã được lưu</span>
              </div>
              {/* Nút đóng */}
              <i className="fa-solid fa-xmark close" onClick={handleCloseIconClick}></i>
              {/* Tiến trình */}
              <div className={`progress ${isProgressActive ? 'active' : ''}`}></div>
            </div>
          )}
        </div>
      );
  };
  
  export default MessageInfo;