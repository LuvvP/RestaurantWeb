import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { TokenContext } from './TokenContext.js'

function Table(){
    const [data, setData] = useState([]);
    const token = useContext(TokenContext);
    const [selectedItem, setSelectedItem] = useState(null);
    const [shouldFetchData, setShouldFetchData] = useState(true);

    useEffect(() => {
      if(shouldFetchData) {
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
        setShouldFetchData(false)
      }
    }, [token, shouldFetchData]);


    const handleEditedCategoryClick = async (item) => {
      if(item.ten_ban !== "Delivery" && item.ten_ban !== "Take Away" && item.tinhtrang == "Con trong") {
        try {
          await axios.put(
            `http://127.0.0.1:5000/api/table/book-table/${item.ten_ban}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          // Xử lý thành công
          setShouldFetchData(true)
        } catch (error) {
          console.error(error);
          // Xử lý lỗi
        }
      }
    };

    const handleClearCategoryClick = async (item) => {
      if (item.tinhtrang == "Da dat truoc") {
        try {
          await axios.put(
            `http://127.0.0.1:5000/api/table/cancel-booking/${item.ten_ban}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          // Xử lý thành công
          setShouldFetchData(true)
        } catch (error) {
          console.error(error);
          // Xử lý lỗi
        }
      }
    }

    return (
        
        <div className="main">
             <div id="title-display" className="header-category">
    <h1>Table</h1>
  </div>
        <div id="display-product" className="display-category">
  <div id="add-category-btn">
  </div>
  <div className="list-category">
    <div className="title-category">
      <div className="category-line">
        <div className="index-category">SR#</div>
        <div className="name-category product-name">Table Name</div>
      </div>
      <div className="status-product">
        <div className="product-category ">Seats</div>
        <div className="product-active">Active</div>
      </div>
      <div className="category-function">
        <i className="fa-regular fa-pen-to-square edit-category btn-category btn-hidden" />
        <i className="fa-solid fa-eraser delete-category btn-category btn-hidden" />
      </div>
    </div>
  </div>
  <div className="items-category">
    {data.map((item) => (
        <div className="items-category">
        <div id={1} className="item-category">
          <div className="category-line">
            <div className="category-id">{item.ma_ban}</div>
            <div className="category-name product-name">{item.ten_ban}</div>
          </div>
          <div className="status-product">
            <div className="product-category">{item.soghe}</div>
            <div className="product-active ">{item.tinhtrang}</div>
          </div>
          <div className="category-function">
            <i
              id="change-category-btn"
              className="fa-solid fa-bookmark edit-category btn-category"
              onClick={() => handleEditedCategoryClick(item)}
              ></i>
            <i className="fa-solid fa-eraser delete-category btn-category" 
              onClick={() => handleClearCategoryClick(item)}
              
              />
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
</div>
    )
}
export default Table