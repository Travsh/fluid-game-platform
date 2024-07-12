import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axiosConfig';
import { Typography, ImageList, ImageListItem, Box, Button } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const GameDetailPage = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    axios.get(`/games/${id}`)
      .then(response => setGame(response.data))
      .catch(error => console.error('Error fetching game details:', error));
  }, [id]);

  const handleAddToCart = () => {
    axios.post('/cart/add', null, { params: { gameId: game.id } })
      .then(() => {
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
      })
      .catch(error => console.error('Error adding game to cart:', error));
  };

  if (!game) return <div>Loading...</div>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">{game.name}</Typography>
      <Typography variant="body1" gutterBottom>{game.description}</Typography>
      <Typography variant="body2">Developer: {game.developer}</Typography>
      <Typography variant="body2">Category: {game.category}</Typography>
      <Typography variant="body2">Price: {game.currency} ${game.price}</Typography>
      <Box sx={{ mt: 3 }}>
        <ImageList cols={3} rowHeight={300}>
          {game.resources.map((resource, index) => (
            <ImageListItem key={index}>
              <img src={resource} alt={`Resource ${index + 1}`} loading="lazy" />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddToCart}
        sx={{ mt: 3 }}
        startIcon={addedToCart ? <CheckIcon /> : null}
        disabled={game.owned}
      >
        {addedToCart ? 'Added to Cart' : 'Add to Cart'}
      </Button>
    </Box>
  );
};

export default GameDetailPage;
