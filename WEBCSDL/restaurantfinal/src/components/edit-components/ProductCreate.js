import React, { useEffect, useState, useContext } from 'react';
import '../../style/pos-style.css';
import { TokenContext } from '../TokenContext';
import axios from 'axios';
import './style/notification.css';

function ProductCreate({ onCancel, onAddSuccess }) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [menu, setMenu] = useState('');
    const [imageLink, setImageLink] = useState('');
    const [menuOptions, setMenuOptions] = useState([]);
    const token = useContext(TokenContext);
    const [menuID, setMenuID] = useState([]);
    const [idMenuRequest, setIdMenuRequest] = useState(null);
    

    const [nameError, setNameError] = useState(false);
    const [priceError, setPriceError] = useState(false);
    const [menuError, setMenuError] = useState(false);
    const [imageLinkError, setImageLinkError] = useState(false);

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/api/thucdon/all', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = await response.json();
                const options = data.map(item => item.ten_td);
                setMenuOptions(options);
                setMenuID(data)
            } catch (error) {
                console.log('Error fetching menu options:', error);
            }
        };
        fetchData();
    }, []);

    const validateForm = () => {
        let hasError = false;
      
        if (name.trim() === '') {
          setNameError(true);
          hasError = true;
        } else {
          setNameError(false);
        }

        if (price.trim() === '' || isNaN(price)) {
            setPriceError(true);
            hasError = true;
          } else {
            setPriceError(false);
          }
        if(idMenuRequest === null){
            setMenuError(true)
            hasError = true;
        } else {
            setMenuError(false);
        }
        if (imageLink === ''){
            setImageLinkError(true)
            hasError = true;
        } else {
            setImageLinkError(false);
        }
        // Kiểm tra các trường khác ở đây
      
        return hasError;
      };


    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };

    const handleMenuChange = (e) => {
        const selectedTenTD = e.target.value;
  
  // Find the corresponding ma_td based on the selected ten_td
        const getMenuID = menuID.find((item) => item.ten_td === selectedTenTD)
        setIdMenuRequest(getMenuID)
        setMenu(selectedTenTD)
    };

    const handleImageLinkChange = (e) => {
        setImageLink(e.target.value);
    };


    const handleSubmit = () => {
        const hasError = validateForm();

        if (!hasError) {
            const data = {
                ma_td: String(idMenuRequest.ma_td),
                ten_mon: String(name),
                gia: parseFloat(price),
                hinhanh: String(imageLink)
            };

            axios
            .post('http://127.0.0.1:5000/api/monan/add-mon-an', data, {
                headers: {
                Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                // Xử lý kết quả sau khi POST thành công
                console.log(response.data);
                onAddSuccess();
            })
            .catch(error => {
                // Xử lý lỗi trong quá trình POST
                console.error('Error posting data:', error);
            });
            onCancel()
            onAddSuccess()

        } else {
            
        }
    };
        const handleCancel = () => {
            onCancel();
          };



    return (
        <div id="add-category" className="add-category">
            <div className="add-header">
                <i className="fa-solid fa-inbox" />
                Create Details
            </div>
            <div className="add-body">
            <div className="add-name">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    placeholder="Enter Product Name"
                    value={name}
                    onChange={handleNameChange}
                    className={`test ${nameError ? 'error' : ''}`}
                />

            </div>
            <div className='add-price'>
                <label htmlFor="price">Price</label>
                <input
                    type="text"
                    id="price"
                    placeholder="Enter Product Price"
                    value={price}
                    onChange={handlePriceChange}
                    className={`test ${priceError ? 'error' : ''}`}
                />
            </div>
                <div className="add-menu">
                    <label htmlFor="menu">Menu</label>
                    <select id="menu" value={menu} onChange={handleMenuChange} className={`test ${menuError ? 'error' : ''}`}>
                        <option value="">Select a menu</option>
                        {menuOptions.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                </div>
                <div className="add-image">
                    <label htmlFor="imageLink">Image Link</label>
                    <input
                        type="text"
                        id="imageLink"
                        placeholder="Enter Image Link"
                        value={imageLink}
                        onChange={handleImageLinkChange}
                        className={`test ${imageLinkError ? 'error' : ''}`}
                    />
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

export default ProductCreate;