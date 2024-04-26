import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { TokenContext } from './TokenContext.js'
import '../style/pos-admin.css'
import { useNavigate } from 'react-router-dom';
import SuccessMessage from './pos-components/SuccessMessage.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function POS(){
    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [showDinIn, setShowDinIn] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [successMessage, setSuccessMessage] = useState('false');
    const [selectedTable, setSelectedTable] = useState(null);
    const [nameTable, setNameTable] = useState(null);
    const [tableMatching, setTableMatching] = useState([]);
    const [notActiveTable, setNotActiveTable] = useState([]);
    const [matchingIDTable, setMatchingIDTable] = useState([]);
    const [matchingBill, setMatchingBill] = useState([]);
    const [billID, setBillID] = useState(null);
    const [infoTables, setInfoTable ] = useState([]);
    const token = useContext(TokenContext);
    const navigate = useNavigate();


    let isTableSelected = false;

// category
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://127.0.0.1:5000/api/thucdon/all');
            setCategories(response.data);
          } catch (error) {
            console.error(error);
          }
        };
        getTableInfo();
        fetchData();
        
      }, []);
      
      useEffect(() => {
        // console.log(categories);
      }, [categories]);

      const handleCategoryClick = (category) => {
        setSelectedCategory(category);
      };
//product
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/api/monan/all', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            });
            setProduct(response.data);
        } catch (error) {
            console.error(error);
        }
        };
        setSelectedTable(localStorage.getItem('TableId'))
        fetchData();
    }, [token]);

    const handleItemClick = (item) => {
        const existingItemIndex = selectedItems.findIndex((selectedItem) => selectedItem.ma_mon === item.ma_mon);

        if (existingItemIndex !== -1) {
          // Nếu món đã tồn tại, tăng số lượng của mục đó
          const updatedItems = [...selectedItems];
                updatedItems[existingItemIndex] = {
                ...updatedItems[existingItemIndex],
                quantity: updatedItems[existingItemIndex].quantity + 1,
    };

    setSelectedItems(updatedItems);
    // console.log(selectedItems)
  } else {
    // Nếu món chưa tồn tại, thêm mục vào danh sách selectedItems với quantity ban đầu là 1
    setSelectedItems((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
  }
      };

      const handleDeleteItemClick = (item) => {
        setSelectedItems((prevItems) => prevItems.filter((selectedItem) => selectedItem.ma_mon !== item.ma_mon));
        console.log(item)
      };
      
      const handleBackToDashboard = async () => {
        const password = prompt('Nhập mật khẩu:');
        // Thực hiện logic xác thực mật khẩu ở đây
        if (password === '123123') {
          navigate('/main');
        } else {
          alert('Mật khẩu không đúng. Chuyển hướng bị từ chối.');
        }
      };
      const handleOpenDinin = () => {
        setShowDinIn(true);

      };
      const handleCloseDinin = () => {
        setShowDinIn(false);
        // toast.success('Add succces!', {
        //   position: "top-right",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "light",
        //   });
          setTimeout(() => {
            // setSuccessMessage('');
          }, 1000);
        // onClose(); // Gọi hàm để tắt DinIn
      };

      const billSend = selectedItems.map((selectedItem) => {
        return {
          "ma_mon": selectedItem.ma_mon,
          "soluong": selectedItem.quantity
        };
      });

      
      
      const handleTableSelect = (table) => {
        // setSelectedTable(table);
      };
      const selectedNameTable = (tableName) => {
        setNameTable(tableName)
      }

      const selectedTableId = localStorage.getItem('TableId');

      const handleSuccessMessageButtonClick = async () => {
        const selectedTableId = localStorage.getItem('TableId');

        const updatedBillSend = billSend.map((bill) => {
          return { ...bill, ma_hd: selectedTableId };
        });
        console.log(updatedBillSend);
      
        async function sendBills() {
          for (let i = 0; i < updatedBillSend.length; i++) {
            const bill = updatedBillSend[i];
            const requestData = bill;
            console.log(bill);
            try {
              const response = await axios.post(
                'http://127.0.0.1:5000/api/cthd/add',
                requestData,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              console.log(response.data);
              toast.success('Add success!', {
                // Các tùy chọn thông báo thành công
              });
              setSelectedItems([]);
            } catch (error) {
              console.error(error);
              toast.warn('Lỗi, thông tin sẽ không được lưu', {
                // Các tùy chọn thông báo lỗi
              });
            }
            // Chờ 1 giây trước khi gọi API tiếp theo
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        }
        
        sendBills();  
      };
      useEffect(() => {
        console.log(billID);
      
        // Các logic sử dụng updatedBillSend ở đây...
      
      }, [billID]);



      const getTableInfo = async () => {
        try {
          const tableResponse = await axios.get('http://127.0.0.1:5000/api/table/infor-table/all', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const tableData = tableResponse.data;
          setInfoTable(tableData)
          
      
          const billResponse = await axios.get('http://127.0.0.1:5000/api/hoadon/get-bill/all', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
      
          const billData = billResponse.data;
      
          const matchingTables = [];
          const notActiveTables = []
          const matchingIDTables = [];
          const matchingBills = [];
      
          tableData.forEach((table) => {
            if (billData.some((bill) => bill.ma_ban === table.ma_ban && table.ten_ban != "Delivery" && table.ten_ban != "Take Away")) {
              matchingTables.push(table.ten_ban);
              matchingIDTables.push(table.ma_ban);
              
            } else if (billData.some((bill) => bill.ma_ban !== table.ma_ban && table.tinhtrang == "Dang dung bua" && table.ten_ban != "Delivery" && table.ten_ban != "Take Away")) {
              notActiveTables.push(table.ten_ban);
            }
          });
          billData.forEach((bill) => {
            if (matchingIDTables.includes(bill.ma_ban)) {
              matchingBills.push(bill);
            }
          })
          setNotActiveTable(notActiveTables);
          setTableMatching(matchingTables); 
          setMatchingIDTable(matchingIDTables);
          setMatchingBill(matchingBills)
          
    
          
        } catch (error) {
          // console.error('Lỗi khi lấy thông tin bàn:', error);
          toast.warn('Lỗi, thông tin sẽ không được lưu', {
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

; // console
      const startTable = async (tableName, token) => {
        const url = `http://127.0.0.1:5000/api/table/start/${tableName}`;
        try {
          const response = await axios.put(url, {}, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          // console.log('Yêu cầu PUT thành công');
          // Xử lý phản hồi thành công (nếu cần)
        } catch (error) {
        }
      };

      const finishTable = async (tableName, token) => {
        const url = `http://127.0.0.1:5000/api/table/finish/${tableName}`;
      
        try {
          const response = await axios.put(url, {}, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          console.log('Yêu cầu PUT thành công');
          // Xử lý phản hồi thành công (nếu cần)
        } catch (error) {
        }
      };

      

      // console.log(tableMatching)
      tableMatching.map((table) => {
        
        startTable(table, token)

    })

    notActiveTable.map((table) => {
        finishTable(table, token)    
    })
    if (notActiveTable.length === 0 && tableMatching.length === 0) {
      infoTables.map((table) => {
          if(table.tinhtrang == "Dang dung bua") {
            finishTable(table.ten_ban, token)
          }
      })
    }


      useEffect(() => {
        // Kiểm tra và gán giá trị mới nhất vào biến tạm thời
        if (nameTable == "Delivery") {
          setSelectedTable(14)
        }if (nameTable == "Take Away") {
          setSelectedTable(15)
        }
      }, [nameTable, selectedTable]);
    return (
        <div>
        <div className="header">
          <div className="header-logo">
          <div className="logo-pos-user">
            <img src='https://scontent.fhan2-4.fna.fbcdn.net/v/t1.15752-9/416977759_25337204235866703_7192953679045751287_n.png?_nc_cat=110&ccb=1-7&_nc_sid=8cd0a2&_nc_ohc=omHvZ4d_-8EAX_Xi_Jz&_nc_ht=scontent.fhan2-4.fna&oh=03_AdSFMBzmdAB6ZowHHbm7ZmhzhffbBf-l2IZh5B3qfDzsUQ&oe=65C82F4D'></img>
          </div>
          <ul className="bill-list">
          </ul>
          </div>
          <div className="header-logout back-to-dashboard" onClick={handleBackToDashboard}>
          { 
            nameTable !== null && (
              <div className="header-table-name">Bàn: {nameTable}</div>
            )
          }
          <i class="fa-solid fa-arrow-left"></i>
          </div>
        </div>
        <div className="main-pos">
          <div className="select-category-pos">
            <div className="all-category category-item-pos" onClick={() => handleCategoryClick(null)}>All Category</div>
            {categories.map((item) => (
              <div
                className={
                  item === selectedCategory
                    ? "category-item-pos active"
                    : "category-item-pos"
                }
                onClick={() => handleCategoryClick(item)}
              >
                {item.ten_td}
              </div>
            ))}
          </div>
          <div className="select-product">
            {product
            .filter((item) =>
              selectedCategory ? item.ma_td === selectedCategory.ma_td : true
            )
            .map((item) => (
              <div className="product-item-pos" onClick={() => handleItemClick(item)}>
              <img
                className="product-img-pos"
                src={item.hinhanh}
                alt=""
              />
              <p className="product-name-pos">{item.ten_mon}</p>
            </div>
            ))}
          </div>
          <div className="select-bill">
            <div className="row-bill">
              <div className="bill-product-id">SR#</div>
              <div className="bill-product-name">Product Name</div>
              <div className="bill-product-qty">Qty</div>
              <div className="bill-product-amount">Amount</div>
            </div>
            {selectedItems.map((item, index) => (
            <div className="row-bill">
                <div className="bill-product-id">{index + 1}</div>
                <div className="bill-product-name">{item.ten_mon}</div>
                <div className="bill-product-qty">{item.quantity}</div>
                <div className="bill-product-amount">{item.gia * item.quantity}</div>
                <div className="bill-product-delete" onClick={() => handleDeleteItemClick(item)}><i class="fa-solid fa-trash"></i></div>
            </div>
  ))}
          </div>
        </div>
        <SuccessMessage onButtonClick={(handleSuccessMessageButtonClick)} successMessage={successMessage}/>
     <ToastContainer />
      
      </div>
      
    )
}

export default POS