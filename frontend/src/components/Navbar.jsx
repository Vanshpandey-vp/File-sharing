import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('loggedInUser'));

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white tracking-wide">
          FileShareX
        </Link>

        <div className="space-x-6 flex items-center text-white font-medium">
          <Link to="/" className="hover:text-yellow-300 transition">Home</Link>
          {!user ? (
            <>
              <Link to="/about" className="hover:text-yellow-300 transition">About</Link>
              <Link to="/contact" className="hover:text-yellow-300 transition">Contact</Link>
              <Link to="/login" className="hover:text-yellow-300 transition">Login</Link>
              <Link to="/signup" className="hover:text-yellow-300 transition">Signup</Link>
            </>
          ) : (
            <>
              <Link to="/upload" className="hover:text-yellow-300 transition">Upload</Link>
              <Link to="/public" className="hover:text-yellow-300 transition">Public Files</Link>
              <Link to="/search-private" className="hover:text-yellow-300 transition">Search Private</Link>
              <Link to="/profile" className="hover:text-yellow-300 transition">Profile</Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
