


import React from 'react'
import { Link } from 'react-router-dom'
import {
  CAvatar,
  CDropdown,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'

import avatar from './../../assets/images/avatars/images.jpg'

const AppHeaderDropdown = () => {
  return (
    <CDropdown variant="nav-item">
      <Link to="/profile">
        
        <CAvatar src={avatar} size="md" />
       
      </Link>
    </CDropdown>
  )
}

export default AppHeaderDropdown
