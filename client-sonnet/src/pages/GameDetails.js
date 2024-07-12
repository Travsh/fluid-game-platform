import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import api from '../api/config';
import { formatPrice } from '../utils/utils';
import MediaGallery from '../components/MediaGallery';

const GameDetails = ({ addToCart }) => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGameDetails();
  }, [id]);

  const fetchGameDetails = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/v1/games/${id}`);
      setGame(response.data);
    } catch (error) {
      console.error('Error fetching game details:', error);
      setError('Failed to fetch game details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      await addToCart(id);
      // Show success animation
      setTimeout(() => setIsAddingToCart(false), 1500);
    } catch (error) {
      console.error('Error adding game to cart:', error);
      setIsAddingToCart(false);
    }
  };

  if (loading) {
    return <div>Loading game details...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!game) return <div>Game not found.</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {game.resources && game.resources.length > 0 && (
          <MediaGallery resources={game.resources} />
        )}
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{game.name}</h1>
          <p className="text-gray-600 mb-4">{game.description}</p>
          <div className="flex justify-between items-center mb-4">
            <p className="text-xl font-semibold">{formatPrice(game.price, game.currency)}</p>
            <p className="text-gray-600">Developer: {game.developer}</p>
          </div>
          <p className="text-gray-600 mb-4">Category: {game.category}</p>
          <motion.button
            onClick={handleAddToCart}
            className={`w-full py-2 px-4 rounded ${
              game.owned
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white font-semibold`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={game.owned || isAddingToCart}
          >
            {game.owned ? 'Owned' : isAddingToCart ? <Check /> : 'Add to Cart'}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;