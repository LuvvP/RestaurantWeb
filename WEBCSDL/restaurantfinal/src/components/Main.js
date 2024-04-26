import System from './System'
import '../style/pos-style.css'
import Categories  from './Categories';
import Product from './Product';
import Header from './Header';
import Table from './Table';
import Staff from './Staff';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TokenContext } from './TokenContext.js'
import Report from './Report.js';
import Voucher from './Voucher.js';
import ChartComponent from './ChartComponent.js';



function Main() {
  let [selectedComponent, setSelectedComponent] = useState(null);
    const navigate = useNavigate();
    const token = useContext(TokenContext);


  let handleComponentChange = (component) => {
    setSelectedComponent(component);
    selectedComponent = component
  };

  let renderedComponent;

  if (selectedComponent === 'categories') {
    renderedComponent = <Categories />;
  } else if (selectedComponent === 'product') {
    renderedComponent = <Product/>;
  }if (selectedComponent === 'table') {
    renderedComponent = <Table />;
  } else if (selectedComponent === 'staff') {
    renderedComponent = <Staff />;
  }if (selectedComponent === 'pos') {
    navigate('/pos')
  } else if (selectedComponent === 'report') {
    renderedComponent = <Report />;
  } else if (selectedComponent === 'voucher') {
    renderedComponent = <Voucher />;
  } else if (selectedComponent === 'chart') {
    renderedComponent = <ChartComponent />;
  }

  return (
    <div className='root'>
      <Header/>
      <System onComponent={handleComponentChange}/>
      {renderedComponent}
      
    </div>
  );
}

export default Main;
