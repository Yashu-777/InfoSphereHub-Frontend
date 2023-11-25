import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, List, ListItem, Paper } from '@mui/material';

const HomePage = () => {
  return (
    
    <Paper elevation={3} sx={{ padding: 3, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '90vh' }}>
        <Typography variant="h5" gutterBottom>
          Welcome to Big Three
        </Typography>
        <List>
          <ListItem sx={{ borderBottom: 1, borderColor: 'divider', paddingBottom: 2 }}>
            <Link to="/blogposts" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography variant="h6">Blogs</Typography>
            </Link>
          </ListItem>
          <ListItem sx={{ borderBottom: 1, borderColor: 'divider', paddingBottom: 2 }}>
            <Link to="/viewblogs" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography variant="h6">View Blogs</Typography>
            </Link>
          </ListItem>
          <ListItem>
            <Link to="/newpost" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography variant="h6">Create New Post</Typography>
            </Link>
          </ListItem>
        </List>
      </Paper>
  );
};

export default HomePage;
