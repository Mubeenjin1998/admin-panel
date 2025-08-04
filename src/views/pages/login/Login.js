// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
// import axios from 'axios'
// import {
//   CButton,
//   CCard,
//   CCardBody,
//   CCardGroup,
//   CCol,
//   CContainer,
//   CForm,
//   CFormInput,
//   CInputGroup,
//   CInputGroupText,
//   CRow,
//   CAlert,
//   CSpinner
// } from '@coreui/react'
// import CIcon from '@coreui/icons-react'
// import { cilLockLocked, cilUser } from '@coreui/icons'

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   })
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')
//   const [success, setSuccess] = useState('')

//   const handleLoginChange = (event) => {
//     const { name, value } = event.target
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }))
//     setError('')
//   }

//   const handleLogin = async (event) => {
//     event.preventDefault()
//     setLoading(true)
//     setError('')
//     setSuccess('')

//     if (!formData.email || !formData.password) {
//       setError('Please fill in all fields')
//       setLoading(false)
//       return
//     }

//     try {
//       const response = await axios.post('http://localhost:5000/api/admin/login', formData, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       })
//       console.log('Login response:', response.data.token)
     
//       if (response.data.success) {
//         console.log('Login  this is call ')
//         localStorage.setItem('token', response.data.token)
//         localStorage.setItem('user', JSON.stringify(response.data.user));
//         localStorage.setItem('isAuthenticated', true);
//         window.location.href = '/#/dashboard'
//       } else {
//         setError(response.data.message || 'Login failed')
//       }
//     } catch (error) {
//       console.error('Login error:', error)
//       if (error.response) {
//         setError(error.response.data?.message || 'Invalid credentials')
//       } else if (error.request) {
//         setError('Unable to connect to server. Please check your connection.')
//       } else {
//         setError('An error occurred. Please try again.')
//       }
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
//       <CContainer>
//         <CRow className="justify-content-center">
//           <CCol md={8}>
//             <CCardGroup>
//               <CCard className="p-4">
//                 <CCardBody>
//                   <CForm onSubmit={handleLogin}>
//                     <h1>Login</h1>
//                     <p className="text-body-secondary">Sign In to your account</p>
                    
//                     {error && <CAlert color="danger">{error}</CAlert>}
//                     {success && <CAlert color="success">{success}</CAlert>}
                    
//                     <CInputGroup className="mb-3">
//                       <CInputGroupText>
//                         <CIcon icon={cilUser} />
//                       </CInputGroupText>
//                       <CFormInput
//                         type="email"
//                         placeholder="Email"
//                         autoComplete="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleLoginChange}
//                         required
//                       />
//                     </CInputGroup>
                    
//                     <CInputGroup className="mb-4">
//                       <CInputGroupText>
//                         <CIcon icon={cilLockLocked} />
//                       </CInputGroupText>
//                       <CFormInput
//                         type="password"
//                         placeholder="Password"
//                         autoComplete="current-password"
//                         name="password"
//                         value={formData.password}
//                         onChange={handleLoginChange}
//                         required
//                       />
//                     </CInputGroup>
                    
//                     <CRow>
//                       <CCol xs={6}>
//                         <CButton 
//                           type="submit" 
//                           color="primary" 
//                           className="px-4"
//                           disabled={loading}
//                         >
//                           {loading ? <CSpinner size="sm" /> : 'Login'}
//                         </CButton>
//                       </CCol>
//                       <CCol xs={6} className="text-right">
//                         <CButton color="link" className="px-0">
//                           Forgot password?
//                         </CButton>
//                       </CCol>
//                     </CRow>
//                   </CForm>
//                 </CCardBody>
//               </CCard>
//               <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
//                 <CCardBody className="text-center">
//                   <div>
//                     <h2>Sign up</h2>
//                     <p>
//                       Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
//                       tempor incididunt ut labore et dolore magna aliqua.
//                     </p>
//                     <Link to="/register">
//                       <CButton color="primary" className="mt-3" active tabIndex={-1}>
//                         Register Now!
//                       </CButton>
//                     </Link>
//                   </div>
//                 </CCardBody>
//               </CCard>
//             </CCardGroup>
//           </CCol>
//         </CRow>
//       </CContainer>
//     </div>
//   )
// }

// export default Login

import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CAlert,
  CSpinner
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useAuth } from '../../../hooks/useAuth'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const {
    login,
    loading,
    error,
    message,
    isAuthenticated,
    clearAuthError,
    clearAuthMessage,
  } = useAuth()

  const navigate = useNavigate ? useNavigate() : null 
  console.log(isAuthenticated)


//   useEffect(() => {
//     console.log('isAuthenticated: ths i cis call ', isAuthenticated)
//     if (isAuthenticated) {
    
// window.location.href = '/#/dashboard'
      
//     }
//   }, [isAuthenticated])
useEffect(() => {
  console.log('isAuthenticated: ths i cis call ', isAuthenticated)
  if (isAuthenticated) {
    if (navigate) {
      navigate('/dashboard')
    } else {
      window.location.href = '/#/dashboard'
    }
  }
}, [isAuthenticated, navigate])

  useEffect(() => {
    if (error || message) {
      const timer = setTimeout(() => {
        clearAuthError()
        clearAuthMessage()
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [error, message, clearAuthError, clearAuthMessage])

  const handleLoginChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
    if (error) clearAuthError()
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    await login(formData)
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    
                    {error && <CAlert color="danger">{error}</CAlert>}
                    {message && <CAlert color="success">{message}</CAlert>}
                    
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type="email"
                        placeholder="Email"
                        autoComplete="email"
                        name="email"
                        value={formData.email}
                        onChange={handleLoginChange}
                        required
                        disabled={loading}
                      />
                    </CInputGroup>
                    
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        name="password"
                        value={formData.password}
                        onChange={handleLoginChange}
                        required
                        disabled={loading}
                      />
                    </CInputGroup>
                    
                    <CRow>
                      <CCol xs={6}>
                        <CButton 
                          type="submit" 
                          color="primary" 
                          className="px-4"
                          disabled={loading}
                        >
                          {loading ? <CSpinner size="sm" /> : 'Login'}
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login