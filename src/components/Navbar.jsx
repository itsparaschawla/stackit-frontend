import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export default function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md px-4 py-3 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">
        StackIt
      </Link>
      <div className="space-x-4 text-sm sm:text-base">
        <Link to="/" className="hover:text-blue-500">Home</Link>
        <Link to="/ask" className="hover:text-blue-500">Ask</Link>

        {token ? (
          <>
            <Link to={`/profile/${user.username}`} className="hover:text-blue-500">Profile</Link> {/* 👈 New Profile link */}
            <button onClick={handleLogout} className="hover:text-red-500">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-blue-500">Login</Link>
            <Link to="/register" className="hover:text-blue-500">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
