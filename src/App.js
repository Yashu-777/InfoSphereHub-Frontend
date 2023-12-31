import { HashRouter as Router, Routes, Route} from 'react-router-dom';
import axios from 'axios';
import { useState,useEffect,useCallback } from 'react';
import { useAuth } from './Context/AuthContext';
import Container from '@mui/material/Container';

import NavBar from "./components/Navbar";
import HomePage from './components/HomePage';
import Signup from './components/Signup';
import Login from './components/Login';
import ViewBlogs from './components/BLOG/ViewBlogs';
import NewBlog from './components/BLOG/NewBlog';
import CreateTask from './components/TASK/CreateTask';
import ViewTasks from './components/TASK/ViewTasks';
import Weather from './components/WEATHER/Weather';
import Profile from './components/Profile';
import Footer from './components/Footer';

function App() {

  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const {isAuthenticated,setIsAuthenticated,logoutSuccess} = useAuth();
  
  const baseURL = process.env.REACT_APP_BASE_URL;

  const refreshTokenFn = useCallback(async (sendRefresh) => {
    try {
      const response = await axios.post(`${baseURL}/token`, {
        token: sendRefresh,
      });

      if (response.status === 200) {
        const data = response.data;
        setAccessToken(data.accessToken);
        console.log('Token refreshed successfully');

        // Save the new access token to localStorage
        localStorage.setItem('accessToken', data.accessToken);
      } else {
        console.error('Token refresh failed');
        logoutSuccess();
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      logoutSuccess();
    }
  },[logoutSuccess,baseURL]);


  useEffect(() => {
    // Retrieve tokens and last refresh timestamp from localStorage during component initialization
    const storedAccessToken = localStorage.getItem('accessToken');
    const storedRefreshToken = localStorage.getItem('refreshToken');
    let lastTokenRefreshTimestamp = parseInt(localStorage.getItem('lastTokenRefresh')) || 0;
    const nowTimestamp = Date.now();
  
    if (storedAccessToken /* && nowTimestamp <= lastTokenRefreshTimestamp + 9000 */) {
      setAccessToken(storedAccessToken);
      setIsAuthenticated(true);
    }
  
    if (storedRefreshToken) {
      setRefreshToken(storedRefreshToken);
    }
    //console.log(isAuthenticated);

    
    // Set up a timer to refresh the token based on the time elapsed since the last refresh
   /*  if ( storedAccessToken && nowTimestamp > lastTokenRefreshTimestamp + 9000) {
      refreshTokenFn();
      console.log('hello world :',refreshToken);
      localStorage.setItem('lastTokenRefresh', nowTimestamp);
    }
 */

    let tokenRefreshTimer;

    if (isAuthenticated) {
      if(nowTimestamp > lastTokenRefreshTimestamp+400000){
        refreshTokenFn(localStorage.getItem('refreshToken'));
        localStorage.setItem('lastTokenRefresh', nowTimestamp);
      }
      const timeToNextRefresh = Math.max(0, lastTokenRefreshTimestamp + 400000 - nowTimestamp);
      tokenRefreshTimer = setTimeout(() => {
        refreshTokenFn(localStorage.getItem('refreshToken'));
        lastTokenRefreshTimestamp = Date.now(); // Update the last refresh timestamp
        localStorage.setItem('lastTokenRefresh', lastTokenRefreshTimestamp);
      }, timeToNextRefresh);
    }
  
    // Clear the timer on component unmount or if the user logs out
    return () => {
      clearInterval(tokenRefreshTimer);
    };
  
  }, [isAuthenticated, refreshToken,setIsAuthenticated,accessToken,refreshTokenFn]);
  
  
  
  
  return (
      <Router>
        
        <Container
          maxWidth="md"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            my: { xs: 0, md: 0 },
            px: { xs: 0, md: 0 },
            bgcolor: '#E6E6FA',
          }}
        >
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/viewblogs" element={<ViewBlogs />} />
            <Route path="/newpost" element={<NewBlog />} />
            <Route path="/createtask" element={<CreateTask />} />
            <Route path="/viewtasks" element={<ViewTasks />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <Footer/>
        </Container>
      </Router>
    );
}

export default App
