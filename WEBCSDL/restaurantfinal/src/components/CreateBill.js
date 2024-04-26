import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CreateBill(){
    const [categories, setCategories] = useState([])

    


    return (
        <div className="root">
  <div className="header">
    <div className="logo">THIS IS LOGO</div>
    <ul className="bill-list">
      <li className="bill-item">
        <i className="fa-solid fa-truck" />
        <p>Delivery</p>
      </li>
      <li className="bill-item">
        <i className="fa-solid fa-house" />
        <p>Take Away</p>
      </li>
      <li className="bill-item">
        <i className="fa-solid fa-chair" />
        <p>Din in</p>
      </li>
    </ul>
  </div>
  <div className="main">
    <div className="select-category">
      <div className="all-category category-item">All Category</div>
      <div className="category-item">Drinks</div>
    </div>
    <div className="select-product">
      <div className="product-item">
        <img
          className="product-img"
          src="https://anhquanbakery.com/uploads/product/full_v2ah7y94-1274-hamburger-thit-nuong.jpg"
          alt=""
        />
        <p className="product-name">Hambergur</p>
      </div>
    </div>
    <div className="select-bill">
      <div className="row-bill">
        <div className="bill-product-id">SR#</div>
        <div className="bill-product-name">Product Name</div>
        <div className="bill-product-qty">Qty</div>
        <div className="bill-product-price">Price</div>
        <div className="bill-product-amount">Amount</div>
      </div>
    </div>
  </div>
</div>

    )
}