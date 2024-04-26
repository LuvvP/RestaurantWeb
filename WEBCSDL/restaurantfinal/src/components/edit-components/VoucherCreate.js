import React, { useEffect, useState, useContext } from 'react';
import '../../style/pos-style.css';
import { TokenContext } from '../TokenContext';
import axios from 'axios';
import './style/notification.css';

function VoucherCreate({ onCancel, onAddSuccess }) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [menu, setMenu] = useState('');
    const [imageLink, setImageLink] = useState('');
    const [menuOptions, setMenuOptions] = useState([]);
    const token = useContext(TokenContext);
    const [menuID, setMenuID] = useState([]);
    const [idMenuRequest, setIdMenuRequest] = useState(null);
    const [pointChange, setPointChange] = useState('');
    const [quantity, setQuantity] = useState('');
    

    const [nameError, setNameError] = useState(false);
    const [priceError, setPriceError] = useState(false);
    const [menuError, setMenuError] = useState(false);
    const [imageLinkError, setImageLinkError] = useState(false);
    const [pointChangeError, setPointChangeError] = useState(false);
    const [quantityError, setQuantityError] = useState(false);

    
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
      
        if (name.trim() === '' || isNaN(name)) {
          setNameError(true);
          hasError = true;
        } else {
          setNameError(false);
        }

        if (price === '' ) {
            setPriceError(true);
            hasError = true;
          } else {
            setPriceError(false);
          }
        if (imageLink.trim() === '' || isNaN(imageLink)){
            setImageLinkError(true)
            hasError = true;
        } else {
            setImageLinkError(false);
        }
        if (pointChange.trim() === '' || isNaN(pointChange)){
            setPointChangeError(true)
            hasError = true;
        } else {
            setPointChangeError(false);
        }
        if (quantity.trim() === '' || isNaN(quantity)){
            setQuantityError(true)
            hasError = true;
        } else {
            setQuantityError(false);
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


    const handleImageLinkChange = (e) => {
        setImageLink(e.target.value);
    };

    const handleImagePointChange =(e) => {
        setPointChange(e.target.value);
    }

    const handleImageQuantityChange = (e) => {
        setQuantity(e.target.value);
    }   



    const handleSubmit = () => {
        const hasError = validateForm();
        console.log(name, price, imageLink, pointChange, quantity)
        if (!hasError) {
            const data = {
                "ma_voucher" : name,
                "phantram" : imageLink,
                "dieukien" : price,
                "diem" : pointChange,
                "soluong" : quantity
            };
            axios
            .post('http://127.0.0.1:5000/api/voucher/add-voucher', data, {
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
                Create Voucher Details
            </div>
            <div className="add-body">
            <div className="add-name">
                <label htmlFor="name">Mã Voucher</label>
                <input
                    type="text"
                    id="name"
                    placeholder="Enter Id Voucher"
                    value={name}
                    onChange={handleNameChange}
                    className={`test ${nameError ? 'error' : ''}`}
                />

            </div>
            <div className='add-price'>
                <label htmlFor="price">Type</label>
                <select
                    id="VD: 10"
                    value={price}
                    onChange={handlePriceChange}
                    className={`add-price ${priceError ? 'error' : ''}`}
                >
                    <option value="">Select Type</option>
                    <option value="An tai nha hang">An tai nha hang</option>
                    <option value="Mua Online">Mua Online</option>
                </select>
            </div>
               
                <div className="add-image">
                    <label htmlFor="imageLink">Tỉ lệ giảm</label>
                    <input
                        type="text"
                        id="imageLink"
                        placeholder="VD: 10"
                        value={imageLink}
                        onChange={handleImageLinkChange}
                        className={`test ${imageLinkError ? 'error' : ''}`}
                    />
                </div>
                <div className="add-image">
                    <label htmlFor="imageLink">Điểm chuyển đổi</label>
                    <input
                        type="text"
                        id="imageLink"
                        placeholder="VD: 100"
                        value={pointChange}
                        onChange={handleImagePointChange}
                        className={`test ${pointChangeError ? 'error' : ''}`}
                    />
                </div>
                <div className="add-image">
                    <label htmlFor="imageLink">Số lượng</label>
                    <input
                        type="text"
                        id="imageLink"
                        placeholder="VD 10"
                        value={quantity}
                        onChange={handleImageQuantityChange}
                        className={`test ${quantityError ? 'error' : ''}`}
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

export default VoucherCreate;