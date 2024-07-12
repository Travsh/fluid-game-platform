import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api/config';

const MyGames = () => {
  const [ownedGames, setOwnedGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOwnedGames();
  }, []);

  const fetchOwnedGames = async () => {
    try {
      setLoading(true);
      const userResponse = await api.get('/v1/user');
      const ownedGameIds = userResponse.data.ownedGames;
      
      if (ownedGameIds && ownedGameIds.length > 0) {
        const gamesResponse = await api.get('/v1/games', {
          params: { ids: ownedGameIds.join(',') }
        });
        setOwnedGames(gamesResponse.data);
      } else {
        setOwnedGames([]);
      }
    } catch (error) {
      console.error('Error fetching owned games:', error);
      setError('Failed to fetch your games. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading your games...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="text-2xl font-bold mb-6">My Games</h1>
      {ownedGames.length === 0 ? (
        <p>You don't own any games yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {ownedGames.map((game) => (
            <motion.div
              key={game.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to={`/game/${game.id}`}>
                <img
                  src={game.resources[0] || '/api/placeholder/400/300'}
                  alt={game.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{game.name}</h2>
                  <p className="text-gray-600">{game.developer}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default MyGames;