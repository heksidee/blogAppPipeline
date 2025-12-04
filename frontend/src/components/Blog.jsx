import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateLikes, deleteBlog, addComment, setCommentDraft } from '../redux/blogSlice';

const Blog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const blog = useSelector((state) => state.blogs.items.find((b) => b.id === id));
  const user = useSelector((state) => state.user);
  const commentDraft = useSelector((state) => state.blogs.commentDraft);

  if (!blog) return <p>Blog not found</p>;
  const isOwner = blog.user?.id === user?.id;

  const handleLikes = () => {
    dispatch(updateLikes(blog));
  };

  const handleDelete = () => {
    const confirm = window.confirm(`Sure you want to delete blog ${blog.title} by ${blog.author}?`);
    if (confirm) {
      dispatch(deleteBlog(blog.id));
      navigate('/blogs');
    }
  };

  const handleComment = (e) => {
    e.preventDefault();
    dispatch(addComment({ blogId: blog.id, comment: commentDraft }));
  };

  return (
    <>
      <div className="card mb-4 bg-light shadow rounded">
        <div className="card-body">
          <h2 className="card-title">
            {blog.title} <small className="text-muted">by {blog.author}</small>
          </h2>
          <p className="card-text">
            <a href={blog.url} target="_blank" rel="noopener noreferrer">
              {blog.url}
            </a>
          </p>
          <p className="card-text">
            <strong>Likes:</strong>
            <button onClick={handleLikes} className="ms-2">
              {blog.likes}
            </button>
          </p>
          <p className="card-text">
            <strong>Added by: </strong>
            {blog.user?.username || 'unknown'}{' '}
          </p>
          {isOwner && <button onClick={handleDelete}>Delete</button>}
        </div>
      </div>
      <div>
        <h3>Comments</h3>
        <form onSubmit={handleComment}>
          <div>
            <label htmlFor="comment" className="form-label">
              <input
                className="form-control bg-light"
                id="comment"
                type="text"
                value={commentDraft}
                onChange={(e) => dispatch(setCommentDraft(e.target.value))}
                placeholder="Write comment"
              />
            </label>
            <button type="submit" className="ms-2">
              Add
            </button>
          </div>
        </form>
        {blog.comments && blog.comments.length > 0 ? (
          <ul>
            {blog.comments.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        ) : (
          <p>No comments yet</p>
        )}
      </div>
    </>
  );
};

export default Blog;
