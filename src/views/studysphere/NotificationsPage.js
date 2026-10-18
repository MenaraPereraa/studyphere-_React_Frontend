import React, { useState, useEffect } from 'react'
import {
  CButton, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter,
  CForm, CFormInput, CFormTextarea, CFormSelect, CRow, CCol,
} from '@coreui/react'
import axios from 'axios'

const PAGE_SIZE = 8

const getPageNumbers = (current, total) => {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1)
  const pages = [1]
  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  if (start > 2) pages.push('...')
  for (let i = start; i <= end; i++) pages.push(i)
  if (end < total - 1) pages.push('...')
  pages.push(total)
  return pages
}

const Pagination = ({ page, totalPages, totalItems, onChange }) => {
  if (totalItems <= PAGE_SIZE) return null
  const from = (page - 1) * PAGE_SIZE + 1
  const to = Math.min(page * PAGE_SIZE, totalItems)

  return (
    <div className="np-pagination">
      <span className="np-pagination-info">Showing {from}–{to} of {totalItems}</span>
      <div className="np-pagination-controls">
        <button className="np-page-btn" disabled={page === 1} onClick={() => onChange(page - 1)}>
          Previous
        </button>
        {getPageNumbers(page, totalPages).map((p, i) =>
          p === '...' ? (
            <span key={`gap-${i}`} className="np-page-gap">…</span>
          ) : (
            <button
              key={p}
              className={`np-page-btn ${p === page ? 'np-page-active' : ''}`}
              onClick={() => onChange(p)}
            >
              {p}
            </button>
          ),
        )}
        <button className="np-page-btn" disabled={page === totalPages} onClick={() => onChange(page + 1)}>
          Next
        </button>
      </div>
    </div>
  )
}

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([])
  const [search, setSearch] = useState('')
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  const THEME_COLOR = '#0F6F63'

  const STATUS_STYLES = {
    Sent: { bg: '#dcfce7', color: '#15803d' },
    Active: { bg: '#dcfce7', color: '#15803d' },
    Pending: { bg: '#fef3c7', color: '#b45309' },
    Draft: { bg: '#f1f5f9', color: '#64748b' },
  }

  const [newNotification, setNewNotification] = useState({
    title: '',
    message: '',
    targetAudience: 'All Users',
    type: 'Announcement',
    status: 'Active',
  })

  const fetchNotifications = async () => {
    try {
      setLoading(true)
      const response = await axios.get('http://localhost:8080/api/v1/notifications/all')

      console.log("Response from Backend:", response.data);

      const formattedData = response.data.map((n) => ({
        id: n.id || 'N/A',
        title: n.title || 'No Title',
        message: n.message || 'No Message',
        type: n.type || 'Announcement',
        targetAudience: n.target || 'All Users',
        createdDate: n.timestamp ? new Date(n.timestamp).toLocaleDateString() : 'Just now',
        status: 'Sent',
      }))

      setNotifications(formattedData)
    } catch (error) {
      console.error('Error fetching notifications:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotifications()
  }, [])

  useEffect(() => {
    setPage(1)
  }, [search])

  const filtered = notifications.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.message.toLowerCase().includes(search.toLowerCase()) ||
      n.id.toLowerCase().includes(search.toLowerCase()),
  )

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  const handleSendNotification = async (e) => {
    if (e) e.preventDefault()
    if (!newNotification.title || !newNotification.message) {
      alert('Please enter title and message!')
      return
    }

    const notificationPayload = {
      title: newNotification.title,
      message: newNotification.message,
      type: newNotification.type,
      target: newNotification.targetAudience === 'All Users' ? 'all' : 'admins',
    }

    try {
      const response = await axios.post('http://localhost:8080/api/v1/notifications/send', notificationPayload)

      if (response.data) {
        alert('Notification Sent Successfully!')
        setVisible(false)
        setNewNotification({
          title: '',
          message: '',
          targetAudience: 'All Users',
          type: 'Announcement',
          status: 'Active',
        })
        fetchNotifications()
      }
    } catch (error) {
      console.error('Error sending notification:', error)
      alert('Failed to send notification. Check console for details.')
    }
  }

  return (
    <div className="np-page" data-coreui-theme="light">
      <style>{`
        .np-page { padding: 40px; font-family: 'Inter', sans-serif; min-height: 100vh; background: #f6f8fb; color: #334155; }
        .np-page *, .np-page *::before, .np-page *::after { box-sizing: border-box; }
        .np-header-card { background: #ffffff; border-radius: 14px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); padding: 24px 32px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; }
        .np-page-title { font-size: 28px; font-weight: 700; color: #1e293b; margin: 0; }
        .np-page-subtitle { color: #64748b; font-size: 14px; }
        .np-search-input { width: 280px; padding: 10px 14px; border-radius: 8px; border: 1px solid #e2e8f0; background: #ffffff; color: #1e293b; outline: none; font-size: 14px; transition: all 0.2s; }
        .np-search-input::placeholder { color: #94a3b8; }
        .np-search-input:focus { border-color: ${THEME_COLOR}; box-shadow: 0 0 0 3px rgba(15, 111, 99, 0.1); }
        .np-table-card { background: #ffffff; border-radius: 14px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); overflow: hidden; color: #334155; }
        .np-table-card-header { padding: 20px 24px; border-bottom: 1px solid #f1f5f9; font-weight: 600; font-size: 15px; color: #1e293b; }
        .np-table { width: 100%; border-collapse: collapse; background: #ffffff; }
        .np-table thead { background: #f8fafc; }
        .np-table th { text-align: left; padding: 14px 24px; font-size: 12px; letter-spacing: .05em; text-transform: uppercase; color: #64748b; font-weight: 600; border: 0; }
        .np-table td { padding: 16px 24px; border-top: 1px solid #f1f5f9; font-size: 14px; color: #334155; background: #ffffff; }
        .np-muted { color: #64748b; }
        .np-id { max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .np-target { font-weight: 500; color: #334155; }
        .np-notif-title { font-weight: 600; color: #0f172a; }
        .np-notif-msg { font-size: 12px; color: #64748b; max-width: 350px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .np-status-pill { padding: 5px 12px; border-radius: 6px; font-size: 12px; font-weight: 600; display: inline-block; }
        .np-type-tag { font-size: 12px; color: #64748b; background: #f1f5f9; padding: 4px 8px; border-radius: 4px; }
        .np-state { padding: 32px; text-align: center; color: #64748b; }
        .np-pagination { display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; padding: 16px 24px; border-top: 1px solid #f1f5f9; background: #ffffff; }
        .np-pagination-info { font-size: 13px; color: #64748b; }
        .np-pagination-controls { display: flex; gap: 6px; align-items: center; flex-wrap: wrap; }
        .np-page-btn { min-width: 36px; height: 36px; padding: 0 12px; border-radius: 8px; border: 1px solid #e2e8f0; background: #ffffff; color: #334155; font-size: 13px; font-weight: 500; cursor: pointer; }
        .np-page-btn:hover:not(:disabled) { border-color: ${THEME_COLOR}; color: ${THEME_COLOR}; }
        .np-page-btn:disabled { opacity: 0.45; cursor: not-allowed; }
        .np-page-btn.np-page-active { background: ${THEME_COLOR}; border-color: ${THEME_COLOR}; color: #ffffff; }
        .np-page-gap { padding: 0 4px; color: #94a3b8; }
        .np-modal .modal-content { background: #ffffff; color: #334155; border: 0; border-radius: 14px; }
        .np-modal .form-label { color: #334155; font-weight: 500; }
        .np-modal .form-control, .np-modal .form-select { background-color: #ffffff; color: #1e293b; border-color: #cbd5e1; }
        .np-modal .form-control:focus, .np-modal .form-select:focus { border-color: ${THEME_COLOR}; box-shadow: 0 0 0 3px rgba(15, 111, 99, 0.12); }
        .np-modal .btn-close { filter: none; }
      `}</style>

      <div className="np-header-card">
        <div>
          <div className="np-page-title">Notifications</div>
          <div className="np-page-subtitle">Manage marketplace announcements and user alerts</div>
        </div>
        <div className="d-flex gap-3 align-items-center">
          <input
            className="np-search-input"
            placeholder="Search notifications..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <CButton
            style={{ backgroundColor: THEME_COLOR, border: 'none' }}
            className="text-white fw-bold px-4 rounded-3"
            onClick={() => setVisible(true)}
          >
            + New Notification
          </CButton>
        </div>
      </div>

      <div className="np-table-card">
        <div className="np-table-card-header">Notifications List ({filtered.length})</div>
        <div className="table-responsive">
          {loading ? (
            <div className="np-state">Loading notifications...</div>
          ) : (
            <table className="np-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Notification Details</th>
                  <th>Target</th>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((n) => {
                  const style = STATUS_STYLES[n.status] || STATUS_STYLES.Draft
                  return (
                    <tr key={n.id}>
                      <td className="np-muted np-id">{n.id}</td>
                      <td>
                        <div className="np-notif-title">{n.title}</div>
                        <div className="np-notif-msg">{n.message}</div>
                      </td>
                      <td><span className="np-target">{n.targetAudience}</span></td>
                      <td className="np-muted">{n.createdDate}</td>
                      <td><span className="np-type-tag">{n.type}</span></td>
                      <td>
                        <span className="np-status-pill" style={{ background: style.bg, color: style.color }}>
                          {n.status}
                        </span>
                      </td>
                    </tr>
                  )
                })}
                {filtered.length === 0 && (
                  <tr><td colSpan="6" className="np-state">No notifications found.</td></tr>
                )}
              </tbody>
            </table>
          )}
        </div>
        {!loading && (
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            totalItems={filtered.length}
            onChange={setPage}
          />
        )}
      </div>

      <CModal
        alignment="center"
        visible={visible}
        onClose={() => setVisible(false)}
        size="lg"
        className="np-modal"
        data-coreui-theme="light"
      >
        <CModalHeader className="border-0 p-4">
          <CModalTitle className="fw-bold" style={{ color: THEME_COLOR }}>Create Announcement</CModalTitle>
        </CModalHeader>
        <CModalBody className="px-4 pb-4">
          <CForm>
            <CRow>
              <CCol md={12} className="mb-3">
                <CFormInput
                  label="Title"
                  value={newNotification.title}
                  onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })}
                />
              </CCol>
              <CCol md={12} className="mb-3">
                <CFormTextarea
                  label="Message Content"
                  rows={4}
                  value={newNotification.message}
                  onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })}
                />
              </CCol>
              <CCol md={6} className="mb-3">
                <CFormSelect
                  label="Target Audience"
                  value={newNotification.targetAudience}
                  onChange={(e) => setNewNotification({ ...newNotification, targetAudience: e.target.value })}
                >
                  <option value="All Users">All Users</option>
                  <option value="Sellers">Sellers Only</option>
                  <option value="Buyers">Buyers Only</option>
                </CFormSelect>
              </CCol>
              <CCol md={6} className="mb-3">
                <CFormSelect
                  label="Notification Type"
                  value={newNotification.type}
                  onChange={(e) => setNewNotification({ ...newNotification, type: e.target.value })}
                >
                  <option value="Announcement">Announcement</option>
                  <option value="Alert">Critical Alert</option>
                </CFormSelect>
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
        <CModalFooter className="border-0 p-4 pt-0">
          <CButton color="light" className="fw-bold px-4" style={{ color: '#64748b' }} onClick={() => setVisible(false)}>Discard</CButton>
          <CButton style={{ backgroundColor: THEME_COLOR, border: 'none' }} className="text-white fw-bold px-5" onClick={handleSendNotification}>Broadcast Now</CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default NotificationsPage