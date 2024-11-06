// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { CIcon } from '@coreui/icons-react';
// import { cilArrowTop, cilArrowBottom } from '@coreui/icons';
// import { CCard, CCardBody, CTable, CRow, CTableRow, CTableBody, CTableHead, CTableHeaderCell, CTableDataCell, CFormSelect, CButton, CFormInput } from '@coreui/react';
// import { useNavigate, useLocation } from 'react-router-dom';
// // const [searchTemperature, setSearchTemperature] = useState(''); // Tìm kiếm theo nhiệt độ
// // const [searchHumidity, setSearchHumidity] = useState(''); // Tìm kiếm theo độ ẩm
// // const [searchLight, setSearchLight] = useState(''); // Tìm kiếm theo ánh sáng

// const Table = () => {
//   const [data, setData] = useState([]); // Dữ liệu từ API
//   const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
//   const [sortOption, setSortOption] = useState('temperature'); // Sort key
//   const [sortDirection, setSortDirection] = useState('asc'); // Sort direction
//   const [totalPages, setTotalPages] = useState(1); // Tổng số trang
//   const [searchKey, setSearchKey] = useState('');
//   const [searchValue, setSearchValue] = useState('');
//   const itemsPerPage = 2; // Số item mỗi trang
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Hàm gọi API với axios
//   const fetchData = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/datasensor', {
//         params: {
//           sortKey: sortOption,
//           sortValue: sortDirection,
//           page: currentPage,
//           limit: itemsPerPage,
//           searchKey,
//           searchValue,
//         },
//       });
//       setData(response.data.data); // Đặt dữ liệu từ API
//       setTotalPages(response.data.totalPages); // Tổng số trang từ backend
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   // Gọi API mỗi khi sort hoặc phân trang thay đổi
//   useEffect(() => {
//     fetchData();
//   }, [sortOption, sortDirection, currentPage, searchKey, searchValue]);

//   useEffect(() => {
//     const newURL = `/datasensor?page=${currentPage}&sortKey=${sortOption}&sortValue=${sortDirection}&searchKey=${searchKey}&searchValue=${searchValue}`;
//     navigate(newURL, { replace: true }); // Cập nhật URL mà không làm mới trang
//   }, [currentPage, sortOption, sortDirection, searchKey, searchValue, navigate]);


//   // tìm kiếm
//   const handleSearch = (key) => {
//     setSearchKey(key);
//     setCurrentPage(1); // Reset to the first page on new search
//     // Xóa giá trị ô tìm kiếm khác
//     setSearchValue(''); // Reset search value before updating

//     // Đặt search value theo key đã chọn
//     // const input = document.querySelector(`input[placeholder="Search..."][onBlur="handleSearch('${key}')"]`);
//     // if (input) {
//     //   setSearchValue(input.value); // Lấy giá trị nhập vào ô tìm kiếm
//     // }
//     fetchData();
//   };

//   // Xử lý sort (sắp xếp tăng/giảm)
//   const handleSort = (direction) => {
//     setSortDirection(direction);
//     // const newURL = `/datasensor?sortKey=${sortOption}&sortValue=${direction}`;
//     // navigate(newURL, { replace: true }); // Cập nhật URL mà không làm mới trang
//   };

//   // Xử lý khi đổi trang
//   const handlePageChange = (pageNumber) => {
//     if (pageNumber > 0 && pageNumber <= totalPages) {
//       setCurrentPage(pageNumber); // Cập nhật trang hiện tại
//     }
//   };

//   // Tạo số trang để hiển thị trong phân trang

  
//   const getPageNumbers = () => {
//     const pages = [];
//     // const totalPages = Math.max(1, Math.ceil(data.length / itemsPerPage)); // Tổng số trang
//     // const startPage = Math.max(1, currentPage - 1); // Bắt đầu từ trang hiện tại - 1
//     // const endPage = Math.min(totalPages, startPage + 2); // Kết thúc là 2 trang sau trang bắt đầu

//     // for (let i = startPage; i <= endPage; i++) {
//     //   pages.push(i);
//     // }
//     for (let i = 1; i <= totalPages; i++) {
//       pages.push(i);
//     }
//     return pages;
//   };

//   return (
//     <CRow>
//       <CCard className="mb-4">
//         <CCardBody>
//           <div>
//             {/* Sort options */}
//             <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' ,width:'250px'}}>
//               <CFormSelect
//                 value={sortOption}
//                 onChange={(e) => setSortOption(e.target.value)}
//                 style={{ marginRight: '10px' }}
//               >
//                 <option value="temperature">Temperature</option>
//                 <option value="humidity">Humidity</option>
//                 <option value="light">Light</option>
//                 <option value="time">Time</option>
//               </CFormSelect>
//               <CButton onClick={() => handleSort('asc')} color="secondary" variant="outline" style={{ marginRight: '5px' }}>
//                 <CIcon icon={cilArrowTop} />
//               </CButton>
//               <CButton onClick={() => handleSort('desc')} color="success" variant="outline">
//                 <CIcon icon={cilArrowBottom} />
//               </CButton>
//             </div>

