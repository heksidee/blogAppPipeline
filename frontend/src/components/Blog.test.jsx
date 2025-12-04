import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';
import { expect } from 'vitest';
import blogs from '../services/blogs';

test('renders title and author but not url or likes', () => {
  const blog = {
    title: 'Space Travel',
    author: 'Michael Pollock',
    url: 'www.cosmictravel.com',
    likes: 5,
    user: {
      username: 'Albo',
      id: '123',
    },
  };

  render(<Blog blog={blog} user={{ username: 'Albo', id: '123' }} />);

  expect(
    screen.getByText(
      (content) => content.includes('Space Travel') && content.includes('Michael Pollock')
    )
  ).toBeInTheDocument();

  expect(screen.queryByText('www.cosmictravel.com')).not.toBeInTheDocument();
  expect(screen.queryByText(/likes/i)).not.toBeInTheDocument();
});

test('renders url, likes and user when View clicked', async () => {
  const blog = {
    title: 'Space Travel',
    author: 'Michael Pollock',
    url: 'www.cosmictravel.com',
    likes: 5,
    user: {
      username: 'Albo',
      id: '123',
    },
  };

  const currentUser = {
    username: 'Albo',
    id: '123',
    token: 'fake-token',
  };

  render(<Blog blog={blog} user={currentUser} />);

  const user = userEvent.setup();
  const button = screen.getByText('View');
  await user.click(button);

  expect(screen.getByText('www.cosmictravel.com')).toBeInTheDocument();
  expect(screen.getByText(/likes/i)).toBeInTheDocument();
  expect(screen.getByText('Added by: Albo')).toBeInTheDocument();
});

test('when likes button clicked twice, `Likes` values increases by two', async () => {
  const blog = {
    title: 'Space Travel',
    author: 'Michael Pollock',
    url: 'www.cosmictravel.com',
    likes: 5,
    user: {
      username: 'Albo',
      id: '123',
    },
  };

  vi.spyOn(blogs, 'updateLikes').mockImplementation(async (id, newLikes) => {
    return { likes: newLikes };
  });

  render(<Blog blog={blog} user={blog.user} />);

  const user = userEvent.setup();
  await user.click(screen.getByText('View'));

  const likeButton = screen.getByText('Like');
  await user.click(likeButton);
  await user.click(likeButton);

  expect(screen.getByText('Likes: 7')).toBeInTheDocument();
});
