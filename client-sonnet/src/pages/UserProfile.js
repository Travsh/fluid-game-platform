import React from 'react';
import { motion } from 'framer-motion';
import { User, Award } from 'lucide-react';

const UserProfile = ({ user }) => {
  if (!user) {
    return <div>Loading user profile...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-md mx-auto mt-8"
    >
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-6 text-center">User Profile</h2>
        <div className="flex items-center justify-center mb-6">
          <User size={64} className="text-blue-500" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
          <p className="text-gray-700">{user.username}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Role</label>
          <p className="text-gray-700 flex items-center">
            {user.role}
            {user.role === 'ADMIN' && <Award size={16} className="ml-2 text-yellow-500" />}
          </p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Owned Games</label>
          <p className="text-gray-700">{user.ownedGames.length}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default UserProfile;