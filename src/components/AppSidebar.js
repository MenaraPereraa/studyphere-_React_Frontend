/**
 * AppSidebar Component
 *
 * Collapsible navigation sidebar with branding, menu items, and toggle controls.
 *
 * Features:
 * - Redux-controlled visibility state
 * - Unfoldable/narrow mode for more screen space
 * - Brand logo with full and narrow variants
 * - Close button for mobile devices
 * - Footer with toggle button
 * - Dark color scheme
 * - Fixed positioning
 */

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarHeader,
} from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'

import sremoveLogo from 'src/assets/brand/sremove.png'

// sidebar nav config
import _nav from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
      style={{
        paddingTop: '24px',
        paddingBottom: '24px',
        backgroundColor: '#1e293b',
      }}
    >
      {/* Sidebar Header with Dark Background */}
      <CSidebarHeader
        className="border-bottom"
        style={{
          backgroundColor: '#1e293b', // Match sidebar color
          padding: '20px 16px 20px 16px',
          borderBottom: '1px solid #334155', // Subtle divider
        }}
      >
        {/* Logo Container - No White Background, No Border */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '8px 0',
          }}
        >
          <CSidebarBrand
            className="d-none d-md-flex"
            to="/"
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            <img
              src={sremoveLogo}
              alt="Logo"
              style={{
                height: '90px',
                width: 'auto',
                background: '#fff',
                borderRadius: '12px',
                padding: '6px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              }}
            />
          </CSidebarBrand>
        </div>

        {/* Close Button for Mobile */}
        <CCloseButton
          className="d-lg-none"
          white
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
          style={{ position: 'absolute', right: '16px', top: '24px' }}
        />
      </CSidebarHeader>

      {/* Sidebar Navigation */}
      <div style={{ marginTop: '20px' }}>
        <AppSidebarNav items={_nav} />
      </div>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
