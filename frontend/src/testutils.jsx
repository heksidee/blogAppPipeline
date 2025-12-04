import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './redux/blogSlice'
import notificationReducer from './redux/notificationSlice'
import userReducer from './redux/userSlice'
import usersReducer from './redux/usersSlice'

// Helper-funktio joka luo store ja käärii komponentin Provider + Router sisään
export function renderWithProviders(ui, { preloadedState = {}, store } = {}) {
  const testStore =
    store ||
    configureStore({
      reducer: {
        blogs: blogReducer,
        notification: notificationReducer,
        user: userReducer,
        users: usersReducer,
      },
      preloadedState,
    })

  return render(
    <Provider store={testStore}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>
  )
}
