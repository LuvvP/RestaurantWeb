import { TokenContext } from './TokenContext.js';

import '../style/report.css';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Report = () => {
  const [billList, setBillList] = useState([]);
  const token = useContext(TokenContext);

  const [selectedOption, setSelectedOption] = useState(null);
  const [isContainerOptionVisible, setContainerOptionVisible] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [voucherList, setVoucherList] = useState([]);
  const [isBillUpdated, setBillUpdated] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState('');
  const [nameTabel, setNameTabel] = useState('')
  const [maKHInput, setMaKHInput] = useState('');


  const handleOptionClick = (option) => {
    if (option === 'Tính Tổng Tiền') {
        updateBillTotal();
        toast.success('Cập nhật tiền thành công!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
    }
    if (option === 'Thanh Toan') {
        paymentBill();
    }
    if (option === 'Add MaKH') {
      setMaKHInput(''); // Đặt lại giá trị mã khách hàng nhập vào khi nhấp vào "Add MaKH"
      // Hiển thị hộp thoại
      const maKH = prompt('Nhập mã khách hàng:');
      if (maKH) {
        updateMaKHBill(maKH)
        setMaKHInput(maKH);
      }
    }
  };

  const updateMaKHBill = async (maKH) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const data = {
        ma_hd: selectedBill.ma_hd,
        ma_kh: maKH,
      };
      console.log(data)
      const response = await axios.put(
        'http://127.0.0.1:5000/api/hoadon/update-makh-bill',
        data,
        config
      );

      toast.success('Cập nhật mã khách hàng thành công!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } catch (error) {
      console.error('Lỗi:', error);
      toast.error('Không có mã Khách Hàng', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  };

  const handleVoucherChange = (event) => {
    setSelectedVoucher(event.target.value);
  };

  const handleCloseContainerClick = () => {
    setContainerOptionVisible(false);
   
  };
  const handleOpenContainerClick = () => {
    setContainerOptionVisible(true);
  };

  const handleBillItemClick = (bill) => {
    setSelectedBill(bill);
    setContainerOptionVisible(true);
    

  };

  

  const paymentBill = async () => {
      try {
          const config = {
              headers: {
                  Authorization: `Bearer ${token}`,
                },
            };
            
            
            const response = await axios.put(`http://127.0.0.1:5000/api/hoadon/update-pay-bill/${selectedBill.ma_hd}`, null, config);
            // Xử lý phản hồi từ server nếu cần thiết
        } catch (error) {
            console.error('Lỗi:', error);
        }
        setContainerOptionVisible(false);
        setBillUpdated(true);
        setContainerOptionVisible(false);
        toast.success('Thanh toán thành công!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });

  }

  const updateBillTotal = async () => {
    if (selectedVoucher) {
        try {
            const config = {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            };
        
            const data = {
              "ma_hd": selectedBill.ma_hd,
              "ma_voucher": selectedVoucher,
            };
        
            const response = await axios.put('http://127.0.0.1:5000/api/hoadon/update-voucher-bill', data, config);
            // Xử lý phản hồi từ server nếu cần thiết
          } catch (error) {
            console.error('Lỗi:', error);
          }
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const response = await axios.put(`http://127.0.0.1:5000/api/hoadon/update-tienmonan-bill/${selectedBill.ma_hd}`, null, config);
      console.log('Tổng tiền đã được cập nhật.');
      setBillUpdated(true);
    } catch (error) {
      console.error('Lỗi:', error);
    }

  };

  const fetchBillList = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get('http://127.0.0.1:5000/api/hoadon/get-bill/all', config);
      setBillList(response.data);
    } catch (error) {
      console.error('Lỗi:', error);
      setBillList([]);
    }
  };

  useEffect(() => {
    // Sử dụng useEffect() để theo dõi thay đổi của isBillUpdated
    if (isBillUpdated) {
      fetchBillList(); // Gọi hàm fetchBillList() để tải lại danh sách hóa đơn
      setBillUpdated(false); // Đặt lại isBillUpdated thành false sau khi tải lại danh sách
    }
  }, [isBillUpdated]);
  useEffect(() => {
    const fetchVoucherList = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get('http://127.0.0.1:5000/api/voucher/all', config);
        setVoucherList(response.data);
      } catch (error) {
        console.error('Lỗi:', error);
      }
    };
  
    fetchVoucherList();
  }, [token]);

  useEffect(() => {
    fetchBillList();
  }, []);

  return (
    <div className='main'>
      <div id="title-display" className="header-category">
    <h1>Danh sách hóa đơn</h1>
  </div>
      <ul className='container-report'>
        {billList.map((bill) => (
          <li key={bill.ma_hd} className='bill-item-report' onClick={() => handleBillItemClick(bill)}>
            <p>Mã hóa đơn: {bill.ma_hd}</p>
            <p>Mã bàn: {bill.ma_ban}</p>
            <p>Ngày: {bill.ngay}</p>
            <p>Tien Giam: {bill.tiengiam}</p>
            <p>Tong tien: {bill.tienmonan}</p>
            {bill.kh && (
              <div>
                <p>Thông tin khách hàng:</p>
                <p>Tên: {bill.kh.ten}</p>
                <p>Email: {bill.kh.email}</p>
                {/* Hiển thị các thông tin khác của khách hàng */}
              </div>
            )}
          </li>
        ))}
        {isContainerOptionVisible && (
          <div className='container-option'>
            <h1 className='name-container'>Ma hoa don {selectedBill.ma_hd}</h1>
            <i className='fa-solid fa-xmark close-container' onClick={handleCloseContainerClick}></i>
                <>
                    <select className="option" onChange={handleVoucherChange}>
                    <option value="">Chọn voucher</option>
                    {voucherList.map((voucher) => (
                        <option key={voucher.ma_voucher} value={voucher.ma_voucher}>
                        {voucher.phantram}
                        </option>
                    ))}
                    </select>
                </>
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
        )}
     </ul>
     <ToastContainer />


</div>
);
}

export default Report;