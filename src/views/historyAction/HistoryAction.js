import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CCard, CCardBody, CTable, CRow, CTableRow, CTableBody, CTableHead, CTableHeaderCell, CTableDataCell, CFormSelect, CFormInput,CButton } from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import { CIcon } from '@coreui/icons-react';
import { cilSearch } from '@coreui/icons';

const Table = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [device, setDevice] = useState('');
  const [time, setTime] = useState(''); // Giá trị thời gian tìm kiếm
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 2;
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/history', {
        params: {
          device,
          page: currentPage,
          limit: itemsPerPage,
          time, // Gửi thời gian lên backend để lọc
        },
      });
      setData(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [device, currentPage, time]);

  useEffect(() => {
    const newURL = `/history?page=${currentPage}&device=${device}&time=${time}`;
    navigate(newURL, { replace: true });
  }, [currentPage, device, time, navigate]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1); // Reset về trang 1 mỗi khi tìm kiếm mới
    fetchData();
  };

  const getPageNumbers = () => {
    const pages = [];
    const total = totalPages;

    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(total, startPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (total > 3) {
      if (startPage > 1) {
        pages.unshift(1);
        if (startPage > 2) {
          pages.unshift('...');
        }
      }
      if (endPage < total) {
        pages.push('...');
        pages.push(total);
      }
    }

    return pages;
  };

  return (
    <CRow>
      <CCard className="mb-4">
        <CCardBody>
          <div>
            {/* Device Filter */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <CFormSelect
                value={device}
                onChange={(e) => setDevice(e.target.value)}
                style={{ marginRight: '10px', width: '150px' }}
              >
                <option value="">Select Device</option>
                <option value="Lamp">Lamp</option>
                <option value="Air Conditioner">Air Conditioner</option>
                <option value="Ceiling Fan">Ceiling Fan</option>
              </CFormSelect>

              {/* Thời gian tìm kiếm */}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <CFormInput
                type="text"
                placeholder="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                style={{ marginBottom: '10px',width: '200px' }}
              />
              <CButton onClick={handleSearch}>
                <CIcon 
                  icon={cilSearch} 
                  size="xl"
                  style={{
                    marginBottom:'10px',
                    // width: '100px',   // Đặt kích thước lớn hơn bằng width
                    // height: '100px',
                  }}
                />
              </CButton>
            </div>
            {/* <div>
              <CFormInput
                type="text"
                placeholder="Search"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                style={{ c }}
              />
            </div> */}
            

            {/* Table */}
            <CTable style={{ width: '100%', borderCollapse: 'collapse' }}>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell scope="col">Device</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Time</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {data.map((item) => (
                  <CTableRow key={item.id}>
                    <CTableDataCell style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{item.device}</CTableDataCell>
                    <CTableDataCell style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{item.action}</CTableDataCell>
                    <CTableDataCell style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>
                      {new Date(item.time).toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })} 
                    </CTableDataCell>
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
                  disabled={number === '...'}
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





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { CIcon } from '@coreui/icons-react';
// import { cilArrowTop, cilArrowBottom } from '@coreui/icons';
// import { CCard, CCardBody, CTable, CRow, CTableRow, CTableBody, CTableHead, CTableHeaderCell, CTableDataCell, CFormSelect, CButton, CFormInput } from '@coreui/react';
// import { useNavigate } from 'react-router-dom';

// const Table = () => {
//   const [data, setData] = useState([]); // Dữ liệu từ API
//   const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
//   const [sortOption, setSortOption] = useState('time'); // Sort key
//   const [sortDirection, setSortDirection] = useState('asc'); // Sort direction
//   const [totalPages, setTotalPages] = useState(1); // Tổng số trang
//   const [searchKey, setSearchKey] = useState('');
//   const [searchValue, setSearchValue] = useState('');
//   const itemsPerPage = 2; // Số item mỗi trang
//   const navigate = useNavigate();

//   // Hàm gọi API với axios
//   const fetchData = async () => {
//     try {
//       const response = await axios.get('http://localhost:5001/api/history', {
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
//     const newURL = `/history?page=${currentPage}&sortKey=${sortOption}&sortValue=${sortDirection}&searchKey=${searchKey}&searchValue=${searchValue}`;
//     navigate(newURL, { replace: true }); // Cập nhật URL mà không làm mới trang
//   }, [currentPage, sortOption, sortDirection, searchKey, searchValue, navigate]);

//   // Tìm kiếm
//   const handleSearch = (key) => {
//     setSearchKey(key);
//     setCurrentPage(1); // Reset to the first page on new search
//     setSearchValue(''); // Reset search value before updating
//     fetchData();
//   };

//   // Xử lý sort (sắp xếp tăng/giảm)
//   const handleSort = (direction) => {
//     setSortDirection(direction);
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
//     const total = totalPages; // Lấy tổng số trang

//     // Tính toán các trang để hiển thị
//     const startPage = Math.max(1, currentPage - 1);
//     const endPage = Math.min(total, startPage + 2);

//     for (let i = startPage; i <= endPage; i++) {
//       pages.push(i);
//     }

//     // Nếu tổng số trang nhiều hơn 3, thêm các trang đầu và cuối
//     if (total > 3) {
//       if (startPage > 1) {
//         pages.unshift(1); // Thêm trang 1 vào đầu
//         if (startPage > 2) {
//           pages.unshift('...'); // Thêm dấu ... nếu có nhiều trang
//         }
//       }
//       if (endPage < total) {
//         pages.push('...'); // Thêm dấu ... nếu có nhiều trang
//         pages.push(total); // Thêm trang cuối vào cuối
//       }
//     }

//     return pages;
//   };

//   return (
//     <CRow>
//       <CCard className="mb-4">
//         <CCardBody>
//           <div>
//             {/* Sort options */}
//             <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', width: '250px' }}>
//               <CFormSelect
//                 value={sortOption}
//                 onChange={(e) => setSortOption(e.target.value)}
//                 style={{ marginRight: '10px' }}
//               >
//                 <option value="temperature">Device</option>
//                 <option value="humidity">Action</option>
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
//                     <div>Device</div>
//                     <CFormInput
//                       type="text"
//                       placeholder="Search..."
//                       onFocus={() => handleSearch('device')}
//                       onChange={(e) => setSearchValue(e.target.value)}
//                       size="sm"
//                       style={{ marginTop: '5px', width: '120px' }}
//                     />
//                   </CTableHeaderCell>
//                   <CTableHeaderCell scope="col">
//                     <div>Action</div>
//                     <CFormInput
//                       type="text"
//                       placeholder="Search..."
//                       onFocus={() => handleSearch('action')}
//                       onChange={(e) => setSearchValue(e.target.value)}
//                       size="sm"
//                       style={{ marginTop: '5px', width: '120px' }}
//                     />
//                   </CTableHeaderCell>
//                   <CTableHeaderCell scope="col">
//                     <div>Time</div>
//                     <CFormInput
//                       type="text"
//                       placeholder="Search..."
//                       onFocus={() => handleSearch('time')}
//                       onChange={(e) => setSearchValue(e.target.value)}
//                       size="sm"
//                       style={{ marginTop: '5px', width: '120px' }}
//                     />
//                   </CTableHeaderCell>
//                 </CTableRow>
//               </CTableHead>
//               <CTableBody>
//                 {data.map((item) => (
//                   <CTableRow key={item.id}>
//                     <CTableDataCell style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{item.device}</CTableDataCell>
//                     <CTableDataCell style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{item.action}</CTableDataCell>
//                     <CTableDataCell style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>
//                       {new Date(item.time).toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })} 
//                     </CTableDataCell>
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
//                 <button
//                   key={number}
//                   onClick={() => {
//                     if (number !== '...') {
//                       handlePageChange(number);
//                     }
//                   }}
//                   style={{
//                     margin: '0 5px',
//                     fontWeight: number === currentPage ? 'bold' : 'normal',
//                     cursor: number === '...' ? 'default' : 'pointer',
//                   }}
//                   disabled={number === '...'} // Disable button if it's '...'
//                 >
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
