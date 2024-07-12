import React, { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';
import { Typography, Box } from '@mui/material';

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('/user')
      .then(response => setUser(response.data))
      .catch(error => console.error('Error fetching user info:', error));
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Profile</Typography>
      <Typography variant="h6">Username: {user.username}</Typography>
      <Typography variant="h6">Role: {user.role}</Typography>
    </Box>
  );
};

export default ProfilePage;
