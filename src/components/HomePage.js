import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, List, ListItem, Paper, ListItemIcon,Card, CardMedia } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import CloudIcon from '@mui/icons-material/Cloud';
import SpherehubImage from '../Spherehub2.png';

const listItemStyle = {
  borderBottom: '1px solid #333',
  borderColor: 'divider',
  paddingBottom: 2,
  marginBottom: 2,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const linkStyle = {
  textDecoration: 'none',
  color: 'inherit',
  borderBottom: '2px solid #333',
};

const HomePage = () => {
  // Check if the user is logged in
  const isUserLoggedIn = localStorage.getItem('isAuth') === 'true';

  return (
    <div>
      <Paper
        elevation={0}
        sx={{
          padding: 3,
          textAlign: 'center',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          bgcolor: '#E6E6FA',
          marginTop:'50px'
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            background: 'linear-gradient(45deg, #2196F3 30%, #4CAF50 70%, #FFC107 100%)',
            color: 'white',
            padding: '10px',
            borderRadius: '8px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
            textAlign: 'center',
            fontSize: '24px',
          }}
        >
          Welcome to SphereHub
        </Typography>

        {isUserLoggedIn ? (
          <List sx={{ paddingTop: 2 }}>
            <ListItem sx={{ ...listItemStyle }}>
              <Link to="/viewblogs" style={linkStyle}>
                <Typography variant="h6">View Posts</Typography>
              </Link>
              <ListItemIcon>
                <VisibilityIcon />
              </ListItemIcon>
            </ListItem>
            <ListItem sx={{ ...listItemStyle }}>
              <Link to="/newpost" style={linkStyle}>
                <Typography variant="h6">Create New Post</Typography>
              </Link>
              <ListItemIcon>
                <PostAddIcon />
              </ListItemIcon>
            </ListItem>
            <ListItem sx={{ ...listItemStyle }}>
              <Link to="/viewtasks" style={linkStyle}>
                <Typography variant="h6">View Tasks</Typography>
              </Link>
              <ListItemIcon>
                <ListAltIcon />
              </ListItemIcon>
            </ListItem>
            <ListItem sx={{ ...listItemStyle }}>
              <Link to="/createtask" style={linkStyle}>
                <Typography variant="h6">Create New Task</Typography>
              </Link>
              <ListItemIcon>
                <PlaylistAddIcon />
              </ListItemIcon>
            </ListItem>
            <ListItem sx={{ ...listItemStyle }}>
              <Link to="/weather" style={linkStyle}>
                <Typography variant="h6">Check Your Weather</Typography>
              </Link>
              <ListItemIcon>
                <CloudIcon />
              </ListItemIcon>
            </ListItem>
          </List>
        ) : (
          <>
            <Typography variant="body1" sx={{ my: 2 }}>
              Please <Link to="/login">login</Link> to access the content.
            </Typography>
            <Card elevation={0} sx={{ maxWidth: '800px',height:'auto', margin: 'auto',mt:'20px' }}>
              <CardMedia
                component="img"
                height="100%"
                image={SpherehubImage}
                alt="SphereHub"
              />
            </Card>
          </>
        )}
      </Paper>
    </div>
  );
};

export default HomePage;
