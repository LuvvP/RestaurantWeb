import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { TokenContext } from './TokenContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


const ChartComponent = () => {
  const [chartData, setChartData] = useState(null);
  const token = useContext(TokenContext);


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
        console.log(data)
        setChartData(chartData);
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {chartData && (
         <BarChart width={600} height={300} data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
         <XAxis dataKey="date" />
         <YAxis />
         <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
         <Tooltip />
         <Legend />
         <Bar dataKey="total" fill="#8884d8" barSize={20} />
       </BarChart>
      )}
    </div>
  );
};

export default ChartComponent;