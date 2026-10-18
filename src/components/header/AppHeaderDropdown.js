import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CAvatar,
  CDropdown,
  CDropdownToggle,
} from '@coreui/react'

import avatar8 from './../../assets/images/avatars/8.jpg'

const AppHeaderDropdown = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('authToken')
    localStorage.removeItem('adminEmail')
    // Redirect to login
    navigate('/login')
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
    </CDropdown>
  )
}

export default AppHeaderDropdown
