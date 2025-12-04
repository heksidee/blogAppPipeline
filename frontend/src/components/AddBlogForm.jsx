import { useState } from 'react';

const AddBlogForm = ({ onCreate }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onCreate({ title, author, url });
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
      <h2>Create new blog</h2>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          title
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            name="Title"
            placeholder="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </label>
      </div>
      <div className="mb-3">
        <label htmlFor="author" className="form-label">
          author
          <input
            type="text"
            className="form-control"
            id="author"
            value={author}
            name="Author"
            placeholder="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </label>
      </div>
      <div className="mb-3">
        <label htmlFor="url" className="form-label">
          url
          <input
            type="text"
            className="form-control"
            id="url"
            value={url}
            name="Url"
            placeholder="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </label>
      </div>
      <button type="submit">Add blog</button>
    </form>
  );
};
export default AddBlogForm;
