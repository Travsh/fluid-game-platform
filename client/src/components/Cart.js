import React, { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';
import { List, ListItem, ListItemText, IconButton, Typography, Box, Button, ListItemAvatar, Avatar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [games, setGames] = useState([]);
  const [total, setTotal] = useState(0);
  const [checkedOut, setCheckedOut] = useState(false);

  useEffect(() => {
    // Fetch cart items
    axios.get('/cart')
      .then(response => {
        setCart(response.data);
      })
      .catch(error => console.error('Error fetching cart:', error));
  }, []);

  useEffect(() => {
    // Fetch game details for cart items
    if (cart.length > 0) {
      const params = new URLSearchParams();
      cart.forEach(id => params.append('ids', id));

      axios.get(`/games?${params.toString()}`)
        .then(response => {
          setGames(response.data);
          calculateTotal(response.data);
        })
        .catch(error => console.error('Error fetching games:', error));
    } else {
      setGames([]);
      setTotal(0);
    }
  }, [cart]);

  const handleDelete = (gameId) => {
    axios.delete(`/cart/delete/${gameId}`)
      .then(response => setCart(response.data))
      .catch(error => console.error('Error deleting cart item:', error));
  };

  const calculateTotal = (games) => {
    const totalValue = games.reduce((acc, game) => acc + game.price, 0);
    setTotal(totalValue);
  };

  const handleCheckout = () => {
    axios.post('/cart/checkout')
      .then(() => {
        setCheckedOut(true);
        setTimeout(() => setCheckedOut(false), 2000);
        setCart([]);
      })
      .catch(error => console.error('Error during checkout:', error));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        My Cart
      </Typography>
      {games.length === 0 ? (
        <Typography variant="body1">Your cart is empty.</Typography>
      ) : (
        <>
          <List>
            {games.map(game => (
              <ListItem key={game.id}>
                <ListItemAvatar>
                  <Avatar src={game.resources[0]} variant="square" />
                </ListItemAvatar>
                <ListItemText primary={`${game.name} - ${game.currency} $${game.price}`} />
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(game.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Total: {games[0]?.currency} ${total.toFixed(2)}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCheckout}
            sx={{ mt: 2 }}
            startIcon={checkedOut ? <CheckIcon /> : null}
          >
            {checkedOut ? 'Checked Out' : 'Checkout'}
          </Button>
        </>
      )}
    </Box>
  );
};

export default Cart;
