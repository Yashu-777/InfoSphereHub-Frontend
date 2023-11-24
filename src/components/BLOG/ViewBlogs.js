// src/components/Blog.js
import React, { useState, useEffect } from 'react';
import axiosInt from '../../Axios/axiosIntercept';

const ViewBlogs = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '' });

  useEffect(() => {
    // Fetch all posts when the component mounts
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axiosInt.get('http://localhost:4000/allpost');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error.message);
    }
  };

  const handleInputChange = (e) => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      await axiosInt.post('http://localhost:4000/newpost', newPost);
      // Clear the form fields and fetch the updated posts
      setNewPost({ title: '', content: '' });
      fetchPosts();
      console.log("New post created");
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div>
      <h1>Simple Blog</h1>

      {/* Form to create a new post */}
      <form onSubmit={handleCreatePost}>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" value={newPost.title} onChange={handleInputChange} required /><br />

        <label htmlFor="content">Content:</label>
        <textarea id="content" name="content" value={newPost.content} onChange={handleInputChange} required></textarea><br />

        <button type="submit">Create Post</button>
      </form>

      {/* Display posts */}
      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <strong>{post.title}</strong><br />
            {post.content}<br />
            <em>Author: {post.author.username}</em>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewBlogs;
