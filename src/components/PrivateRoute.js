import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const PrivateRoute = ({ children, requiredRole = null }) => {
  const { isAuthenticated } = useAuth()
  
  // const user = JSON.parse(localStorage.getItem('user'));
 
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // if (requiredRole && user.role !== requiredRole) {
  //   return <Navigate to="/unauthorized" replace />
  // }

  return children
}

export default PrivateRoute
