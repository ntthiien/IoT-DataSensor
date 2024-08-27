import React, { useState } from 'react'
import { CIcon } from '@coreui/icons-react'
import { cilSearch, cilArrowTop, cilArrowBottom } from '@coreui/icons'
import { CCard, CCardBody, CTable, CRow, CTableRow, CTableBody, CTableHead, CTableHeaderCell, CTableDataCell,CFormSelect,CButton } from '@coreui/react'

const Table = () => {
  const initialData = [
    { id: 1, temperature: '10',humidity:'10',light: '100', time: '2024-08-26 12:30:45'},
    { id: 2, temperature: '20',humidity:'20',light: '120', time: '2024-08-26 13:15:30' },
    { id: 3, temperature: '30',humidity:'41',light: '130', time: '2024-08-26 14:00:00' },
    { id: 5, temperature: '40',humidity:'42',light: '140', time: '2024-08-26 14:45:15' },
    { id: 6, temperature: '50',humidity:'43',light: '150', time: '2024-08-27 14:45:15' },
    { id: 7, temperature: '15',humidity:'44',light: '160', time: '2024-08-28 14:45:15' },
    { id: 8, temperature: '25',humidity:'45',light: '170', time: '2024-08-29 14:45:15' },
    { id: 9, temperature: '35',humidity:'46',light: '180', time: '2024-08-30 14:45:15' },
    { id: 10, temperature: '33',humidity:'47',light: '190', time: '2024-08-31 14:45:15' },
    { id: 11, temperature: '32',humidity:'48',light: '200', time: '2024-09-01 14:45:15'},
    { id: 12, temperature: '31',humidity:'49',light: '210', time: '2024-09-02 14:45:15' },
    { id: 13, temperature: '45',humidity:'50',light: '220', time: '2024-09-03 14:45:15' },
    { id: 14, temperature: '43',humidity:'51',light: '230', time: '2024-09-04 14:45:15'},
  ]

  const [data, setData] = useState(initialData)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortOption, setSortOption] = useState('device')
  const itemsPerPage = 2

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase()
    setSearchTerm(value)

    const filteredData = initialData.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(value)
      )
    )

    setData(filteredData)
    setCurrentPage(1) // Reset to first page when searching
  }

  const handleSort = (direction) => {
    const sortedData = [...data].sort((a, b) => {
      if (direction === 'asc') {
        return a[sortOption].localeCompare(b[sortOption])
      } else {
        return b[sortOption].localeCompare(a[sortOption])
      }
    })
    setData(sortedData)
  }

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem)

  const totalPages = Math.ceil(data.length / itemsPerPage)

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
    }
  }

  const getPageNumbers = () => {
    const pages = []
    for (let i = Math.max(currentPage - 1, 1); i <= Math.min(currentPage + 1, totalPages); i++) {
      pages.push(i)
    }
    return pages
  }

  return (
    <CRow>
      <CCard className="mb-4">
        <CCardBody>
          <div>
            <div style={{ position: 'relative', marginBottom: '10px' }}>
              <input
                type="text"
                placeholder="Tìm kiếm..."
                value={searchTerm}
                onChange={handleSearch}
                style={{
                  padding: '8px 8px 8px 30px',
                  width: '100%',
                  boxSizing: 'border-box'
                }}
              />
              <CIcon icon={cilSearch} style={{ 
                position: 'absolute', 
                top: '50%', 
                left: '10px', 
                transform: 'translateY(-50%)',
                color: '#aaa'
              }} />
              
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' , marginRight:'350px'}}>
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
              <CButton onClick={() => handleSort('asc')} color="secondary" variant="outline" style={{marginRight:'5px'}}>
                <CIcon icon={cilArrowTop} />
              </CButton>
              <CButton onClick={() => handleSort('desc')} color="success" variant="outline">
                <CIcon icon={cilArrowBottom} />
              </CButton>
            </div>
            
            <CTable style={{ width: '100%', borderCollapse: 'collapse' }}>
                <CTableHead color="light">
                    <CTableRow>
                        <CTableHeaderCell scope="col">Id</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Temperature(C)</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Humidity(%)</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Light(LUX)</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Time</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
              {/* <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell scope="col">Id</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Temperature</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Humidity </CTableHeaderCell>
                  <CTableHeaderCell scope="col">Light</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Time</CTableHeaderCell>
                </CTableRow>
              </CTableHead> */}
              <CTableBody>
                {currentItems.map((item) => (
                  <CTableRow key={item.id}>
                    <CTableDataCell style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{item.id}</CTableDataCell>
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
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={{
                    margin: '0 5px',
                    border: '1px solid #ccc',
                    backgroundColor: '#f9f9f9',
                    fontSize: '12px',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    color: '#555',
                 }}
              >
                Prev
              </button>
              {getPageNumbers().map((number) => (
                <button
                  key={number}
                  onClick={() => handlePageChange(number)}
                  style={{
                    margin: '0 5px',
                    border: '1px solid #ccc',
                    backgroundColor: '#f9f9f9',
                    fontSize: '12px',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    color: '#555',
                    fontWeight: number === currentPage ? 'bold' : 'normal'
                  }}
                >
                  {number}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{ 
                    margin: '0 5px',
                    border: '1px solid #ccc',
                    backgroundColor: '#f9f9f9',
                    fontSize: '12px',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    color: '#555',
                 }}
              >
                Next
              </button>
            </div>
          </div>
        </CCardBody>
      </CCard>
    </CRow>
  )
}

export default Table

