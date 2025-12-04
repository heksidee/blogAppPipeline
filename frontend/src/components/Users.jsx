import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) => state.blogs.items)

  const blogCounts = blogs.reduce((acc, blog) => {
    const userId = blog.user?.id
    if (userId) {
      acc[userId] = (acc[userId] || 0) + 1
    }
    return acc
  }, {})

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs Added</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`} style={{ color: '#4B0082' }}>
                  {user.name || user.username}
                </Link>
              </td>
              <td className="ps-4">{blogCounts[user.id] || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
