import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from '../services/users'

export const fetchUsers = createAsyncThunk('users/fetchAll', async () => {
  return await userService.usersAll()
})

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (_, action) => action.payload)
  },
})

export default usersSlice.reducer
