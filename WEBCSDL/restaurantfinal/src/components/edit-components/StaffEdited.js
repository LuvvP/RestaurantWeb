import React, { useEffect, useState, useContext } from 'react';
import '../../style/pos-style.css';
import { TokenContext } from '../TokenContext';
import axios from 'axios';
import './style/notification.css';

function StaffEdited({ onCancel, onAddSuccess, selectedItem }) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [menu, setMenu] = useState('');
    const [imageLink, setImageLink] = useState('');
    const [menuOptions, setMenuOptions] = useState([]);
    const token = useContext(TokenContext);
    const [menuID, setMenuID] = useState([]);
    const [idMenuRequest, setIdMenuRequest] = useState(null);

    const [nameError, setNameError] = useState(false);
    const [priceError, setPriceError] = useState(false);
    const [quantityError, setQuantityError] = useState(false);
    const [menuError, setMenuError] = useState(false);
    const [imageLinkError, setImageLinkError] = useState(false);


    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };
    
    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    };

    const handleImageLinkChange = (e) => {
        setImageLink(e.target.value);
    };


    const handleSubmit = () => {

        if (name !== '' || quantity !== '' || imageLink !== '') {
            var ten,sdt,chucvu
            if(name == ''){
                ten = selectedItem.hoten
            }
            if(quantity == ''){
                sdt = selectedItem.sdt
            }
            if (imageLink == '') {
                chucvu = selectedItem.chucvu
            }


            const dataStaff = {
                "hoten" : name ? String(name) : ten,
                "sdt" : quantity ? String(quantity) : sdt,
                "chucvu": imageLink ? String(imageLink) : chucvu
            }

            try {
                const response = axios.put(`http://127.0.0.1:5000/api/infor-staff/fix-infor-staff/${selectedItem.ma_nv}`, dataStaff, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });
                console.log(response.data); // Xử lý dữ liệu phản hồi thành công

              } catch (error) {
                console.error(error); // Xử lý lỗi
              }

              onAddSuccess()
            onCancel();
        }


    };

    const handleCancel = () => {
        onCancel();
    };

    return (
        <div id="add-category" className="add-category">
            <div className="add-header">
                <i className="fa-solid fa-inbox" />
                Edit Details
            </div>
            <div className="add-body">
                <div className="add-name">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        placeholder={selectedItem.hoten}
                        value={name}
                        onChange={handleNameChange}
                        className={`test ${nameError ? 'error' : ''}`}
                    />
                </div>
                <div className="add-price">
                    <label htmlFor="price">User name</label>
                    <input
                        type="text"
                        id="price"
                        placeholder={selectedItem.user_name}
                        value={price}
                        readOnly = "true"
                        onChange={handlePriceChange}
                        className={`test ${priceError ? 'error' : ''}`}
                    />
                </div>
                <div className="add-quantity">
                    <label htmlFor="quantity">Phone Number</label>
                    <input
                        type="text"
                        id="quantity"
                        placeholder={selectedItem.sdt}
                        value={quantity}
                        onChange={handleQuantityChange}
                        className={`test ${quantityError ? 'error' : ''}`}
                    />
                </div>
                <div className="add-image">
                <label htmlFor="imageLink">Role</label>
                <select
                    id="imageLink"
                    value={imageLink}
                    onChange={handleImageLinkChange}
                    className={`add-price ${imageLinkError ? 'error' : ''}`}
                >
                    <option value={selectedItem.chucvu}>{selectedItem.chucvu}</option>
                    <option value="Dau bep">Dau bep</option>
                    <option value="Phuc vu">Phuc vu</option>
                    <option value="Tiep tan">Tiep tan</option>
                    <option value="Thu ngan">Thu ngan</option>
                </select>
                </div>
                
                
            </div>
            <div className="add-footer">
            <button className="button-17 add-close" role="button" onClick={handleCancel}>
            Cancel
            </button>
                <button className="button-17 add-close" role="button" onClick={handleSubmit}>
                    Save
                </button>
            </div>
        </div>
    );
}

export default StaffEdited;