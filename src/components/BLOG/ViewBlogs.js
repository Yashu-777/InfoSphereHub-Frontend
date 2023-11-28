import React, { useState, useEffect, useCallback } from 'react';
import axiosInt from '../../Axios/axiosIntercept';
import { Link as Typography, Button, Container, Box, Paper, } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

const ViewBlogs = () => {
  const [posts, setPosts] = useState([]);
  const currentUser = localStorage.getItem('username');
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const fetchPosts = useCallback(async () => {
    try {
      const response = await axiosInt.get(`${baseUrl}/allpost`);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error.message);
    }
  }, [baseUrl]); // Include baseUrl as a dependency

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleDeletePost = async (postId) => {
    try {
      await axiosInt.delete(`${baseUrl}/deletepost/${postId}`);
      console.log('post deleted successfully');
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error.message);
    }
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Box>
        <Typography variant="h2" component='h2' gutterBottom sx={{ textAlign: 'center',color:'#000',textDecorationColor:'#000' }}>
          <LibraryBooksIcon sx={{ fontSize: '1em', marginRight: '0.5em' }} />
          Posts
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={RouterLink}
          to="/newpost"
          startIcon={<CreateIcon />}
          sx={{ my: 2 }}
        >
          Create New Post
        </Button>

        {[...posts].reverse().map((post) => (
          <Paper key={post._id} sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between', flexDirection: 'column', bgcolor: 'rgba(255, 250, 240, 0.8)', borderRadius: 8 }}>
            <div>
              <Typography variant="h4" component="h4" gutterBottom sx={{ bgcolor: 'rgba(135, 206, 250, 0.8)', textDecoration: 'none', borderRadius: 4, p: 1 }}>
                {post.title}
              </Typography>
              <Typography variant="body1" gutterBottom sx={{ textDecoration: 'none', mt: 1 }}>
                {post.content}
              </Typography>
            </div>
            <br />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
              <Typography variant="subtitle2" gutterBottom>
                Author: {post.author.username}
              </Typography>
              <Typography variant="caption" gutterBottom>
                {new Date(post.timestamp).toLocaleString()}
              </Typography>
            </Box>
            {post.author.username === currentUser && (
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDeletePost(post._id)}
                  sx={{ textTransform: 'none', borderRadius: 4 }}
                  startIcon={<DeleteIcon  />}
                >
                  Delete
                </Button>
              </Box>
            )}
          </Paper>
        ))}

      </Box>
    </Container>
  );
};

export default ViewBlogs;