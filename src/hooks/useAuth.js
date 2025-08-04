import { useSelector, useDispatch } from 'react-redux'
import { useCallback, useEffect } from 'react'
import { 
  loginUser, 
  logoutUser, 
  clearError, 
  clearMessage, 
  clearAuth,
  selectAuth 
} from '../store/authSlice'

export const useAuth = () => {
  const dispatch = useDispatch()
  const auth = useSelector(selectAuth)

  const login = useCallback(async (credentials) => {
    console.log('Logging in with credentials:', credentials)
    const result = await dispatch(loginUser(credentials))
    return result
  }, [dispatch])

  const logout = useCallback(async () => {
    const result = await dispatch(logoutUser())
    return result
  }, [dispatch])

  const quickLogout = useCallback(() => {
    dispatch(clearAuth())
  }, [dispatch])

  const clearAuthError = useCallback(() => {
    dispatch(clearError())
  }, [dispatch])

  const clearAuthMessage = useCallback(() => {
    dispatch(clearMessage())
  }, [dispatch])

  const checkTokenExpiration = useCallback(() => {
    const token = localStorage.getItem('authToken')
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        const currentTime = Date.now() / 1000
        
        if (payload.exp < currentTime) {
          dispatch(clearAuth())
          return false
        }
        return true
      } catch (error) {
        dispatch(clearAuth())
        return false
      }
    }
    return false
  }, [dispatch])

  return {
    ...auth,
    login,
    logout,
    quickLogout,
    clearAuthError,
    clearAuthMessage,
    checkTokenExpiration
  }
}

