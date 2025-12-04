import { render, screen } from '@testing-library/react';
import AddBlogForm from './AddBlogForm';
import userEvent from '@testing-library/user-event';
import { expect } from 'vitest';

test('calls onCreate with correct data when form is submitted', async () => {
  const mockCreate = vi.fn();
  render(<AddBlogForm onCreate={mockCreate} />);

  const user = userEvent.setup();

  await user.type(screen.getByPlaceholderText('Title'), 'Antsa heitot');
  await user.type(screen.getByPlaceholderText('Author'), 'McBeth');
  await user.type(screen.getByPlaceholderText('Url'), 'www.antsa.com');

  await user.click(screen.getByText('Add blog'));

  expect(mockCreate).toHaveBeenCalledTimes(1);
  expect(mockCreate).toHaveBeenCalledWith({
    title: 'Antsa heitot',
    author: 'McBeth',
    url: 'www.antsa.com',
  });
});
