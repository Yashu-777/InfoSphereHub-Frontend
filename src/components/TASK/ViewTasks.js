import React, { useState, useEffect } from 'react';
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
import { useNavigate } from 'react-router-dom';

const ViewTasks = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axiosInt.get('http://localhost:4000/alltask');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axiosInt.delete(`http://localhost:4000/deletetask/${taskId}`);
      // Fetch updated tasks after deleting a task
      fetchTasks();
      console.log('Task deleted successfully');
    } catch (error) {
      console.error('Error deleting task:', error.message);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await axiosInt.put(`http://localhost:4000/updatetask/${taskId}`, {
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
      <Typography variant="h2" component="h2" gutterBottom>
        Tasks
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/createtask')}
        sx={{ marginBottom: 2 }}
      >
        Create New Task
      </Button>
      {tasks.map((task) => (
        <Paper
          key={task._id}
          sx={{
            p: 2,
            mb: 2,
            backgroundColor: getPriorityColor(task.priority),
            filter: task.status ? 'grayscale(60%) blur(0.6px)' : 'none',
          }}
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
                color: 'rgb(0,110,0)',
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
