import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { TokenContext } from './TokenContext.js'
import ProductCreate from './edit-components/ProductCreate.js';
import Notification from './edit-components/Notification.js';
import '../style/pos-admin.css'
import ProductEdited from './edit-components/ProductEdited.js';


function Product(){
    const [data, setData] = useState([]);
    const token = useContext(TokenContext);
    const [showProductEdit, setShowProductEdit] = useState(false);
    const [showProductEdited, setShowProductEdited] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [idProduct, setIdProduct] = useState();
    const [shouldFetchData, setShouldFetchData] = useState(true);
    const [productList, setProductList] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);


    useEffect(() => {
      if (shouldFetchData) {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://127.0.0.1:5000/api/monan/all', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setData(response.data);
            setProductList(response.data);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchData();
        setShouldFetchData(false);
      }
    }, [token, shouldFetchData]);

    const handleCancelProductEdit = () => {
      setShowProductEdit(false)
    };
    const handleCancelProductEdited = () => {
      setShowProductEdited(false)
    };
    const handleButtonAddClick = () => {
      setShowProductEdit(true)
    }
    
  const handleAddSuccess = () => {
    setNotificationMessage('Product added successfully.');
    setShowProductEdit(false);
  };

  const handleNotificationClose = () => {
    setNotificationMessage('');
  };
  const handleDeleteCategoryClick = (e) => {
    setShowDeleteConfirmation(true);
    setIdProduct(e.target.dataset.maMon)
  };

  const handleEditedCategoryClick = (item) => {
    setShowProductEdited(true)
    setSelectedItem(item);
  }

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false)
  }

  const handleConfirmDelete = async (event) => {
    console.log(idProduct)
    setShowDeleteConfirmation(false)
    try {
      await axios.delete(`http://127.0.0.1:5000/api/monan/del-mon-an/${idProduct}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotificationMessage('Product deleted successfully.');
      console.log("thành công")
      setShouldFetchData(true)
      setProductList(prevList => prevList.filter(product => product.ma_mon !== idProduct));
      // ...
    } catch (error) {
      console.error(error);
      // Xử lý lỗi khi xóa món ăn
      // ...
    }
  };

    return (
        
        <div className="main">
             <div id="title-display" className="header-category">
    <h1>Product</h1>
  </div>
        <div id="display-product" className="display-category">
  <div id="add-category-btn">
    <button className="button-87" role="button" onClick={handleButtonAddClick}>
    <i className="fa-solid fa-plus" />
  </button>
  </div>
  <div className="list-category">
    <div className="title-category">
      <div className="category-line">
        <div className="index-category">SR#</div>
        <div className="name-category product-name">Products Name</div>
      </div>
      <div className="status-product">
        <div className="product-category ">Categories</div>
        <div className="product-active">Active</div>
      </div>
      <div className="category-function">
        <i className="fa-regular fa-pen-to-square edit-category btn-category btn-hidden" />
        <i className="fa-solid fa-eraser delete-category btn-category btn-hidden" />
      </div>
    </div>
  </div>
  <div className="items-category">
    {productList.map((item) => (
        <div className="itemss-category">
        <div className="item-category">
          <div className="category-line">
            <div className="category-id">{item.ma_mon}</div>
            <div className="category-name product-name">{item.ten_mon}</div>
          </div>
          <div className="status-product">
            <div className="product-category">{item.ma_td}</div>
            <div className="product-active ">{item.soluong > 0 ? 'active' : 'Not Active'}</div>
          </div>
          <div className="category-function">
            <i
              id="change-category-btn"
              className="fa-regular fa-pen-to-square edit-category btn-category"
              onClick={() => handleEditedCategoryClick(item)}
            />
            <i className="fa-solid fa-eraser delete-category btn-category" data-ma-mon={item.ma_mon}
            onClick={handleDeleteCategoryClick}/>
          </div>
        </div>
      </div>
    ))}
   
  </div>
  
</div>
  {showDeleteConfirmation && (
          <div className="delete-confirmation">
            <p>Có muốn xóa món?</p>
            <button onClick={handleConfirmDelete} >Xóa</button>
            <button onClick={handleCancelDelete}>Hủy</button>
          </div>
  )}
{/* {showProductEdit && <ProductEdit onCancel={handleCancelProductEdit} />} */}
    {showProductEdit && (
        <ProductCreate
          onCancel={handleCancelProductEdit}
          onAddSuccess={handleAddSuccess}
        />
      )}
      {
        showProductEdited && (
          <ProductEdited
          onCancel={handleCancelProductEdited}
          onAddSuccess={handleAddSuccess}
          selectedItem={selectedItem}
        />
        )
      }
          
      {notificationMessage && (
        <Notification message={notificationMessage}  onClose={handleNotificationClose}/>
      )}

</div>
    )
}

export default Product