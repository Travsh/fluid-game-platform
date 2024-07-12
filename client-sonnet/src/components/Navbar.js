import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, GamepadIcon, User, LogIn, LogOut } from 'lucide-react';

const Navbar = ({ isLoggedIn, user, onLogout }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Store' },
    { path: '/my-games', icon: GamepadIcon, label: 'My Games' },
    { path: '/profile', icon: User, label: 'My Profile' },
  ];

  return (
    <nav className="bg-gray-800 text-white w-64 h-screen p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Fluid Game Store</h1>
      </div>
      <ul>
        {navItems.map((item) => (
          <li key={item.path} className="mb-4">
            <Link to={item.path} className="flex items-center p-2 rounded hover:bg-gray-700">
              <item.icon className="mr-2" size={20} />
              <span>{item.label}</span>
              {location.pathname === item.path && (
                <motion.div
                  className="absolute left-0 bg-blue-500 w-1 h-8"
                  layoutId="navbar-indicator"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-auto">
        {isLoggedIn ? (
          <div>
            <p className="mb-2">{user.username}</p>
            <button onClick={onLogout} className="flex items-center p-2 rounded hover:bg-gray-700">
              <LogOut className="mr-2" size={20} />
              <span>Logout</span>
            </button>
          </div>
        ) : (
          <Link to="/login" className="flex items-center p-2 rounded hover:bg-gray-700">
            <LogIn className="mr-2" size={20} />
            <span>Login / Register</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;