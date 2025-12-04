import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const User = () => {
  const users = useSelector((state) => state.users);
  const { id } = useParams();

  const user = users.find((u) => u.id === id);

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <div>
      <h2>{user.name || user.username}</h2>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
