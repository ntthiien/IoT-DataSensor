

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
  CRow,
  CCol,
  CWidgetStatsA,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilSun, cilDrop, cilLightbulb } from '@coreui/icons';

const WidgetsDropdown = (props) => {
  const [sensorData, setSensorData] = useState([]); // Mảng lưu trữ dữ liệu cảm biến

  // Function to fetch data from the backend
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/datasensor/data');
      const data = await response.json();
      console.log(data); // Kiểm tra dữ liệu trả về từ API

      // Nếu có dữ liệu, cập nhật mảng sensorData
      if (data.data && data.data.length > 0) {
        setSensorData((prevData) => {
          // Kiểm tra xem dữ liệu mới đã tồn tại trong mảng chưa
          const newData = data.data.filter(
            (newItem) => !prevData.some((item) => item._id === newItem._id)
          );
          return [...prevData, ...newData]; // Kết hợp dữ liệu cũ với dữ liệu mới
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data lần đầu khi component mount
    const interval = setInterval(fetchData, 2000); // Cập nhật dữ liệu mỗi 2 giây

    return () => clearInterval(interval); // Dọn dẹp interval khi component unmount
  }, []);

  // Lấy giá trị mới nhất từ mảng dữ liệu
  const latestData = sensorData[sensorData.length - 1] || {};

  return (
    <CRow className={props.className} xs={{ gutter: 4 }}>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="danger"
          value={
            <>
              {latestData.temperature}°C{' '}
            </>
          }
          title="Temperature"
          action={
            <CIcon icon={cilSun} className="me-2" style={{ fontSize: '50px', color: 'rgba(255, 255, 255, 0.8)' }} />
          }
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="info"
          value={
            <>
              {latestData.humidity}%{' '}
            </>
          }
          title="Humidity"
          action={
            <CIcon icon={cilDrop} />
          }
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="warning"
          value={
            <>
              {latestData.light} lux{' '}
            </>
          }
          title="Light"
          action={
            <CIcon icon={cilLightbulb} />
          }
        />
      </CCol>
    </CRow>
  );
}

WidgetsDropdown.propTypes = {
  className: PropTypes.string,
  withCharts: PropTypes.bool,
}

export default WidgetsDropdown;
