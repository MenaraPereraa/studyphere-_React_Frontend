import React, { Suspense, useEffect } from 'react'
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CSpinner, useColorModes } from '@coreui/react'

// Firebase config eka path eka check karaganna
import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'

import './scss/style.scss'
import './scss/examples.scss'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)

  // Me state eka thiyenne session eka thiyenawada balanna witharai
  const [user, setUser] = React.useState(null)
  const [authChecked, setAuthChecked] = React.useState(false)

  useEffect(() => {
    // Theme setup
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) setColorMode(theme)
    if (!isColorModeSet()) setColorMode(storedTheme)

    // Firebase listener
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setAuthChecked(true)
    })

    return () => unsubscribe()
  }, [isColorModeSet, setColorMode, storedTheme])

  // Loading spinner
  if (!authChecked) {
    return (
      <div className="pt-3 text-center">
        <CSpinner color="primary" variant="grow" />
      </div>
    )
  }

  return (
    <HashRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route exact path="/login" name="Login Page" element={<Login />} />

          <Route exact path="/register" name="Register Page" element={<Register />} />


          <Route
            path="/dashboard"
            element={user ? <DefaultLayout /> : <Navigate to="/login" replace />}
          />

          <Route
            path="*"
            element={user ? <DefaultLayout /> : <Navigate to="/login" replace />}
          />

          <Route exact path="/404" name="Page 404" element={<Page404 />} />
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

export default App