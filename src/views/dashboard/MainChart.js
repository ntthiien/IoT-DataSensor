



import React, { useEffect, useRef, useState } from 'react';
import { CChartLine } from '@coreui/react-chartjs';
import { getStyle } from '@coreui/utils';

const MAX_DATA_POINTS = 10; // Giới hạn số lượng điểm dữ liệu tối đa

const MainChart = () => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({
    labels: [],
    temperature: [],
    humidity: [],
    light: [],
  });

  // Hàm để định dạng thời gian
  const formatTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleTimeString(); // Trả về thời gian định dạng H:i:s
  };

  useEffect(() => {
    // Hàm lấy dữ liệu từ backend
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/datasensor/data");
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();

        // Lấy dữ liệu mới nhất từ backend
        const newData = result.data[result.data.length - 1]; // Lấy phần tử cuối cùng

        if (newData) {
          const formattedTime = formatTime(newData.time);
          setChartData(prevData => {
            // Kiểm tra xem dữ liệu mới có khác với dữ liệu cũ không
            if (prevData.labels.length > 0 && prevData.labels[prevData.labels.length - 1] === formattedTime) {
              return prevData; // Không thay đổi nếu nhãn thời gian giống nhau
            }

            const newLabels = [...prevData.labels, formattedTime];
            const newTemperature = [...prevData.temperature, newData.temperature];
            const newHumidity = [...prevData.humidity, newData.humidity];
            const newLight = [...prevData.light, newData.light];

            // Nếu số lượng dữ liệu lớn hơn tối đa, xóa dữ liệu cũ nhất
            if (newLabels.length > MAX_DATA_POINTS) {
              newLabels.shift(); // Xóa phần tử đầu tiên
              newTemperature.shift();
              newHumidity.shift();
              newLight.shift();
            }

            return {
              labels: newLabels,
              temperature: newTemperature,
              humidity: newHumidity,
              light: newLight,
            };
          });
        }
      } catch (error) {
        console.error("Failed to fetch chart data:", error);
      }
    };

    // Gọi fetchData lần đầu
    fetchData();

    // Thiết lập interval để gọi fetchData sau mỗi 2 giây
    const intervalId = setInterval(fetchData, 2000);

    // Dọn dẹp khi component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Cập nhật biểu đồ khi chartData thay đổi
  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.update();
    }
  }, [chartData]);

  return (
    <CChartLine
      ref={chartRef}
      style={{ height: '300px', marginTop: '40px' }}
      data={{
        labels: chartData.labels,
        datasets: [
          {
            label: 'Nhiệt độ',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: getStyle('--cui-danger'),
            data: chartData.temperature,
            fill: true,
          },
          {
            label: 'Độ ẩm',
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: getStyle('--cui-info'),
            data: chartData.humidity,
            fill: true,
          },
          {
            label: 'Ánh sáng',
            backgroundColor: 'rgba(255, 206, 86, 0.5)',
            borderColor: 'rgba(255, 206, 86, 1)',
            data: chartData.light,
            fill: true,
            yAxisID: 'y2',
          },
        ],
      }}
      options={{
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
          },
        },
        scales: {
          x: {
            grid: {
              borderColor: getStyle('--cui-border-color-translucent'),
              color: getStyle('--cui-border-color-translucent'),
            },
            ticks: {
              color: getStyle('--cui-body-color'),
            },
          },
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            grid: {
              borderColor: getStyle('--cui-border-color-translucent'),
              color: getStyle('--cui-border-color-translucent'),
            },
            ticks: {
              color: getStyle('--cui-body-color'),
            },
            min: 0,
            max: 100,
          },
          y2: {
            type: 'linear',
            display: true,
            position: 'right',
            grid: {
              color: 'transparent',
            },
            ticks: {
              color: getStyle('--cui-body-color'),
            },
            min: 0,
            max: 1000,
          },
        },
        elements: {
          line: {
            tension: 0.4,
          },
          point: {
            radius: 0,
            hoverRadius: 7,
            hitRadius: 7,
          },
        },
      }}
    />
  );
};

export default MainChart;
