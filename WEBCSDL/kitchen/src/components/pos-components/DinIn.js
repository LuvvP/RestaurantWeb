import '../../style/pos-admin.css'
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { TokenContext } from '../TokenContext.js';

function DinIn({ onClose, selectedIDTable, selectedNameTable }){
    const [data, setData] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const token = useContext(TokenContext);
    const [selectedTable, setSelectedTable] = useState(null);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:5000/api/table/infor-table/all', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setData(response.data);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchData();
    }, [token]);

    const createBill = async (ma_ban) => {
        // try {
        //   const response = await axios.post('http://127.0.0.1:5000/api/hoadon/create-bill', {
        //     ma_ban: ma_ban
        //   }, {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   });
        //   onClose()
        //   setSuccessMessage('Hóa đơn đã được tạo thành công.');
        //   console.log(response.data); // In ra dữ liệu phản hồi từ server (tuỳ chọn)
        //   // Thực hiện các hành động khác sau khi tạo hóa đơn thành công (tuỳ chọn)
        // } catch (error) {
        //   console.error(error);
        //   // Xử lý lỗi nếu có (tuỳ chọn)
        // }
        onClose()
        setSuccessMessage('Hóa đơn đã được tạo thành công.');
      };

    const handleTableClick = (table) => {
        if (table.ten_ban !== 'Delivery' && table.ten_ban !== 'Take Away') {
            setSelectedTable(table);
            createBill(table.ma_ban);
            onClose();
            selectedIDTable(table.ma_ban);
            selectedNameTable(table.ten_ban);
          }
      };


    return (
        <div className="dinin-table">
            <div className="dinin-header">
                <div className="dinin-header-start">
                    <i className="fa-solid fa-chair" />
                    <p>Select Table</p>
                </div>
                <i class="fa-solid fa-xmark close-dinin" onClick={onClose}></i>
            </div>
            <div className="dinin-body">
                <div className="table-grid">
                    {data.map((item) => (
                    <div className={`table-cell ${item.tinhtrang === 'Con trong' ? 'table-active' : 'table-notactive'} ${item.ten_ban === 'Delivery' ? 'table-delivery' : ''} ${item.ten_ban === 'Take Away' ? 'table-takeaway' : ''}`} onClick={() => handleTableClick(item)}>{item.ten_ban}</div>
        ))}
                </div>
            </div>
            {successMessage && (
            <div className="success-message">
                {successMessage}
            </div>
            )}
        </div>
        
    )

}
export default DinIn