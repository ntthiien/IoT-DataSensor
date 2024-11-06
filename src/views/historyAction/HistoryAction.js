
// import React, { useEffect, useRef, useState } from 'react';
// import { CChartLine } from '@coreui/react-chartjs';
// import { getStyle } from '@coreui/utils';

// const MainChart = () => {
//   const chartRef = useRef(null);
//   const [chartData, setChartData] = useState({
//     labels: [],
//     temperature: [],
//     humidity: [],
//     light: [],
//   });

//   // Hàm để lấy dữ liệu từ backend
//   const fetchData = async () => {
//     try {
//       const response = await fetch("http://localhost:5001/api/datasensor");
//       if (!response.ok) throw new Error('Network response was not ok');
//       const result = await response.json();
//       console.log("Fetched data:", result.data);

//       // Giả sử rằng dữ liệu trả về có định dạng [{ time, temperature, humidity, light }, ...]
//       const labels = result.data.map(item => new Date(item.time).toLocaleDateString()); // Định dạng thời gian theo ngày
//       const temperature = result.data.map(item => item.temperature);
//       const humidity = result.data.map(item => item.humidity);
//       const light = result.data.map(item => item.light);

//       setChartData({
//         labels,
//         temperature,
//         humidity,
//         light,
//       });
//     } catch (error) {
//       console.error("Failed to fetch chart data:", error);
//     }
//   };

//   useEffect(() => {
//     // Lấy dữ liệu lần đầu
//     fetchData();

//     // Thiết lập interval để lấy dữ liệu mới sau mỗi 2 giây
//     const intervalId = setInterval(fetchData, 2000);

//     // Dọn dẹp khi component unmount
//     return () => clearInterval(intervalId);
//   }, []);

//   useEffect(() => {
//     if (chartRef.current) {
//       chartRef.current.update(); // Cập nhật biểu đồ khi dữ liệu thay đổi
//     }
//   }, [chartData]);

//   useEffect(() => {
//     document.documentElement.addEventListener('ColorSchemeChange', () => {
//       if (chartRef.current) {
//         setTimeout(() => {
//           // Cập nhật màu lưới và ticks theo scheme màu động
//           chartRef.current.options.scales.x.grid.borderColor = getStyle('--cui-border-color-translucent');
//           chartRef.current.options.scales.x.grid.color = getStyle('--cui-border-color-translucent');
//           chartRef.current.options.scales.x.ticks.color = getStyle('--cui-body-color');
//           chartRef.current.options.scales.y.grid.borderColor = getStyle('--cui-border-color-translucent');
//           chartRef.current.options.scales.y.grid.color = getStyle('--cui-border-color-translucent');
//           chartRef.current.options.scales.y.ticks.color = getStyle('--cui-body-color');
//           chartRef.current.update();
//         });
//       }
//     });
//   }, [chartRef]);

//   return (
//     <CChartLine
//       ref={chartRef}
//       style={{ height: '300px', marginTop: '40px' }}
//       data={{
//         labels: chartData.labels,
//         datasets: [
//           {
//             label: 'Nhiệt độ',
//             backgroundColor: 'rgba(255, 99, 132, 0.5)',
//             borderColor: getStyle('--cui-danger'),
//             data: chartData.temperature,
//             fill: true,
//           },
//           {
//             label: 'Độ ẩm',
//             backgroundColor: 'rgba(54, 162, 235, 0.5)',
//             borderColor: getStyle('--cui-info'),
//             data: chartData.humidity,
//             fill: true,
//           },
//           {
//             label: 'Ánh sáng',
//             backgroundColor: 'rgba(255, 206, 86, 0.5)',
//             borderColor: 'rgba(255, 206, 86, 1)',
//             data: chartData.light,
//             fill: true,
//             yAxisID: 'y2',
//           },
//         ],
//       }}
//       options={{
//         maintainAspectRatio: false,
//         plugins: {
//           legend: {
//             display: true,
//           },
//         },
//         scales: {
//           x: {
//             grid: {
//               borderColor: getStyle('--cui-border-color-translucent'),
//               color: getStyle('--cui-border-color-translucent'),
//             },
//             ticks: {
//               color: getStyle('--cui-body-color'),
//             },
//           },
//           y: {
//             type: 'linear',
//             display: true,
//             position: 'left',
//             grid: {
//               borderColor: getStyle('--cui-border-color-translucent'),
//               color: getStyle('--cui-border-color-translucent'),
//             },
//             ticks: {
//               color: getStyle('--cui-body-color'),
//             },
//             min: 0,
//             max: 100,
//           },
//           y2: {
//             type: 'linear',
//             display: true,
//             position: 'right',
//             grid: {
//               color: 'transparent',
//             },
//             ticks: {
//               color: getStyle('--cui-body-color'),
//             },
//             min: 0,
//             max: 1000,
//           },
//         },
//         elements: {
//           line: {
//             tension: 0.4,
//           },
//           point: {
//             radius: 0,
//             hoverRadius: 7,
//             hitRadius: 7,
//           },
//         },
//       }}
//     />
//   );
// };

// export default MainChart;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CIcon } from '@coreui/icons-react';
import { cilArrowTop, cilArrowBottom } from '@coreui/icons';
import { CCard, CCardBody, CTable, CRow, CTableRow, CTableBody, CTableHead, CTableHeaderCell, CTableDataCell, CFormSelect, CButton, CFormInput } from '@coreui/react';
import { useNavigate } from 'react-router-dom';

