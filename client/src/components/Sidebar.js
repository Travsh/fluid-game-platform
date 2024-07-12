import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, Drawer, ListItemIcon } from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';
import GamepadIcon from '@mui/icons-material/Gamepad';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
      }}
    >
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <StoreIcon />
          </ListItemIcon>
          <ListItemText primary="Store" />
        </ListItem>
        <ListItem button component={Link} to="/my-games">
          <ListItemIcon>
            <GamepadIcon />
          </ListItemIcon>
          <ListItemText primary="My Games" />
        </ListItem>
        <ListItem button component={Link} to="/profile">
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="My Profile" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
