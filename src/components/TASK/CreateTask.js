import React, { useState } from 'react';
import {
  Button,
  Container,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Paper,
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';

import { useNavigate } from 'react-router-dom';
import axiosInt from '../../Axios/axiosIntercept';

const CreateTask = () => {
  const navigate = useNavigate();
  
  const baseUrl = process.env.REACT_APP_BASE_URL;
  
  const [task, setTask] = useState({
    title: '',
    details: '',
    goalTime: '',
    priority: 'Medium',
  });

  const handleInputChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await axiosInt.post(`${baseUrl}/newtask`, task);
      setTask({
        title: '',
        details: '',
        goalTime: '',
        priority: 'Medium',
      });
      console.log('New task created');
      navigate('/viewtasks');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper maxWidth="md" sx={{ marginTop: 4, bgcolor:'aliceblue',p:3 }} elevation={3} >
        <Typography variant="h3" component='h3' gutterBottom>
          <EventIcon sx={{ fontSize: '3rem', verticalAlign: 'middle', marginRight: '0.5rem' }} />
            New Task
        </Typography>
        <form onSubmit={handleCreateTask}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={task.title}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Details"
                name="details"
                value={task.details}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="datetime-local"
                label="Goal Time"
                name="goalTime"
                value={task.goalTime}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  label="Priority"
                  name="priority"
                  value={task.priority}
                  onChange={handleInputChange}
                  required
                >
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                Create Task
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateTask;
