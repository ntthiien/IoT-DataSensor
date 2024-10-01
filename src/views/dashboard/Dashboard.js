

import React from 'react'
// import React, { useEffect } from 'react';
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
} from '@coreui/react'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import MainChart from './MainChart'
import Device from './Device'

const Dashboard = () => {
  // useEffect(() => {
  //   document.title = 'Dashboard';  // Thay đổi tiêu đề trang
  // }, []);
  return (
    <>
      <WidgetsDropdown className="mb-4" />

      <CRow>
        {/* Card for MainChart */}
        <CCol xs={12} md={8}>
          <CCard className="mb-4">
            <CCardBody>
              <CRow>
                <CCol sm={5}>
                  <h4 id="traffic" className="card-title mb-0">
                    Data-Sensor
                  </h4>
                </CCol>
                {/* <CCol sm={7} className="d-none d-md-block">
                  <CButton color="primary" className="float-end">
                    <CIcon icon={cilCloudDownload} />
                  </CButton>
                  <CButtonGroup className="float-end me-3">
                    {['Day', 'Month', 'Year'].map((value) => (
                      <CButton
                        color="outline-secondary"
                        key={value}
                        className="mx-0"
                        active={value === 'Month'}
                      >
                        {value}
                      </CButton>
                    ))}
                  </CButtonGroup>
                </CCol> */}
              </CRow>
              <MainChart />
            </CCardBody>
          </CCard>
        </CCol>
        
        {/* Card for Device */}
        <CCol xs={12} md={4}>
          <CCard className="mb-4">
            <CCardBody>
              <h4 className="card-title mb-4">Devices Control</h4>
              <Device />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <WidgetsBrand className="mb-4" withCharts />
    </>
  )
}

export default Dashboard
