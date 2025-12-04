import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './notificationSlice';
import blogReducer from './blogSlice';
import userReducer from './userSlice';
import usersReducer from './usersSlice';

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    user: userReducer,
    users: usersReducer,
  },
});

export default store;
