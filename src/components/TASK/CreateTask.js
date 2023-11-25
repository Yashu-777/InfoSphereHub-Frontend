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
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axiosInt from '../../Axios/axiosIntercept';

const CreateTask = () => {
  const navigate = useNavigate();
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
      await axiosInt.post('http://localhost:4000/newtask', task);
      // Clear the form fields after creating a new task
      setTask({
        title: '',
        details: '',
        goalTime: '',
        priority: 'Medium',
      });
      console.log('New task created');
      // Navigate to the view tasks page after creating a new task
      navigate('/viewtasks');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h2" component="h2" gutterBottom>
        Create New Task
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
    </Container>
  );
};

export default CreateTask;
