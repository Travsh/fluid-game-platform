import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import api from './api/config';

import Navbar from './components/Navbar';
import Store from './pages/Store';
import MyGames from './pages/MyGames';
import UserProfile from './pages/UserProfile';
import GameDetails from './pages/GameDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './components/Cart';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      fetchUserInfo();
    }
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await api.get('/v1/user');
      setUser(response.data);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error fetching user info:', error);
      setIsLoggedIn(false);
      localStorage.removeItem('jwt');
    }
  };

  const handleLogin = (token) => {
    localStorage.setItem('jwt', token);
    fetchUserInfo();
    navigate('/');
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    setUser(null);
    setCart([]);
    navigate('/');
  };

  const addToCart = async (gameId) => {
    try {
      await api.post(`/v1/cart/add?gameId=${gameId}`);
      fetchCart();
    } catch (error) {
      console.error('Error adding game to cart:', error);
    }
  };

  const fetchCart = async () => {
    try {
      const response = await api.get('/v1/cart');
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Navbar isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-4">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Store />} />
              <Route path="/game/:id" element={<GameDetails addToCart={addToCart} />} />
              <Route
                path="/my-games"
                element={isLoggedIn ? <MyGames user={user} /> : <Navigate to="/login" />}
              />
              <Route
                path="/profile"
                element={isLoggedIn ? <UserProfile user={user} /> : <Navigate to="/login" />}
              />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </AnimatePresence>
        </div>
      </div>
      {isLoggedIn && (
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => setShowCart(!showCart)}
            className="bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-200"
          >
            <ShoppingCart size={24} />
          </button>
          {showCart && <Cart cart={cart} onClose={() => setShowCart(false)} />}
        </div>
      )}
    </div>
  );
};

export default App;