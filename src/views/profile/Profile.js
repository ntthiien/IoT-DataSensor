import React from 'react'
import { CContainer, CRow, CCol, CCard, CCardBody, CCardImage, CCardTitle, CCardText } from '@coreui/react'

const members = [
  {
    name: 'John Doe',
    gender: 'Male',
    // avatar: 'https://via.placeholder.com/150',
  },
  {
    name: 'Jane Smith',
    gender: 'Female',
    // avatar: 'https://via.placeholder.com/150',
  },
  {
    name: 'Alice Johnson',
    gender: 'Female',
    // avatar: 'https://via.placeholder.com/150',
  },
]

const ProfilePage = () => {
  return (
    <CContainer>
      <CRow className="justify-content-center">
        {members.map((member, index) => (
          <CCol xs="12" sm="6" md="4" key={index}>
            <CCard className="text-center">
              <CCardImage orientation="top" src={member.avatar} alt={member.name} />
              <CCardBody>
                <CCardTitle>{member.name}</CCardTitle>
                <CCardText>{member.gender}</CCardText>
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>
    </CContainer>
  )
}

export default ProfilePage
