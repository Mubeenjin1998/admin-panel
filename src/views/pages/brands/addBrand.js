import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
  CAlert,
  CSpinner,
} from '@coreui/react'
import { cilUser, cilEnvelopeClosed, cilLockLocked, cilPeople } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import axios from 'axios'
import { useAuth } from '../../../hooks/useAuth'
import CommonModal from '../../../components/CommonModal'

const AddUser = ({visible,onClose,fetchUsers,data}) => {
  console.log('AddUser component rendered with data:', data)
  const { token } = useAuth() // Custom hook to get the token

  const [formData, setFormData] = useState({
    username: data.username || ''  ,
    email:  data.email || '',
    password: data.password || '',
    role: data.role || 'user',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    const storedToken = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken')
    if (storedToken) {
      setToken(storedToken)
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  const validateForm = () => {
    if (!formData.username.trim()) {
      setError('Username is required')
      return false
    }
    if (!formData.email.trim()) {
      setError('Email is required')
      return false
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address')
      return false
    }
    if (!formData.password) {
      setError('Password is required')
      return false
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return false
    }
   
    return true
  }

 const handleSubmit = async (e) => {
  e.preventDefault()

  if (!validateForm()) {
    return
  }

  setLoading(true)
  setError('')
  setSuccess('')

  try {
    if (data && data._id) {
      const response = await axios.put(
        `http://localhost:5000/api/admin/users/${data._id}`,
        {
          username: formData.username,
          email: formData.email,
          role: formData.role,
        },
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      )
      setSuccess(`User "${formData.username}" updated successfully!`)
      await fetchUsers()
      onClose()
    } else {
      const response = await axios.post(
        'http://localhost:5000/api/admin/users',
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        },
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      )
      setSuccess(`User "${formData.username}" created successfully!`)
      await fetchUsers()
      onClose()
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'user',
      })
    }
  } catch (err) {
    if (err.response?.data?.message) {
      setError(err.response.data.message)
    } else {
      setError(data && data._id ? 'Failed to update user' : 'Failed to create user')
    }
  } finally {
    setLoading(false)
  }
}

  return (
  <CommonModal
  visible={visible}
  title={data && data._id ? "Edit User" : "Add New User"}
  onClose={onClose}
>
  <CForm onSubmit={handleSubmit}>
    <CRow className="justify-content-center">
      <CCol md={12}>
        {error && (
          <CAlert color="danger" dismissible onClose={() => setError('')}>
            {error}
          </CAlert>
        )}
        {success && (
          <CAlert color="success" dismissible onClose={() => setSuccess('')}>
            {success}
          </CAlert>
        )}

        <CInputGroup className="mb-3">
          <CInputGroupText>
            <CIcon icon={cilUser} />
          </CInputGroupText>
          <CFormInput
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            autoFocus
          />
        </CInputGroup>

        <CInputGroup className="mb-3">
          <CInputGroupText>
            <CIcon icon={cilEnvelopeClosed} />
          </CInputGroupText>
          <CFormInput
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </CInputGroup>

        {/* Only show password field when adding a new user */}
        {!data._id && (
          <CInputGroup className="mb-3">
            <CInputGroupText>
              <CIcon icon={cilLockLocked} />
            </CInputGroupText>
            <CFormInput
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </CInputGroup>
        )}

        <CInputGroup className="mb-4">
          <CInputGroupText>
            <CIcon icon={cilPeople} />
          </CInputGroupText>
          <CFormSelect
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </CFormSelect>
        </CInputGroup>

        <div className="d-grid gap-2">
          <CButton
            type="submit"
            color="primary"
            disabled={loading}
            size="lg"
          >
            {loading ? (
              <>
                <CSpinner size="sm" className="me-2" />
                {data && data._id ? "Saving..." : "Creating User..."}
              </>
            ) : (
              data && data._id ? "Save Changes" : "Add User"
            )}
          </CButton>
        </div>
      </CCol>
    </CRow>
  </CForm>
</CommonModal>
  )
}

export default AddUser
