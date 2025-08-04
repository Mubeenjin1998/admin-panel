import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const API_BASE_URL = 'http://localhost:5000/api/admin' 

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        return rejectWithValue(data.message || 'Login failed')
      }

      if (data.token) {
        localStorage.setItem('authToken', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
      }

      return {
        token: data.token,
        user: data.user,
        message: data.message
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Network error')
    }
  }
)

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
   
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
      
      return {}
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)



const getInitialState = () => {
  const token = localStorage.getItem('authToken')
  const user = localStorage.getItem('user')
  
  return {
    isAuthenticated: !!token,
    user: user ? JSON.parse(user) : null,
    token: token,
    loading: false,
    error: null,
    message: null
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearMessage: (state) => {
      state.message = null
    },
    clearAuth: (state) => {
      state.isAuthenticated = false
      state.user = null
      state.token = null
      state.error = null
      state.message = null
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
    },
    updateUserProfile: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
        localStorage.setItem('user', JSON.stringify(state.user))
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
        state.message = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log('Login successful:', action.payload)
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload.user
        state.token = action.payload.token
        state.message = action.payload.message
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.isAuthenticated = false
        state.user = null
        state.token = null
        state.error = action.payload
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false
        state.isAuthenticated = false
        state.user = null
        state.token = null
        state.error = null
        state.message = 'Logged out successfully'
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.isAuthenticated = false
        state.user = null
        state.token = null
        localStorage.removeItem('authToken')
        localStorage.removeItem('user')
      })
  },
})

export const { 
  clearError, 
  clearMessage, 
  clearAuth, 
  updateUserProfile 
} = authSlice.actions

export default authSlice.reducer

export const selectAuth = (state) => state.auth
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated
export const selectUser = (state) => state.auth.user
export const selectAuthLoading = (state) => state.auth.loading
export const selectAuthError = (state) => state.auth.error
export const selectAuthMessage = (state) => state.auth.message
