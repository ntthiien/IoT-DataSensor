// import React, { useState, useEffect } from 'react'
// import CIcon from '@coreui/icons-react'
// import { cilWarning } from '@coreui/icons'
// import { CChartLine } from '@coreui/react-chartjs'
// import './style.scss';

// const Last = () => {
//     const [windSpeed, setWindSpeed] = useState(50)
//     const [windData, setWindData] = useState(Array(20).fill(50))
//     const [timeLabels, setTimeLabels] = useState(Array.from({ length: 20 }, (_, i) => `${i * 2}s`))

//   useEffect(() => {
//     const interval = setInterval(() => {
//       // Giả lập tốc độ gió mới ngẫu nhiên
//       const newWindSpeed = Math.floor(Math.random() * 100)

//       // Cập nhật tốc độ gió hiện tại
//       setWindSpeed(newWindSpeed)

//       // Cập nhật dữ liệu cho biểu đồ
//       setWindData((prevData) => [...prevData.slice(1), newWindSpeed])
//       setTimeLabels((prevLabels) => [...prevLabels.slice(1), `${parseInt(prevLabels[prevLabels.length - 1]) + 2}s`])
//     }, 2000)

//     return () => clearInterval(interval)
//   }, [])
// //   const [windSpeed, setWindSpeed] = useState(50)
// //   const [windData, setWindData] = useState(Array(20).fill(50))

// //   // Cập nhật tốc độ gió và biểu đồ mỗi 2 giây
// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       const newWindSpeed = Math.floor(Math.random() * 100)
// //       setWindSpeed(newWindSpeed)
// //       setWindData((prevData) => [...prevData.slice(1), newWindSpeed])
// //     }, 2000)

// //     return () => clearInterval(interval)
// //   }, [])

//   return (
//     <div className="container">
//       {/* Ô 1: Hiển thị số liệu tốc độ gió */}
//       <div className="box">
//         {/* <CIcon icon={cilFan} size="xl" style={{ marginBottom: '10px' }} /> */}
//         <h2>Wind Speed: {windSpeed} m/s</h2>
//       </div>

//       {/* Ô 2: Biểu đồ đường */}
//       <div className="chartBox">
//         <CChartLine
//           data={{
//             labels: timeLabels,
//             datasets: [
//               {
//                 label: 'Wind Speed (m/s)',
//                 backgroundColor: 'rgba(0,123,255,0.1)',
//                 borderColor: 'rgba(0,123,255,1)',
//                 pointBackgroundColor: 'rgba(0,123,255,1)',
//                 data: windData,
//               },
//             ],
//           }}
//           options={{
//             responsive: true,
//             maintainAspectRatio: false,
//             scales: {
//               x: { display: true },
//               y: { display: true, min: 0, max: 100 },
//             },
//           }}
//         />
//       </div>

//       {/* Ô 3: Biểu tượng cảnh báo */}
//       <div className="box">
//         <CIcon
//           icon={cilWarning}
//           size="xxl"
//           className="warning-icon"
//           style={{ 
//             color: windSpeed > 60 ? 'red' : 'gray',
//             width: '100px',   // Đặt kích thước lớn hơn bằng width
//             height: '100px',
//          }}
//         />
//         <h2>Warning</h2>
//       </div>
//     </div>
//   )
// }



// export default Last


import React, { useState, useEffect } from 'react';
import CIcon from '@coreui/icons-react';
import { cilWarning } from '@coreui/icons';
import { CChartLine } from '@coreui/react-chartjs';
import LED from './LED.js';
import Main from'./Chart.js';
import './style.scss';

const Last = () => {
  const [windSpeed, setWindSpeed] = useState(0); // Giá trị tốc độ gió hiện tại
  const [windData, setWindData] = useState([]); // Dữ liệu tốc độ gió cho biểu đồ
  const [timeLabels, setTimeLabels] = useState([]); // Nhãn thời gian cho biểu đồ

  useEffect(() => {
    // Hàm gọi API lấy dữ liệu từ backend
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/datasensor/data');
        const result = await response.json();
    
        if (result.data && result.data.length > 0) {
          const sensorData = result.data;
          
    
          // Lấy tốc độ gió và thời gian
          const windSpeeds = sensorData.map(item => item.windSpeed || 0);
          const times = sensorData.map(item => {
            const date = new Date(item.time);
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
          });
          console.log('Time Labels:', times);
    
          // Cập nhật state
          setWindSpeed(windSpeeds[windSpeeds.length - 1]);
          setWindData(windSpeeds);
          setTimeLabels(times);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    

    fetchData();
    const interval = setInterval(fetchData, 5000); // Cập nhật mỗi 5 giây

    return () => clearInterval(interval); // Xóa interval khi component bị hủy
  }, []);

  return (
    <div className="container">
      {/* Ô 1: Hiển thị số liệu tốc độ gió */}
      <div className="box">
        <h2>Wind Speed: {windSpeed} m/s</h2>
      </div>

      {/* Ô 2: Biểu đồ đường */}
      {/* <div className="chartBox">
        <CChartLine
          data={{
            labels: timeLabels,
            datasets: [
              {
                label: 'Wind Speed (m/s)',
                backgroundColor: 'rgba(0,123,255,0.1)',
                borderColor: 'rgba(0,123,255,1)',
                pointBackgroundColor: 'rgba(0,123,255,1)',
                data: windData,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: { display: true },
              y: { display: true, min: 0, max: 100 },
            },
          }}
        />
      </div> */}
      


      {/* Ô 3: Biểu tượng cảnh báo */}
      <div className="box">
        <LED/>
      </div>
      <div >
        <Main/>
      </div>
    </div>
  );
};

export default Last;
