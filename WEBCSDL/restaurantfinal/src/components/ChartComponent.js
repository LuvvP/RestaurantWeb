import React, { useEffect, useState, useContext, useRef } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { TokenContext } from './TokenContext.js';
import '../style/pos-style.css';

const ChartComponent = () => {
  const [chartData, setChartData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [billData, setBillData] = useState(null);
  const token = useContext(TokenContext);
  const [money, setMoney] = useState(null);
  const [billVisible, setBillVisible] = useState(false)
  const billRef = useRef(null);
  const billItemRef = useRef(null);
  const [selectedBill, setSelectedBill] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/hoadon/revenue/week', {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
        const data = response.data;
        const chartData = data.revenue_by_day.map((item) => ({
          date: item.ngay, // Ngày
          total: item.doanhthu // Tổng hóa đơn
        }));
        setChartData(chartData);
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      }
    };

    fetchData();
  }, []);

  const handleClick = async (data) => {
    setMoney(data.total)
    setSelectedDate(data.date);
    const [year, month, day] = data.date.split("-");
    const apiUrl = 'http://127.0.0.1:5000/api/hoadon/get-bill/allday';

    const requestData = {
      year: parseInt(year),
      month: parseInt(month),
      day: parseInt(day)
    };

    try {
      const response = await axios.post(apiUrl, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const billData = response.data.doanhthu;
      setBillData(billData);
    } catch (error) {
      console.error('Lỗi khi gọi API:', error.response);
    }
  };

  const handleClickOutside = (event) => {
    if (billRef.current && !billRef.current.contains(event.target)) {
      setBillVisible(false);
      setSelectedDate(false)
      setSelectedBill(false)
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleGetBill = (data) => {
    axios.get(`http://127.0.0.1:5000/api/hoadon/get-bill/${data.ma_hd}`, {
      headers: {
        Authorization: `Bearer ${token}` // Gửi token trong tiêu đề Authorization
      }
    })
      .then(response => {
        const data = response.data;

        // Hiển thị thông tin hóa đơn
        console.log('Thông tin hóa đơn:', data);
        setSelectedBill(data)
      })
      .catch(error => {
        console.log('Lỗi khi lấy thông tin hóa đơn:', error);
      });
  }

  return (
    <div className='main'>
      <div id="title-display" className="header-category">
        <h1>Báo cáo doanh thu</h1>
      </div>
      <div className='chart-container'>
        {chartData && (
          <BarChart width={1200} height={600} data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="date" />
            <YAxis />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#8884d8" barSize={20} onClick={handleClick} />
          </BarChart>
        )}

        {selectedDate && (
          
          <div className="bill-container-chart" ref={billRef}>
            <h2>Các hóa đơn cho ngày {selectedDate}:</h2>
        
           {billData && billData.map((bill) => (
              <div key={bill.id} className='bill-chart-item'  onClick={() => handleGetBill(bill)}>
                <p className="bill-info" >Mã Hóa Đơn:  {bill.ma_hd}</p>
                <p className="bill-info" >Tổng tiền: {bill.tienmonan}</p>
              </div>
            ))}
            <div className='bill-chart-item'>Tổng giá trị: {money}</div>
           </div>

           
        )}
        {selectedBill && (
          <div className='selected-bill' ref={billItemRef}> 
            <h1>Mã hóa đơn: {selectedBill.ma_hd}</h1>
            <p>Mã bàn: {selectedBill.ma_ban}</p>
            <p>Mã Khách Hàng{selectedBill.ma_kh}</p>
            <p>Tổng tiền {selectedBill.tienmonan}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartComponent;