import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  CssBaseline,
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  Paper,
  Container,
  Grid,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  typography: {
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      marginBottom: '1rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

function App() {
  const [aircraftLogs, setAircraftLogs] = useState([]);
  const [newAircraft, setNewAircraft] = useState({ registration: '', type: '', location: '' });

  useEffect(() => {
    fetch('/api/aircraft')
      .then(res => res.json())
      .then(data => setAircraftLogs(data));
  }, []);

  const handleNewAircraftChange = (e) => {
    setNewAircraft({ ...newAircraft, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/aircraft', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAircraft),
    });
    setNewAircraft({ registration: '', type: '', location: '' });
    fetch('/api/aircraft')
      .then(res => res.json())
      .then(data => setAircraftLogs(data));
  };

  const handleEdit = async (id, updatedAircraft) => {
    await fetch(`/api/aircraft/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedAircraft),
    });
    fetch('/api/aircraft')
      .then(res => res.json())
      .then(data => setAircraftLogs(data));
  };

  const handleDelete = async (id) => {
    await fetch(`/api/aircraft/${id}`, {
      method: 'DELETE',
    });
    fetch('/api/aircraft')
      .then(res => res.json())
      .then(data => setAircraftLogs(data));
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Box sx={{ py: 4 }}>
          <Typography variant="h1" component="h1" gutterBottom align="center">
            Aircraft SpotterZZZ
          </Typography>
          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="registration"
                    label="Registration"
                    value={newAircraft.registration}
                    onChange={handleNewAircraftChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="type"
                    label="Type"
                    value={newAircraft.type}
                    onChange={handleNewAircraftChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name="location"
                    label="Location"
                    value={newAircraft.location}
                    onChange={handleNewAircraftChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    sx={{ mt: 1 }}
                  >
                    Add Aircraft
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
          <Paper elevation={3} sx={{ p: 2 }}>
            <List>
              {aircraftLogs.map(log => (
                <ListItem
                  key={log.id}
                  sx={{
                    mb: 1,
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
                  secondaryAction={
                    <Box>
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={() =>
                          handleEdit(log.id, {
                            ...log,
                            registration: prompt('New Registration?'),
                            type: prompt('New Type?'),
                            location: prompt('New Location?'),
                          })
                        }
                        sx={{ mr: 1 }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDelete(log.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  }
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body1">
                        <strong>Registration:</strong> {log.registration}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body1">
                        <strong>Type:</strong> {log.type}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body1">
                        <strong>Location:</strong> {log.location}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;