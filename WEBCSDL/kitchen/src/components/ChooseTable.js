



import React, { useEffect, useState, useContext } from 'react';
import '../style/choose-table.css'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { TokenContext } from './TokenContext.js'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


function ChooseTable() {
  const [tables, setTables] = useState([]);
    const token = useContext(TokenContext);
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState('bill');
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showConfirmationDelete, setShowConfirmationDelete] = useState(false);
    const [selectedBill, setSelectedBill] = useState();
    const [shouldFetchData, setShouldFetchData] = useState(true);
    const [isBillDisplay, setIsBillDisplay] = useState(true)
    const [isIngDisplay, setIsIngDisplay] = useState(false)
    const [shouldRenDerAgain, setShouldRenDerAgain] = useState(false)
    const [newItem, setNewItem] = useState({
      ten_nl: "",
      dongia: "",
      donvi: ""
    });

    useEffect(() => {
      // Gọi API để lấy thông tin bàn
      if(shouldFetchData){
        fetch('http://127.0.0.1:5000/api/ordercthd/all-unpaid', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(data => {
          setTables(data);
        })
        .catch(error => {
          console.error(error);
        });
        setShouldFetchData(false)
        setIsIngDisplay(false)
      }
      if (shouldRenDerAgain) {
        try {
          fetch('http://127.0.0.1:5000/api/nguyenlieu/all', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
            .then(response => response.json())
            .then(data => {
              setTables(data);
              setIsBillDisplay(false);
              console.log(data);
            })
            .catch(error => {
              console.error(error);
            });
        } catch (error) {
          console.error(error);
        }
        setShouldRenDerAgain(false);
      }

    }, [token, shouldFetchData, shouldRenDerAgain]);

  const handleTableClick = (tableId) => {
    setShowConfirmationModal(true);
    setSelectedBill(tableId)
  };

  const handleIgnClick = (tableId) => {
    setSelectedBill(tableId)
    setShowConfirmationDelete(true)

  }

  const handleAddItem = () => {
    const data = {
      "ten_nl": String(newItem.ten_nl),
      "dongia" : parseFloat(newItem.dongia),
      "donvi" : String(newItem.donvi)
    }
    console.log(data)
    axios.post('http://127.0.0.1:5000/api/nguyenlieu/add', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      // Xử lý khi thêm món thành công
      toast.success('Thêm món thành công', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setShouldRenDerAgain(true);
    })
    .catch(error => {
      console.error(error);
      // Xử lý khi có lỗi xảy ra
      toast.error('Thêm món thất bại', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewItem(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const confirmOrder = () => {
    // Gọi API để hoàn thành đơn hàng
    fetch(`http://127.0.0.1:5000/api/ordercthd/finish-ordercthd/${selectedBill.ma_order}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        if (response.ok) {
          // Xử lý hoàn thành đơn hàng thành công
          // ...
        } else {
          // Xử lý lỗi
          throw new Error('Không thể hoàn thành đơn hàng');
        }
        setShouldFetchData(true)
        toast.success('Cập nhật trạng thái thành công', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      })
      .catch(error => {
        console.error(error);
        // Xử lý lỗi
      })
      .finally(() => {
        // Đóng modal
        setShowConfirmationModal(false);
      });

      const handleTabChange = (tab) => {
        setSelectedTab(tab);
      };
    
    
  };

  const confirmDelete = () => {
    setShowConfirmationDelete(false)
    console.log(selectedBill)
    try {
      const response = axios.delete(`http://127.0.0.1:5000/api/nguyenlieu/del/${selectedBill.ma_nl}`, {
        headers: {
          Authorization: `Bearer ${token}` // Truyền token trong header
        }
      });
      setShouldRenDerAgain(true)

      toast.success('Xóa món thành công', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      setIsIngDisplay(true)

    } catch (error) {
      console.error(error);
    }
  }

    const selectedTable = () => {
    setSelectedTab('bill')
    setIsIngDisplay(false)
    setIsBillDisplay(true)

      const fetchNguyenLieu = async () => {
        try {
          const response = await fetch('http://127.0.0.1:5000/api/ordercthd/all-unpaid', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const data = await response.json();
          setTables(data)
          // Xử lý dữ liệu nguyên liệu
        } catch (error) {
          console.error(error);
        }
      };
      fetchNguyenLieu();

    }

    

  
  const selectedIng = () => {
    setSelectedTab('nguyenlieu')
    setIsIngDisplay(true)
    setIsBillDisplay(false)
    const fetchNguyenLieu = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/nguyenlieu/all', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await response.json();
        setTables(data)
        // Xử lý dữ liệu nguyên liệu
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNguyenLieu();
  }
  return (
    <div className="table-container">
      <div className='user-table-header'>
        <div
          className={`user-table-header-title ${selectedTab === 'bill' ? 'user-table-active' : ''}`}
          onClick={selectedTable}
        >
          Danh Sách Bill
        </div>
        <div
          className={`user-table-header-title ${selectedTab === 'nguyenlieu' ? 'user-table-active' : ''}`}
          onClick={selectedIng}
        >
          Danh Sách Nguyên Liệu
        </div>
        <div className='user-table-header-user'><i className="fa-regular fa-user"></i></div>
      </div>
      <div className="user-table-grid">
        {isIngDisplay && (
           <table className="nguyen-lieu-table">
           <thead>
             <tr className='user-table-item-nl'>
               <th className='nguyen-lieu-item'>Tên</th>
               <th className='nguyen-lieu-item'>Mã</th>
               <th className='nguyen-lieu-item'>Đơn giá</th>
               <th className='nguyen-lieu-item'>Đơn vị</th>
             </tr>
           </thead>
           <tbody>
             {tables.map((table) => (
               <tr
                 key={table.id}
                 className="user-table-item-nl nguyen-lieu"
               >
                 <td className='nguyen-lieu-item'>{table.ten_nl}</td>
                 <td className='nguyen-lieu-item'>{table.ma_nl}</td>
                 <td className='nguyen-lieu-item'>{table.dongia}</td>
                 <td className='nguyen-lieu-item'>{table.donvi}</td>
                 <td className='nguyen-lieu-item' onClick={() => handleIgnClick(table)}><i class="fa-solid fa-trash"></i></td>
               </tr>
             ))}
           </tbody>
         </table>
        )}
        {isBillDisplay && (tables.map((table) => (
          <div
            onClick={() => handleTableClick(table)}
            key={table.id}
            className={`${table.tinhtrang === 'Con trong' ? 'white' : table.tinhtrang === 'Da dat truoc' ? 'yellow' : 'lightblue'} user-table-item`}
          >
            <h3>Tên {table.ten_mon}</h3>
            <p>Bàn {table.ten_ban}</p>
            <p>Số lượng {table.soluong}</p>
          </div>
        )))}
      </div>
      {showConfirmationModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Hoàn thành đơn?</h2>
            <button onClick={confirmOrder}>Xác nhận</button>
            <button className='cancel-confirm' onClick={() => setShowConfirmationModal(false)}>Hủy</button>
          </div>
        </div>
      )}
      {showConfirmationDelete && (
        <div className="modal">
          <div className="modal-content">
            <h2>Xóa Nguyên Liệu Được Chọn?</h2>
            <button onClick={confirmDelete}>Xác nhận</button>
            <button className='cancel-confirm' onClick={() => setShowConfirmationDelete(false)}>Hủy</button>
          </div>
        </div>
      )}
      {isIngDisplay && (
  <div className='them-nguyen-lieu'>
    <input
      type="text"
      name="ten_nl"
      value={newItem.ten_nl}
      onChange={handleInputChange}
      placeholder="Tên món"
    />
    <input
      type="text"
      name="dongia"
      value={newItem.dongia}
      onChange={handleInputChange}
      placeholder="Đơn giá"
    />
    <select
    className='chon-donvi'
      name="donvi"
      value={newItem.donvi}
      onChange={handleInputChange}
    >
      <option value="">Chọn đơn vị</option>
      <option value="g">g</option>
      <option value="kg">kg</option>
      <option value="ml">ml</option>
      <option value="l">l</option>
    </select>
    <button onClick={handleAddItem}>Add</button>
  </div>
)}

  <ToastContainer />
    </div>
  );
}

export default ChooseTable;