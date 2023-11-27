import React, { useState, useEffect, useCallback } from 'react';
import axiosInt from '../../Axios/axiosIntercept';
import {
  Container,
  Typography,
  Button,
  Paper,
  Grid,
  IconButton,
  Box
} from '@mui/material';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddTaskIcon from '@mui/icons-material/AddTask';
import CampaignIcon from '@mui/icons-material/Campaign';
import { useNavigate } from 'react-router-dom';

const ViewTasks = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const fetchTasks =useCallback(async () => {
    try {
      const response = await axiosInt.get(`${baseUrl}/alltask`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
    }
  },[baseUrl]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);


  const handleDeleteTask = async (taskId) => {
    try {
      await axiosInt.delete(`${baseUrl}/deletetask/${taskId}`);
      // Fetch updated tasks after deleting a task
      fetchTasks();
      console.log('Task deleted successfully');
    } catch (error) {
      console.error('Error deleting task:', error.message);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await axiosInt.put(`${baseUrl}/updatetask/${taskId}`, {
        status: newStatus,
      });
      // Fetch updated tasks after updating a task
      fetchTasks();
      console.log('Task status updated successfully');
    } catch (error) {
      console.error('Error updating task status:', error.message);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'rgba(255, 0, 0, 0.72)'; // Red with 20% opacity
      case 'Medium':
        return 'rgba(251, 190, 0, 0.5)'; // Light Orange with 20% opacity
      case 'Low':
        return 'rgba(0, 158, 0, 0.3)'; // Light Green with 20% opacity
      default:
        return 'transparent';
    }
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h2" component="h2" gutterBottom sx={{ textAlign: 'center', marginBottom: 2 }}>
        Tasks
        <CampaignIcon sx={{ fontSize: '1.5em', marginLeft: '0.5em' }} />
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/createtask')}
        startIcon={<AddTaskIcon />}
        sx={{ marginBottom: 2 }}
      >
        Create New Task
      </Button>
      {[...tasks].reverse().map((task) => (
        <Paper
          key={task._id}
          sx={{
            p: 2,
            mb: 2,
            backgroundColor: getPriorityColor(task.priority),
            filter: task.status ? 'grayscale(70%) blur(0.65px)' : 'none',
          }}
          elevation={task.status ? 0 : 4}
        >
           {task.status && (
            // Display checkmark for completed tasks
            <CheckCircleIcon
              sx={{
                position: 'absolute',
                top: '48%',
                left: '45%',
                transform: 'translate(-50%, -50%)',
                fontSize:{xs:130,md: 100},
                color: 'rgb(0,185,0)',
                zIndex: 1, // Ensure the checkmark appears above other content
              }}
            />
          )}

          <Grid container spacing={2}>
            {/* Left Half */}
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h4" gutterBottom>
                {task.title}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {task.details}
              </Typography>
              <br />
              {task.goalTime && (
                <Typography variant="subtitle2" gutterBottom>
                  Goal Time: {new Date(task.goalTime).toLocaleString()}
                </Typography>
              )}
              <Typography variant="subtitle2" gutterBottom>
                Status: {task.status ? 'Completed' : 'Pending'}
              </Typography>
            </Grid>

            {/* Right Half */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" gutterBottom>
                Created At: {new Date(task.timestamp).toLocaleString()}
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                Priority: {task.priority}
              </Typography>

              <FormControlLabel
                control={
                  <Switch
                    checked={task.status}
                    onChange={() =>
                      handleStatusChange(task._id, !task.status)
                    }
                  />
                }
                label="Completed?"
              />
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteTask(task._id)}
                  sx={{
                    color: task.status ? 'white' : 'black',
                    backgroundColor: task.status ? 'red' : 'white',
                    '&:hover': {
                      backgroundColor: 'rgb(195,0,0)',
                    },
                    boxShadow: task.status ? '0px 0px 10px 5px rgba(255,0,0,0.5)' : 'none',
                  }}
                >
                  <DeleteIcon />
                </IconButton>
                <Typography
                  variant="body2"
                  sx={{
                    marginLeft: 3,
                    fontWeight: 'bold',
                    color: task.status ? 'rgba(50,0,0,1)' : 'inherit',
                    textDecoration: task.status ? 'underline wavy' : 'none',
                  }}
                >
                  Delete?
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Container>
  );
};

export default ViewTasks;
