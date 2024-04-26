
import '../../style/message.css'
import React, { useState, useEffect } from 'react';

// const SuccessMessage = ({ onButtonClick, successMessage }) => {
//   const [isToastActive, setIsToastActive] = useState(false);
//   const [isProgressActive, setIsProgressActive] = useState(false);
//   let timer1, timer2;
//   const handleButtonClick = () => {
//     setIsToastActive(true);
//     setIsProgressActive(true);
//     onButtonClick()

//     timer1 = setTimeout(() => {
//       setIsToastActive(false);
//     }, 5000);

//     timer2 = setTimeout(() => {
//       setIsProgressActive(false);
//     }, 5300);
//   };

//   const handleCloseIconClick = () => {
//     setIsToastActive(true);
//   setIsProgressActive(true);

//   timer1 = setTimeout(() => {
//     setIsToastActive(false);
//   }, 5000);

//   timer2 = setTimeout(async () => {
//     setIsProgressActive(false);
//   }, 5300);
//   };
//   useEffect(() => {
    

//     return () => {
//       clearTimeout(timer1);
//       clearTimeout(timer2);
//     };

//     // Mảng dependency rỗng để chỉ chạy effect một lần khi component được mount
//   }, []);

//   return (
//     <div>
//       <button className="complete-btn" onClick={handleButtonClick}>Hoàn Thành</button>
//       {successMessage === "Add success!" && 
//       <div className={`toast ${isToastActive ? 'active' : ''}`}>
//       <div className="toast-content">
//         <i className="fas fa-solid fa-check check"></i>
//         <div className="message">
//           <span className="text text-1">Thành công</span>
//           <span className="text text-2">Thay đổi đã được lưu</span>
//         </div>
//       </div>
//       <i className="fa-solid fa-xmark close" onClick={handleCloseIconClick}></i>
//       <div className={`progress ${isProgressActive ? 'active' : ''}`}></div>
//     </div>}
//     {successMessage === "false" && 
//       <div className={`toast ${isToastActive ? 'active' : ''}`}>
//       <div className="toast-content">
//       <i class="fa-solid fa-xmark not-check"></i>
//         <div className="message">
//           <span className="text text-1">Thất bại</span>
//           <span className="text text-2">Những thay đổi sẽ không được lưu</span>
//         </div>
//       </div>
//       <i className="fa-solid fa-xmark close" onClick={handleCloseIconClick}></i>
//       <div className={`progress ${isProgressActive ? 'active' : ''}`}></div>
//     </div>}
//     </div>
//   );
// };

// export default SuccessMessage;

// import React, { useState, useEffect } from 'react';

const SuccessMessage = ({ onButtonClick, successMessage }) => {
    const [isToastActive, setIsToastActive] = useState(false);
    const [isProgressActive, setIsProgressActive] = useState(false);
    successMessage = null
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
      onButtonClick();
    };
  
    const handleCloseIconClick = () => {
      setIsToastActive(false);
      setIsProgressActive(false);
    };
  
    return (
      <div>
        <button className="complete-btn" onClick={handleButtonClick}>
          Hoàn Thành
        </button>
        {successMessage === 'Add success!' && (
          <div className={`toast ${isToastActive ? 'active' : ''}`}>
            <div className="toast-content">
              <i className="fas fa-solid fa-check check"></i>
              <div className="message">
                <span className="text text-1">Thành công</span>
                <span className="text text-2">Thay đổi đã được lưu</span>
              </div>
            </div>
            <i className="fa-solid fa-xmark close" onClick={handleCloseIconClick}></i>
            <div className={`progress ${isProgressActive ? 'active' : ''}`}></div>
          </div>
        )}
        {successMessage === 'false' && (
          <div className={`toast ${isToastActive ? 'active' : ''}`}>
            <div className="toast-content">
              <i className="fa-solid fa-xmark not-check"></i>
              <div className="message">
                <span className="text text-1">Thất bại</span>
                <span className="text text-2">Những thay đổi sẽ không được lưu</span>
              </div>
            </div>
            <i className="fa-solid fa-xmark close" onClick={handleCloseIconClick}></i>
            <div className={`progress ${isProgressActive ? 'active' : ''}`}></div>
          </div>
        )}
      </div>
    );
  };
  
  export default SuccessMessage;