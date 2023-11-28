import React, { useState, useEffect } from 'react';
import axiosInt from '../Axios/axiosIntercept';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Button,
  TextField,
  Box,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [blogCount, setBlogCount] = useState(0);
  const [taskCount, setTaskCount] = useState(0);
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [invalidPassword,setInvalidPassword] = useState('');

  const baseURL = process.env.REACT_APP_BASE_URL;

  const { logoutSuccess } = useAuth();
  const navigate = useNavigate();

  
  useEffect(() => {
    // Fetch user details and blog count on component mount
    fetchUserDetails();
    fetchBlogCount();
    fetchTaskCount();
    // eslint-disable-next-line
  }, []);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleOpenDeleteDialog = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const fetchUserDetails = async () => {
    try {
      const response = await axiosInt.get(`${baseURL}/userdetails`);
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user details:', error.message);
    }
  };

  const fetchBlogCount = async () => {
    try {
      const response = await axiosInt.get(`${baseURL}/blogcount`);
      setBlogCount(response.data.count);
    } catch (error) {
      console.error('Error fetching blog count:', error.message);
    }
  };

  const fetchTaskCount = async () => {
    try {
      const response = await axiosInt.get(`${baseURL}/pendingtasks`);
      setTaskCount(response.data.pendingTasks);
    } catch (error) {
      console.error('Error fetch tasks count: ', error.message);
    }
  };

  const handlePasswordChange = async (event) => {
    event.preventDefault();
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
  
    if (!passwordRegex.test(newPassword)) {
      setInvalidPassword('Invalid password. It should be at least 6 characters and include at least one letter and one digit.');
      return;
    }
  
    try {
      await axiosInt.post(`${baseURL}/updatepassword`, {
        username: user.username,
        newPassword: newPassword,
        oldPassword: oldPassword,
      });
      console.log('password changed');
      navigate('/login');
      logoutSuccess();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setPasswordError('Incorrect password');
      }
    }
  };
  

  const handleConfirmDeleteUser = async () => {
    try {
      await axiosInt.delete(`${baseURL}/deleteuser`);
      console.log('User deleted successfully');
      navigate('/login');
      logoutSuccess();
    } catch (error) {
      console.error('Error deleting user:', error.message);
    } finally {
      handleCloseDeleteDialog();
    }
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h2" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center',justifyContent:'center'}}>
        <AccountCircleIcon fontSize="large" sx={{ marginRight: 1, color: 'primary.main', fontSize: '3.5rem', verticalAlign: 'middle' }} />
        Profile
      </Typography>

      {user && (
        <Box>
          <Paper sx={{ p: 3, mb: 3 ,bgcolor:'aliceblue'}} elevation={3}>
            <Typography variant="body1" gutterBottom>
              <EmailIcon /> Email: {user.email}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <PostAddIcon /> Total Blogs Posted: {blogCount}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <AssignmentIcon /> Total Pending Tasks: {taskCount}
            </Typography>
          </Paper>
          
          <Paper sx={{ p: 3,bgcolor:'aliceblue' }} elevation={3}>
            <Typography variant="h5" component="h3" gutterBottom>
              Change Password
            </Typography>
            <Divider sx={{ my: 2 }} />
            <form onSubmit={handlePasswordChange}>
              <TextField
                label="Old Password"
                variant="outlined"
                type="password"
                value={oldPassword}
                onChange={(e) => {setOldPassword(e.target.value);setPasswordError('')}}
                sx={{ marginBottom: 2, width: '100%' }}
                required
                error={passwordError !== ''}
                helperText={passwordError}
              />
              <TextField
                label="New Password"
                variant="outlined"
                type="password"
                value={newPassword}
                onChange={(e) => {setNewPassword(e.target.value);setInvalidPassword('')}}
                sx={{ marginBottom: 2, width: '100%' }}
                required
                error={invalidPassword !== ''}
                helperText={invalidPassword}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<LockIcon />}
              >
                Update Password
              </Button>
            </form>
                  
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleOpenDeleteDialog}
                    startIcon={<AccountCircleIcon />}
                    sx={{ marginTop: 2 }}
                  >
                    Delete Account
                  </Button>

                  {/* Delete confirmation dialog */}
                  <Dialog
                    open={isDeleteDialogOpen}
                    onClose={handleCloseDeleteDialog}
                    fullWidth
                    maxWidth="sm"
                  >
                    <DialogTitle>Confirm Deletion</DialogTitle>
                    <DialogContent>
                      <Typography>
                        Are you sure you want to delete your account? This action cannot be undone.
                      </Typography>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseDeleteDialog} color="primary">
                        Cancel
                      </Button>
                      <Button onClick={handleConfirmDeleteUser} color="error" startIcon={<DeleteIcon />}>
                        Delete Account
                      </Button>
                    </DialogActions>
                  </Dialog>
                  
          </Paper>
        </Box>
      )}
    </Container>
  );
};

export default Profile;
