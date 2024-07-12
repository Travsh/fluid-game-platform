import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axiosConfig';
import { Typography, Box, Button, Card, CardContent, CardMedia, Grid } from '@mui/material';

const GameList = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios.get('/games')
      .then(response => setGames(response.data))
      .catch(error => console.error('Error fetching games:', error));
  }, []);

  return (
    <Box sx={{ flexGrow: 1, mt: 3 }}>
      <Typography variant="h4" gutterBottom>
        Game Store
      </Typography>
      <Grid container spacing={3}>
        {games.map(game => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={game.id}>
            <Card sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                image={game.resources[0]}
                alt={game.name}
              />
              <CardContent>
                <Typography component="h5" variant="h5">
                  {game.name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Price: {game.currency} ${game.price}
                </Typography>
                {game.owned && <Typography variant="subtitle2" color="primary">Owned</Typography>}
                <Button component={Link} to={`/games/${game.id}`} variant="contained" color="secondary" sx={{ mt: 2 }}>
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default GameList;
