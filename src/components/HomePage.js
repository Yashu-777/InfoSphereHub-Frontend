import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, List, ListItem, Paper, ListItemIcon } from '@mui/material';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import CloudIcon from '@mui/icons-material/Cloud';

const HomePage = () => {
  return (
    <div>
      <Paper elevation={0} sx={{ padding: 3, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', bgcolor: '#E6E6FA' }}>
        <Typography variant="h5" gutterBottom>
          Welcome to Big Three
        </Typography>
        <List sx={{ paddingTop: 2 }}>
          <ListItem sx={{ borderBottom: 1, borderColor: 'divider', paddingBottom: 2, marginBottom: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link to="/blogposts" style={{ textDecoration: 'none', color: 'inherit', borderBottom: '2px solid #333' }}>
              <Typography variant="h6">Blogs</Typography>
            </Link>
            <ListItemIcon>
              <LibraryBooksIcon />
            </ListItemIcon>
          </ListItem>
          <ListItem sx={{ borderBottom: 1, borderColor: 'divider', paddingBottom: 2, marginBottom: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link to="/viewblogs" style={{ textDecoration: 'none', color: 'inherit', borderBottom: '2px solid #333' }}>
              <Typography variant="h6">View Posts</Typography>
            </Link>
            <ListItemIcon>
              <VisibilityIcon />
            </ListItemIcon>
          </ListItem>
          <ListItem sx={{ borderBottom: 1, borderColor: 'divider', paddingBottom: 2, marginBottom: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link to="/newpost" style={{ textDecoration: 'none', color: 'inherit', borderBottom: '2px solid #333' }}>
              <Typography variant="h6">Create New Post</Typography>
            </Link>
            <ListItemIcon>
              <PostAddIcon />
            </ListItemIcon>
          </ListItem>
          <ListItem sx={{ borderBottom: 1, borderColor: 'divider', paddingBottom: 2, marginBottom: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link to="/viewtasks" style={{ textDecoration: 'none', color: 'inherit', borderBottom: '2px solid #333' }}>
              <Typography variant="h6">View Tasks</Typography>
            </Link>
            <ListItemIcon>
              <ListAltIcon />
            </ListItemIcon>
          </ListItem>
          <ListItem sx={{ borderBottom: 1, borderColor: 'divider', paddingBottom: 2, marginBottom: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link to="/createtask" style={{ textDecoration: 'none', color: 'inherit', borderBottom: '2px solid #333' }}>
              <Typography variant="h6">Create New Task</Typography>
            </Link>
            <ListItemIcon>
              <PlaylistAddIcon />
            </ListItemIcon>
          </ListItem>
          <ListItem sx={{ borderBottom: 1, borderColor: 'divider', paddingBottom: 2, marginBottom: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link to="/weather" style={{ textDecoration: 'none', color: 'inherit', borderBottom: '2px solid #333' }}>
              <Typography variant="h6">Check Your Weather</Typography>
            </Link>
            <ListItemIcon>
              <CloudIcon />
            </ListItemIcon>
          </ListItem>
        </List>
      </Paper>
    </div>
  );
};

export default HomePage;