//             {/* Table */}
//             <CTable style={{ width: '100%', borderCollapse: 'collapse' }}>
//               <CTableHead color="light">
//                 <CTableRow>
//                   <CTableHeaderCell scope="col">
//                     <div>Temperature(C)</div>
//                     <CFormInput
//                       type="text"
//                       placeholder="Search..."
//                       onFocus={() => handleSearch('temperature')}
//                       onChange={(e) => {
//                         setSearchValue(e.target.value);
//                       }}
//                       // onBlur={() => handleSearch('temperature')}
//                       size="sm"
//                       style={{ marginTop: '5px', width: '120px'}}
//                     />
//                     {/* Temperature(C) */}
//                     {/* <CFormInput
//                       type="text"
//                       placeholder="Search Temperature"
//                       size="sm"
//                     /> */}
//                   </CTableHeaderCell>
//                   <CTableHeaderCell scope="col">
//                     <div>Humidity(%)</div>
//                     <CFormInput
//                       type="text"
//                       placeholder="Search..."
//                       onFocus={() => handleSearch('humidity')}
//                       onChange={(e) => {
//                         setSearchValue(e.target.value);
//                       }}
//                       // onBlur={() => handleSearch('humidity')}
//                       size="sm"
//                       style={{ marginTop: '5px', width: '120px'}}
//                     />
//                     </CTableHeaderCell>
//                   <CTableHeaderCell scope="col">
//                     {/* Light(LUX) */}
//                     <div>Light(LUX)</div>
//                     <CFormInput
//                       type="text"
//                       placeholder="Search..."
//                       onFocus={() => handleSearch('light')}
//                       onChange={(e) => {
//                         setSearchValue(e.target.value);
//                       }}
//                       // onBlur={() => handleSearch('light')}
//                       size="sm"
//                       style={{ marginTop: '5px', width: '120px'}}
//                     />
//                     </CTableHeaderCell>
//                   <CTableHeaderCell scope="col">Time</CTableHeaderCell>
//                 </CTableRow>
//               </CTableHead>
//               <CTableBody>
//                 {data.map((item) => (
//                   <CTableRow key={item.id}>
//                     <CTableDataCell style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{item.temperature}</CTableDataCell>
//                     <CTableDataCell style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{item.humidity}</CTableDataCell>
//                     <CTableDataCell style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{item.light}</CTableDataCell>
//                     <CTableDataCell style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{item.time}</CTableDataCell>
//                   </CTableRow>
//                 ))}
//               </CTableBody>
//             </CTable>

//             {/* Pagination Controls */}
//             <div style={{ marginTop: '10px', textAlign: 'center' }}>
//               <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
//                 Prev
//               </button>
//               {getPageNumbers().map((number) => (
//                 <button key={number} onClick={() => handlePageChange(number)} style={{ margin: '0 5px', fontWeight: number === currentPage ? 'bold' : 'normal' }}>
//                   {number}
//                 </button>
//               ))}
//               <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
//                 Next
//               </button>
//             </div>
//           </div>
//         </CCardBody>
//       </CCard>
//     </CRow>
//   );
// };

// export default Table;



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
      const response = await axios.get('http://localhost:5001/api/datasensor', {
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
    const newURL = `/datasensor?page=${currentPage}&sortKey=${sortOption}&sortValue=${sortDirection}&searchKey=${searchKey}&searchValue=${searchValue}`;
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
                <option value="temperature">Temperature</option>
                <option value="humidity">Humidity</option>
                <option value="light">Light</option>
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
                    <div>Temperature(C)</div>
                    <CFormInput
                      type="text"
                      placeholder="Search..."
                      onFocus={() => handleSearch('temperature')}
                      onChange={(e) => setSearchValue(e.target.value)}
                      size="sm"
                      style={{ marginTop: '5px', width: '120px' }}
                    />
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">
                    <div>Humidity(%)</div>
                    <CFormInput
                      type="text"
                      placeholder="Search..."
                      onFocus={() => handleSearch('humidity')}
                      onChange={(e) => setSearchValue(e.target.value)}
                      size="sm"
                      style={{ marginTop: '5px', width: '120px' }}
                    />
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">
                    <div>Light(LUX)</div>
                    <CFormInput
                      type="text"
                      placeholder="Search..."
                      onFocus={() => handleSearch('light')}
                      onChange={(e) => setSearchValue(e.target.value)}
                      size="sm"
                      style={{ marginTop: '5px', width: '120px' }}
                    />
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">Time</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {data.map((item) => (
                  <CTableRow key={item.id}>
                    <CTableDataCell style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{item.temperature}</CTableDataCell>
                    <CTableDataCell style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{item.humidity}</CTableDataCell>
                    <CTableDataCell style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{item.light}</CTableDataCell>
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
