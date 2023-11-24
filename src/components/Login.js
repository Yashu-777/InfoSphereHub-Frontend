import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const {loginSuccess} = useAuth();

  const login = async () => {
    try {
      const response = await axios.post('http://localhost:4000/login', {
        username,
        password,
      });

      if (response.status === 200) {
        localStorage.clear();
        const data = response.data;
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);

        // Save tokens to localStorage
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        loginSuccess(data);
        console.log('Login successful');
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const navigate = useNavigate();
  
  const handleSignup = () =>{
    navigate('/signup');
  }



  return (
    <div>
        <h2>Login</h2>
        <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={login}>Login</button>
        <button onClick={handleSignup}>Signup</button>
        <h2>Tokens</h2>
        <div>
          <strong>Access Token:</strong> {accessToken}
        </div>
        <div>
          <strong>Refresh Token:</strong> {refreshToken}
        </div>
    </div>
  )
}

export default Login;