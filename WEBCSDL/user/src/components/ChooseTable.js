import React, { useEffect, useState, useContext } from 'react';
import '../style/choose-table.css'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { TokenContext } from './TokenContext.js'
import 'react-toastify/dist/ReactToastify.css';


function ChooseTable() {
  const [tables, setTables] = useState([]);
    const token = useContext(TokenContext);
    const navigate = useNavigate();


  useEffect(() => {
    // Gọi API để lấy thông tin bàn
    fetch('http://127.0.0.1:5000/api/table/infor-table/all')
      .then(response => response.json())
      .then(data => {
        setTables(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleTableClick = (tableId) => {
    localStorage.setItem('TableId', tableId.ma_ban);
    console.log({ ma_ban: tableId })
    // Gọi API để tạo hóa đơn với token
    if (tableId.tinhtrang === 'Con trong' || tableId.tinhtrang === 'Da dat truoc') {
      fetch('http://127.0.0.1:5000/api/hoadon/create-bill', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Thêm token vào header Authorization
        },
        body: JSON.stringify({ ma_ban: tableId.ma_ban }),
      })
        .then(response => response.json())
        .then(data => {
          // Xử lý phản hồi từ API (nếu cần)
          toast.success('Tạo bàn mới thành công', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
  
          // Chuyển hướng đến trang POS
  
        })
        .catch(error => {
          console.error('Lỗi khi tạo hóa đơn:', error);
        });
        fetch(`http://127.0.0.1:5000/api/table/start/${tableId.ten_ban}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Thêm token vào header Authorization
      },
      body: JSON.stringify({}),
    })
      .then(response => response.json())
      .then(data => {
        // Xử lý phản hồi từ API (nếu cần)
        console.log('Thêm bàn mới thành công:', data);
  
        // Chuyển hướng đến trang POS
    })
    .catch(error => {
        console.error('Lỗi khi thêm bàn mới:', error);
    });
    }
    navigate('/pos');
  
    // Gọi API để thêm bàn mới với tên 'ban2'
    
  };

  return (
    <div className="table-container">
      <div className='user-table-header'>
        <div className='user-table-header-title'>Danh Sách Bàn</div>
        <div className='user-table-header-user'><i class="fa-regular fa-user"></i></div>
      </div>
      <div className="user-table-grid">
        {tables.map(table => (
          <div
            onClick={() => handleTableClick(table)}
            key={table.id}
            className={`${table.tinhtrang === 'Con trong' ? 'white' : table.tinhtrang === 'Da dat truoc' ? 'yellow' : 'lightblue'} user-table-item`}
          >
            <h3>Bàn {table.ten_ban}</h3>
            <p>Tình trạng: {table.tinhtrang}</p>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}

export default ChooseTable;