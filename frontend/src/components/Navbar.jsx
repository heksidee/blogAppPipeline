import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/userSlice'

const Navbar = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const padding = {
    color: '#4B0082',
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/', { replace: true })
  }

  return (
    <div className="mt-2 d-flex justify-content-between align-items-center">
      {user && (
        <>
          <div>
            <Link style={padding} className="me-4" to="/blogs">
              Blogs
            </Link>
            <Link style={padding} to="/users">
              Users
            </Link>
          </div>
          <div>
            <span>{user.username} logged in</span>
            <button onClick={handleLogout} className="ms-2">
              Logout
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Navbar
