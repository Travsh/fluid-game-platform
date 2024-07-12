import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import api from '../api/config';
import { formatPrice } from '../utils/utils';

const Cart = ({ onClose }) => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await api.get('/v1/cart');
      const cartGameIds = response.data;

      if (cartGameIds.length > 0) {
        const gamesResponse = await api.get('/v1/games', {
          params: { ids: cartGameIds.join(',') }
        });
        setCartItems(gamesResponse.data);
        calculateTotal(gamesResponse.data);
      } else {
        setCartItems([]);
        setTotal(0);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      setError('Failed to fetch your cart. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = (items) => {
    const sum = items.reduce((acc, item) => acc + item.price, 0);
    setTotal(sum);
  };

  const removeFromCart = async (gameId) => {
    try {
      await api.delete(`/v1/cart/delete/${gameId}`);
      fetchCart();
    } catch (error) {
      console.error('Error removing game from cart:', error);
      setError('Failed to remove game from cart. Please try again.');
    }
  };

  const checkout = async () => {
    try {
      await api.post('/v1/cart/checkout');
      setCartItems([]);
      setTotal(0);
      alert('Checkout successful!');
    } catch (error) {
      console.error('Error during checkout:', error);
      setError('Checkout failed. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading your cart...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="absolute top-12 right-0 w-64 bg-white rounded-lg shadow-lg p-4"
    >
      <button onClick={onClose} className="absolute top-2 right-2">
        <X size={20} />
      </button>
      <h2 className="text-lg font-semibold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul className="space-y-2 mb-4">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between items-center">
                <span>{item.name}</span>
                <span>{formatPrice(item.price, item.currency)}</span>
                <button onClick={() => removeFromCart(item.id)} className="text-red-500">
                  <X size={16} />
                </button>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">Total:</span>
            <span>{formatPrice(total, cartItems[0]?.currency)}</span>
          </div>
          <button
            onClick={checkout}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors duration-200"
          >
            Checkout
          </button>
        </>
      )}
    </motion.div>
  );
};

export default Cart;