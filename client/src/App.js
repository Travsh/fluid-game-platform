import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from './theme'; // Import the custom theme
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import GameDetailPage from './pages/GameDetailPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MyGamesPage from './pages/MyGamesPage';
import axios from './api/axiosConfig';
import Cart from './components/Cart';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      axios.get('/user')
        .then(response => {
          setIsLoggedIn(true);
          setUsername(response.data.username);
        })
        .catch(error => console.error('Error verifying token:', error));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    setUsername('');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
          <Header isLoggedIn={isLoggedIn} username={username} logout={handleLogout} />
          <Box sx={{ display: 'flex', flexGrow: 1 }}>
            <Sidebar />
            <Box sx={{ flexGrow: 1, p: 3 }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/games/:id" element={<GameDetailPage />} />
                <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/profile" element={isLoggedIn ? <ProfilePage /> : <Navigate to="/login" />} />
                <Route path="/my-games" element={isLoggedIn ? <MyGamesPage /> : <Navigate to="/login" />} />
                <Route path="/cart" element={isLoggedIn ? <Cart /> : <Navigate to="/login" />} />
              </Routes>
            </Box>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