const Table = () => {
  const [data, setData] = useState([]); // Dữ liệu từ API
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [sortOption, setSortOption] = useState('time'); // Sort key
  const [sortDirection, setSortDirection] = useState('asc'); // Sort direction
  const [totalPages, setTotalPages] = useState(1); // Tổng số trang
  const [searchKey, setSearchKey] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const itemsPerPage = 2; // Số item mỗi trang
  const navigate = useNavigate();

  // Hàm gọi API với axios
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/history', {
        params: {
          sortKey: sortOption,
          sortValue: sortDirection,
          page: currentPage,
          limit: itemsPerPage,
          searchKey,
          searchValue,
        },
      });
      setData(response.data.data); // Đặt dữ liệu từ API
      setTotalPages(response.data.totalPages); // Tổng số trang từ backend
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Gọi API mỗi khi sort hoặc phân trang thay đổi
  useEffect(() => {
    fetchData();
  }, [sortOption, sortDirection, currentPage, searchKey, searchValue]);

  useEffect(() => {
    const newURL = `/history?page=${currentPage}&sortKey=${sortOption}&sortValue=${sortDirection}&searchKey=${searchKey}&searchValue=${searchValue}`;
    navigate(newURL, { replace: true }); // Cập nhật URL mà không làm mới trang
  }, [currentPage, sortOption, sortDirection, searchKey, searchValue, navigate]);

  // Tìm kiếm
  const handleSearch = (key) => {
    setSearchKey(key);
    setCurrentPage(1); // Reset to the first page on new search
    setSearchValue(''); // Reset search value before updating
    fetchData();
  };

  // Xử lý sort (sắp xếp tăng/giảm)
  const handleSort = (direction) => {
    setSortDirection(direction);
  };

  // Xử lý khi đổi trang
  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber); // Cập nhật trang hiện tại
    }
  };

  // Tạo số trang để hiển thị trong phân trang
  const getPageNumbers = () => {
    const pages = [];
    const total = totalPages; // Lấy tổng số trang

    // Tính toán các trang để hiển thị
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(total, startPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Nếu tổng số trang nhiều hơn 3, thêm các trang đầu và cuối
    if (total > 3) {
      if (startPage > 1) {
        pages.unshift(1); // Thêm trang 1 vào đầu
        if (startPage > 2) {
          pages.unshift('...'); // Thêm dấu ... nếu có nhiều trang
        }
      }
      if (endPage < total) {
        pages.push('...'); // Thêm dấu ... nếu có nhiều trang
        pages.push(total); // Thêm trang cuối vào cuối
      }
    }

    return pages;
  };

  return (
    <CRow>
      <CCard className="mb-4">
        <CCardBody>
          <div>
            {/* Sort options */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', width: '250px' }}>
              <CFormSelect
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                style={{ marginRight: '10px' }}
              >
                <option value="temperature">Device</option>
                <option value="humidity">Action</option>
                <option value="time">Time</option>
              </CFormSelect>
              <CButton onClick={() => handleSort('asc')} color="secondary" variant="outline" style={{ marginRight: '5px' }}>
                <CIcon icon={cilArrowTop} />
              </CButton>
              <CButton onClick={() => handleSort('desc')} color="success" variant="outline">
                <CIcon icon={cilArrowBottom} />
              </CButton>
            </div>

            {/* Table */}
            <CTable style={{ width: '100%', borderCollapse: 'collapse' }}>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell scope="col">
                    <div>Device</div>
                    <CFormInput
                      type="text"
                      placeholder="Search..."
                      onFocus={() => handleSearch('device')}
                      onChange={(e) => setSearchValue(e.target.value)}
                      size="sm"
                      style={{ marginTop: '5px', width: '120px' }}
                    />
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">
                    <div>Action</div>
                    <CFormInput
                      type="text"
                      placeholder="Search..."
                      onFocus={() => handleSearch('action')}
                      onChange={(e) => setSearchValue(e.target.value)}
                      size="sm"
                      style={{ marginTop: '5px', width: '120px' }}
                    />
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">
                    <div>Time</div>
                    <CFormInput
                      type="text"
                      placeholder="Search..."
                      onFocus={() => handleSearch('time')}
                      onChange={(e) => setSearchValue(e.target.value)}
                      size="sm"
                      style={{ marginTop: '5px', width: '120px' }}
                    />
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {data.map((item) => (
                  <CTableRow key={item.id}>
                    <CTableDataCell style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{item.device}</CTableDataCell>
                    <CTableDataCell style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{item.action}</CTableDataCell>
                    <CTableDataCell style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{item.time}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>

            {/* Pagination Controls */}
            <div style={{ marginTop: '10px', textAlign: 'center' }}>
              <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                Prev
              </button>
              {getPageNumbers().map((number) => (
                <button
                  key={number}
                  onClick={() => {
                    if (number !== '...') {
                      handlePageChange(number);
                    }
                  }}
                  style={{
                    margin: '0 5px',
                    fontWeight: number === currentPage ? 'bold' : 'normal',
                    cursor: number === '...' ? 'default' : 'pointer',
                  }}
                  disabled={number === '...'} // Disable button if it's '...'
                >
                  {number}
                </button>
              ))}
              <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                Next
              </button>
            </div>
          </div>
        </CCardBody>
      </CCard>
    </CRow>
  );
};

export default Table;
