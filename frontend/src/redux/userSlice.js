import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

export const loginUser = createAsyncThunk('user/login', async (credentials) => {
  const response = await loginService.login(credentials)
  const user = {
    username: response.username,
    name: response.name,
    token: response.token,
    id: response.id,
  }
  window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
  blogService.setToken(user.token)
  return user
})

export const restoreUser = createAsyncThunk('user/restore', async () => {
  const stored = window.localStorage.getItem('loggedBlogappUser')
  if (!stored) return null
  const user = JSON.parse(stored)
  blogService.setToken(user.token)
  return user
})

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    logout() {
      window.localStorage.removeItem('loggedBlogappUser')
      return null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (_, action) => action.payload)
      .addCase(restoreUser.fulfilled, (_, action) => action.payload)
  },
})

export const { logout } = userSlice.actions
export default userSlice.reducer
