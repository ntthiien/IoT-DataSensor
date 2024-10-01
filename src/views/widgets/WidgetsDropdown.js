
import React from 'react'
import PropTypes from 'prop-types'

import {
  CRow,
  CCol,
  CWidgetStatsA,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSun, cilDrop, cilLightbulb } from '@coreui/icons'

const WidgetsDropdown = (props) => {
  return (
    <CRow className={props.className} xs={{ gutter: 4 }}>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsA
          color="danger"
          value={
            <>
              22°C{' '}
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
              55%{' '}
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
              300 lux{' '}
            </>
          }
          title="Light"
          action={
            <CIcon icon={cilLightbulb} />
          }
        />
      </CCol>
    </CRow>
  )
}

WidgetsDropdown.propTypes = {
  className: PropTypes.string,
  withCharts: PropTypes.bool,
}

export default WidgetsDropdown

