import React, { useState } from 'react';

function System({ onComponent }) {
    const [activeComponent, setActiveComponent] = useState(null);

    const handleClick = (componentName) => {
        setActiveComponent(componentName);
        // console.log(componentName)
        onComponent(componentName)
      };
    return (
        <div className="system">
            <div className="logo">POS System</div>
                <ul className="system-list">
                    <li id="dashboard-label" className="system-item">
                    <i className="fa-solid fa-house" />
                    <label> Dashboard</label>
                    </li>
                    <li id="category"
                    className="system-item" onClick={() => handleClick('categories')}>
                    <i className="fa-solid fa-list" />
                    <label>Categories</label>
                    </li>
                    <li id="product"
                    className="system-item" onClick={() => handleClick('product')}>
                    <i className="fa-solid fa-tv" />
                    <label htmlFor="">Products</label>
                    </li>
                    <li className="system-item"
                    onClick={() => handleClick('table')}>
                    <i className="fa-solid fa-inbox" />
                    <label htmlFor="">Tables</label>
                    </li>
                    <li className="system-item"
                    onClick={() => handleClick('staff')}>
                    <i className="fa-solid fa-clipboard-user" />
                    <label htmlFor="">Staff</label>
                    </li>
                    <li className="system-item"
                    onClick={() => handleClick('pos')}>
                    <i className="fa-solid fa-bars-progress" />
                    <label htmlFor="">POS</label>
                    </li>
                    <li className="system-item"
                    onClick={() => handleClick('voucher')}>
                    <i className="fa-solid fa-kitchen-set" />
                    <label htmlFor="">Voucher</label>
                    </li>
                    <li className="system-item"
                    onClick={() => handleClick('report')}>
                    <i className="fa-solid fa-clipboard" />
                    <label htmlFor="">Report</label>
                    </li>
                    <li className="system-item"
                    onClick={() => handleClick('chart')}>
                    <i class="fa-solid fa-chart-simple"></i>
                    <label htmlFor="">Chart</label>
                    </li>
                 </ul>
</div>

    )
}

export default System