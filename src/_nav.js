/**
 * StudySphere Admin Panel - Sidebar Navigation Configuration
 * Clean version without notification badges.
 */

import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilPeople,
  cilList,
  cilCart,
  cilWarning,
  cilBell,
} from '@coreui/icons'

import { CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  // Dashboard Section
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },

  {
    component: CNavTitle,
    name: 'Management',
  },

  // Users Management
  {
    component: CNavItem,
    name: 'Users',
    to: '/users',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },

  // Products Management
  {
    component: CNavItem,
    name: 'Products',
    to: '/products',
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  },

  // Orders Management
  {
    component: CNavItem,
    name: 'Orders',
    to: '/orders',
    icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
  },

  {
    component: CNavTitle,
    name: 'Support',
  },

  // Reviews & Complaints
  {
    component: CNavItem,
    name: 'Reviews',
    to: '/reviews-complaints',
    icon: <CIcon icon={cilWarning} customClassName="nav-icon" />,
  },

  // Notifications - Badge removed for a cleaner look
  {
    component: CNavItem,
    name: 'Notifications',
    to: '/notifications',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
  },
]

export default _nav
