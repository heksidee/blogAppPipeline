import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogList from './BlogList'
import { expect, vi, test } from 'vitest'
import blogs from '../services/blogs'
import { renderWithProviders } from '../testutils'

test('renders title and author but not url or likes', () => {
  const blog = {
    id: 'abc123',
    title: 'Globe',
    author: 'Trekker',
    url: 'www.world.com',
    likes: 5,
    user: {
      username: 'ZeR',
      id: '123',
    },
  }

  renderWithProviders(<BlogList blog={blog} user={blog.user} />, {
    preloadedState: { blogs: { items: [blog] } },
  })

  expect(screen.getByText(/Globe.*Trekker/)).toBeInTheDocument()

  expect(screen.queryByText('www.world.com')).not.toBeInTheDocument()
  expect(screen.queryByText(/likes/i)).not.toBeInTheDocument()
})

test('renders url, likes and user when Blog clicked', async () => {
  const blog = {
    title: 'Globe',
    author: 'Trekker',
    url: 'www.world.com',
    likes: 5,
    user: {
      username: 'ZeR',
      id: '123',
    },
  }

  renderWithProviders(<Blog blog={blog} user={blog.user} />, {
    preloadedState: { blogs: { items: [blog] } },
  })

  const user = userEvent.setup()
  const button = screen.getByText('Globe')
  await user.click(button)

  expect(screen.getByText('www.world.com')).toBeInTheDocument()
  expect(screen.getByText(/likes/i)).toBeInTheDocument()
  expect(screen.getByText(/Added by:/)).toBeInTheDocument()
  expect(screen.getByText('ZeR')).toBeInTheDocument()
})

test('when likes button clicked twice, `Likes` values increases by two', async () => {
  const blog = {
    title: 'Globe',
    author: 'Trekker',
    url: 'www.world.com',
    likes: 11,
    user: {
      username: 'ZeR',
      id: '123',
    },
  }

  vi.spyOn(blogs, 'updateLikes').mockImplementation(async (id, newLikes) => {
    return { likes: newLikes }
  })

  renderWithProviders(<Blog blog={blog} user={blog.user} />, {
    preloadedState: { blogs: { items: [blog] } },
  })

  const user = userEvent.setup()
  await user.click(screen.getByText('Globe'))

  const likeButton = screen.getByRole('button', { name: /11/ })
  await user.click(likeButton)
  await user.click(likeButton)

  expect(screen.getByRole('button', { name: /13/ })).toBeInTheDocument()
})
