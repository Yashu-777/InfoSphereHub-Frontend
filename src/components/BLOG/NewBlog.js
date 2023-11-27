import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { TextField, Button, Link, Typography, Container, Box, Paper } from '@mui/material';
import axiosInt from '../../Axios/axiosIntercept';
import CreateIcon from '@mui/icons-material/Create';

const NewBlog = () => {
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      await axiosInt.post(`${baseUrl}/newpost`, newPost);
      // Clear the form fields and fetch the updated posts
      setNewPost({ title: '', content: '' });
      console.log("New post created");
      navigate('/viewblogs')
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper sx={{ mt: 3,bgcolor:'aliceblue',p:2 }} elevation={2}>
      <Typography
        component="div"
        variant="h3"
        sx={{
          textAlign: 'center',
          marginBottom: 3,
          marginTop: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CreateIcon sx={{ fontSize: '3rem', marginRight: '0.5rem' }} />
        New Post
      </Typography>

        <form onSubmit={handleCreatePost}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            value={newPost.title}
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            multiline
            rows={6}
            id="content"
            label="Content"
            name="content"
            value={newPost.content}
            onChange={handleInputChange}
          />
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{my:2}}>
            UPLOAD POST
          </Button>
        </form>
        <Box mt={2}>
          <Link href="/#/viewblogs" variant="body2">
            View all Blogs
          </Link>
        </Box>
      </Paper>
    </Container>
  );
};

export default NewBlog;
