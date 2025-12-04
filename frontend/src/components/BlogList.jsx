import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs.items);

  return (
    <div>
      <Table striped className="bg-white rounded shadow">
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title} <strong>by</strong> {blog.author}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BlogList;
