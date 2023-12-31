import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Grid, Link, Box, Paper } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const { loginSuccess } = useAuth();
  const navigate = useNavigate();

  const login = async () => {
    try {
      const response = await axios.post(`${baseUrl}/login`, {
        username,
        password,
      });

      if (response.status === 200) {
        localStorage.clear();
        const data = response.data;

        // Save tokens to localStorage
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        loginSuccess(data);
        setLoginError('');
        //console.log('Login successful');
        navigate('/');
      } else {
        console.error('Login failed');
        
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('Login failed. Please check your credentials.');
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Paper
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor:'aliceblue',
            p:3
          }}
          elevation={3}
        >
        <Box sx={{ mt: 3, mb: 2 }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
        </Box>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                onChange={(e) => {setUsername(e.target.value);setLoginError('')}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => {setPassword(e.target.value);setLoginError('')}}
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 2 }}>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              onClick={login}
            >
              Login
            </Button>
          </Box>
          {loginError && (
          <Typography variant="body2" color="error" sx={{ mt: 2, textAlign: 'center' }}>
            {loginError}
          </Typography>
        )}
          <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
            <Grid item>
              <Link href="/#/signup" variant="body2">
                Don't have an account? Sign up
              </Link>
            </Grid>
          </Grid>
        </form>
        <Box mt={5}>
          <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="/">
              SphereHub
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;
