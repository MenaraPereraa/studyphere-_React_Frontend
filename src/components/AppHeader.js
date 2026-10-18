/**
 * AppHeader Component
 * Header matching provided UI screenshot
 */

import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CContainer, CHeader } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout'

const AppHeader = () => {
  const headerRef = useRef()
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const navigate = useNavigate()

  const primary = '#006A67'
  const sidebarColor = '#1e293b'

  useEffect(() => {
    const handleScroll = () => {
      headerRef.current &&
        headerRef.current.classList.toggle(
          'shadow-sm',
          document.documentElement.scrollTop > 0
        )
    }

    document.addEventListener('scroll', handleScroll)
    return () => document.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    // Clear any auth tokens/session data here if needed
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <CHeader
      position="sticky"
      className="p-0"
      ref={headerRef}
      style={{
        background: sidebarColor,
        backgroundColor: sidebarColor,
        borderBottom: '1px solid #334155',
      }}
    >
      <CContainer
        fluid
        style={{
          padding: 0,
          background: sidebarColor,
          backgroundColor: sidebarColor,
        }}
      >
        <div
          style={{
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            background: sidebarColor,
            backgroundColor: sidebarColor,
          }}
        >

          {/* LEFT SIDE - Title */}
          <span
            style={{
              fontSize: '20px',
              fontWeight: 700,
              color: '#fff',
            }}
          >
            Admin Panel
          </span>

          {/* RIGHT SIDE - Logout Button */}
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: primary,
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 16px',
              fontWeight: 600,
              cursor: 'pointer',
              marginLeft: '1050px',
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#005654'}
            onMouseLeave={e => e.currentTarget.style.background = primary}
          >
            <LogoutIcon style={{ fontSize: 20 }} />
            Logout
          </button>

        </div>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
