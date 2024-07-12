import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axiosConfig';
import { Typography, ImageList, ImageListItem } from '@mui/material';

const GameDetail = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    axios.get(`/games/${id}`)
      .then(response => setGame(response.data))
      .catch(error => console.error('Error fetching game details:', error));
  }, [id]);

  if (!game) return <div>Loading...</div>;

  return (
    <div>
      <Typography variant="h4">{game.name}</Typography>
      <Typography variant="body1">{game.description}</Typography>
      <ImageList cols={3}>
        {game.resources.map((resource, index) => (
          <ImageListItem key={index}>
            <img src={resource} alt={`Resource ${index + 1}`} />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
};

export default GameDetail;
