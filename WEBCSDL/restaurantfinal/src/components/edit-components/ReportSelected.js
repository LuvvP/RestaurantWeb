import React, { useState } from 'react';

const ReportSelected = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="container-option">
      <div
        className={`option ${selectedOption === 'Add Voucher' ? 'selected' : ''}`}
        onClick={() => handleOptionClick('Add Voucher')}
      >
        Add Voucher
      </div>
      <div
        className={`option ${selectedOption === 'Add MaKH' ? 'selected' : ''}`}
        onClick={() => handleOptionClick('Add MaKH')}
      >
        Add MaKH
      </div>
      <div
        className={`option ${selectedOption === 'Tính Tổng Tiền' ? 'selected' : ''}`}
        onClick={() => handleOptionClick('Tính Tổng Tiền')}
      >
        Tính Tổng Tiền
      </div>
      <div
        className={`option ${selectedOption === 'Thanh Toan' ? 'selected' : ''}`}
        onClick={() => handleOptionClick('Thanh Toan')}
      >
        Thanh Toan
      </div>
    </div>
  );
};

export default ReportSelected;