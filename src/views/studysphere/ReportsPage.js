
import React from 'react'
import { CCol, CRow, CCard, CCardBody, CCardHeader } from '@coreui/react'

const ReportsPage = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard>
          <CCardHeader>Reports & Analytics</CCardHeader>
          <CCardBody>
            <p>Platform analytics and insights will be shown here.</p>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ReportsPage

