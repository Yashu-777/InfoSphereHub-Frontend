import React, { useState, useEffect, useCallback } from 'react';
import axiosInt from '../../Axios/axiosIntercept';
import { Link as Typography, Button, Container, Box, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

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
      console.log('deleted SADGE');
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error.message);
    }
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Box>
        <Typography variant="h2" component="h2" gutterBottom>
          Posts
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={RouterLink}
          to="/newpost"
          sx={{ marginBottom: 2 }}
        >
          Create New Post
        </Button>

        {[...posts].reverse().map((post) => (
          <Paper key={post._id} sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
            <div>
              <Typography variant="h4" component="h4" gutterBottom sx={{bgcolor:'rgba(173, 216, 230, 0.8)', textDecoration:'none'}}>
                {post.title}
              </Typography>
              <Typography variant="body1" gutterBottom sx={{ textDecoration: 'none' }}>
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
              <Button
                variant="contained"
                color="error"
                sx={{ alignSelf: 'flex-start', my: 1 }}
                onClick={() => handleDeletePost(post._id)}
              >
                Delete
              </Button>
            )}
          </Paper>
        ))}

      </Box>
    </Container>
  );
};

export default ViewBlogs;
