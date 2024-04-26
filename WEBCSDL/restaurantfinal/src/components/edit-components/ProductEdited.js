import React, { useEffect, useState, useContext } from 'react';
import '../../style/pos-style.css';
import { TokenContext } from '../TokenContext';
import axios from 'axios';
import './style/notification.css';

function ProductEdited({ onCancel, onAddSuccess, selectedItem }) {
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
                setMenuID(data);
            } catch (error) {
                console.log('Error fetching menu options:', error);
            }
        };
        fetchData();
    }, []);

    const validateForm = () => {
        let hasError = false;

        if (price.trim() === '' || isNaN(price)) {
            setPriceError(true);
            hasError = true;
        } else {
            setPriceError(false);
        }

        if (quantity.trim() === '' || isNaN(quantity)) {
            setQuantityError(true);
            hasError = true;
        } else {
            setQuantityError(false);
        }

        return hasError;
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };
    
    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    };

    const handleMenuChange = (e) => {
        const selectedTenTD = e.target.value;

        const getMenuID = menuID.find((item) => item.ten_td === selectedTenTD);
        setIdMenuRequest(getMenuID);
        setMenu(selectedTenTD);
    };

    const handleImageLinkChange = (e) => {
        setImageLink(e.target.value);
    };

    const handlePriceEdit = () => {
        const hasError = validateForm();

        if (!hasError) {
            const data = {
                ma_td: String(idMenuRequest.ma_td),
                ten_mon: String(name),
                gia: parseFloat(price),
                hinhanh: String(imageLink)
            };

            axios
                .put('http://127.0.0.1:5000/api/monan/update-gia', data, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(response => {
                    console.log(response.data);
                    onAddSuccess();
                })
                .catch(error => {
                    console.error('Error updating price:', error);
                });
        }
    };

    const handleQuantityEdit = () => {
        const hasError = validateForm();

        if (!hasError) {
            const data = {
                ma_td: String(idMenuRequest.ma_td),
                ten_mon: String(name),
                soluong: parseInt(quantity),
                hinhanh: String(imageLink)
            };

            axios
                .put('http://127.0.0.1:5000/api/monan/update-soluong', data, {
                    headers: {
                Authorization: `Bearer ${token}`
                    }
                })
                .then(response => {
                    console.log(response.data);
                    onAddSuccess();
                })
                .catch(error => {
                    console.error('Error updating quantity:', error);
                });
        }
    };

    const handleSubmit = () => {
        const hasError = validateForm();

        if (!hasError) {
            
            const dataPrice = {
                "ma_mon" : selectedItem.ma_mon,
                "gia" : parseFloat(price)
            }

                axios
                .put('http://127.0.0.1:5000/api/monan/update-gia', dataPrice, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(response => {
                    console.log(response.data);
                    onAddSuccess();
                })
                .catch(error => {
                    console.error('Error updating price:', error);
                });

            const dataQuantity = {
                "ma_mon" : selectedItem.ma_mon,
                "soluong" : parseInt(quantity)
            }
            
            axios
            .put('http://127.0.0.1:5000/api/monan/update-soluong', dataQuantity, {
                headers: {
            Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                console.log(response.data);
                onAddSuccess();
            })
            .catch(error => {
                console.error('Error updating quantity:', error);
            });
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
                        readOnly = "true"
                        placeholder={selectedItem.ten_mon}
                        value={name}
                        onChange={handleNameChange}
                        className={`test ${nameError ? 'error' : ''}`}
                    />
                </div>
                <div className="add-price">
                    <label htmlFor="price">Price</label>
                    <input
                        type="text"
                        id="price"
                        placeholder={selectedItem.gia}
                        value={price}
                        onChange={handlePriceChange}
                        className={`test ${priceError ? 'error' : ''}`}
                    />
                </div>
                <div className="add-quantity">
                    <label htmlFor="quantity">Quantity</label>
                    <input
                        type="text"
                        id="quantity"
                        placeholder={selectedItem.soluong}
                        value={quantity}
                        onChange={handleQuantityChange}
                        className={`test ${quantityError ? 'error' : ''}`}
                    />
                </div>
                <div className="add-image">
                    <label htmlFor="imageLink">Image Link</label>
                    <input
                        type="text"
                        id="imageLink"
                        readOnly = "true"
                        placeholder={selectedItem.hinhanh}
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

export default ProductEdited;