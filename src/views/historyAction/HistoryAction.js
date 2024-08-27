import React, { useState } from 'react'
import { CIcon } from '@coreui/icons-react'
import { cilSearch, cilArrowTop, cilArrowBottom } from '@coreui/icons'
import { CCard, CCardBody, CTable, CRow, CTableRow, CTableBody, CTableHead, CTableHeaderCell, CTableDataCell,CFormSelect,CButton } from '@coreui/react'

const Table = () => {
  const initialData = [
    { id: 1, device: 'device A', action: 'on', time: '2024-08-26 12:30:45', user: 'User1' },
    { id: 2, device: 'device B', action: 'on', time: '2024-08-26 13:15:30', user: 'User2' },
    { id: 3, device: 'device C', action: 'on', time: '2024-08-26 14:00:00', user: 'User3' },
    { id: 5, device: 'device D', action: 'on', time: '2024-08-26 14:45:15', user: 'User1' },
    { id: 6, device: 'device E', action: 'on', time: '2024-08-26 14:45:15', user: 'User2' },
    { id: 7, device: 'device F', action: 'on', time: '2024-08-26 14:45:15', user: 'User4' },
    { id: 8, device: 'device G', action: 'on', time: '2024-08-26 14:45:15', user: 'User5' },
    { id: 9, device: 'device H', action: 'on', time: '2024-08-26 14:45:15', user: 'User6' },
    { id: 10, device: 'device J', action: 'on', time: '2024-08-26 14:45:15', user: 'User7' },
    { id: 11, device: 'device K', action: 'on', time: '2024-08-26 14:45:15', user: 'User8' },
    { id: 12, device: 'device L', action: 'on', time: '2024-08-26 14:45:15', user: 'User9' },
    { id: 13, device: 'device M', action: 'on', time: '2024-08-26 14:45:15', user: 'User1' },
    { id: 14, device: 'device N', action: 'on', time: '2024-08-26 14:45:15', user: 'User2' },
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
                <option value="device">Device</option>
                <option value="time">Time</option>
                <option value="action">Action</option>
                <option value="user">User</option>
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
                  <CTableHeaderCell scope="col">Device</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Time</CTableHeaderCell>
                  <CTableHeaderCell scope="col">User</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {currentItems.map((item) => (
                  <CTableRow key={item.id}>
                    <CTableDataCell style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{item.id}</CTableDataCell>
                    <CTableDataCell style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{item.device}</CTableDataCell>
                    <CTableDataCell style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{item.action}</CTableDataCell>
                    <CTableDataCell style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{item.time}</CTableDataCell>
                    <CTableDataCell style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{item.user}</CTableDataCell>
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

