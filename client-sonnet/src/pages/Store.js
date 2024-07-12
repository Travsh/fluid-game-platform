import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api/config';
import { formatPrice } from '../utils/utils';

const Store = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      setLoading(true);
      const response = await api.get('/v1/games', {
        params: { ids: [] } // Fetch all games
      });
      setGames(response.data);
    } catch (error) {
      console.error('Error fetching games:', error);
      setError('Failed to fetch games. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading games...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {games.map((game) => (
        <motion.div
          key={game.id}
          className="bg-white rounded-lg shadow-md overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to={`/game/${game.id}`}>
            <div className="relative">
              <img
                src={game.resources[0] || '/api/placeholder/400/300'}
                alt={game.name}
                className="w-full h-48 object-cover"
              />
              {game.owned && (
                <div className="absolute top-0 right-0 bg-green-500 text-white px-2 py-1 text-sm">
                  Owned
                </div>
              )}
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{game.name}</h2>
              <p className="text-gray-600">{formatPrice(game.price, game.currency)}</p>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default Store;