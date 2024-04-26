import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CategoryEdit from './edit-components/CategoryEdit.js';





function Categories(){
  const [data, setData] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/thucdon/all');
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  {data.map((item) => (
    <div key={item.id}>{item.name}</div>
  ))}

  fetchData();
}, []);
    return (
        <div className="main">
          <div id="title-display" className="header-category">
            <h1>Categories</h1>
          </div>
          <div id="display-category" className="display-category">
            <div id="add-category-btn">
              
            </div>
            <div className="list-category">
              <div className="title-category" style={{ justifyContent: "left" }}>
                <div className="index-category">SR#</div>
                <div className="name-category">Category Name</div>
              </div>
            </div>
    {data.map((item) => (
        <div className="items-category">
        <div id={1} className="item-category">
          <div className="category-line">
            <div className="category-id">{item.ma_td}</div>
            <div className="category-name product-name">{item.ten_td}</div>
          </div>
          <div className="category-function">
      
          </div>
        </div>
      </div>
    ))}
  </div>
</div>


    )
}

export default Categories