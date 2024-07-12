import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axiosConfig';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await axios.post('/user/register', {
        username,
        password,
      });
      navigate('/login');
    } catch (error) {
      setError('Error registering user');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box mt={8} display="flex" flexDirection="column" alignItems="center">
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '1em' }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button type="submit" fullWidth variant="contained" color="primary" style={{ marginTop: '1em' }}>
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default RegisterPage;
