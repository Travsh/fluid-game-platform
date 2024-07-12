import React, { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const MyGamesPage = () => {
  const [ownedGames, setOwnedGames] = useState([]);
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios.get('/user')
      .then(response => {
        setOwnedGames(response.data.ownedGames);
      })
      .catch(error => console.error('Error fetching user info:', error));
  }, []);

  useEffect(() => {
    if (ownedGames.length > 0) {
      const params = new URLSearchParams();
      ownedGames.forEach(id => params.append('ids', id));

      axios.get(`/games?${params.toString()}`)
        .then(response => {
          setGames(response.data);
        })
        .catch(error => console.error('Error fetching games:', error));
    } else {
      setGames([]);
    }
  }, [ownedGames]);

  if (ownedGames.length === 0) {
    return (
      <Typography variant="h6">
        You don't own any games yet.
      </Typography>
    );
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        My Games
      </Typography>
      <List>
        {games.map(game => (
          <ListItem button component={Link} to={`/games/${game.id}`} key={game.id}>
            <ListItemAvatar>
              <Avatar src={game.resources[0]} variant="square" />
            </ListItemAvatar>
            <ListItemText primary={game.name} secondary={`Price: ${game.currency} $${game.price}`} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default MyGamesPage;
