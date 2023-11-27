import React, { useState/* useEffect */, useCallback } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Paper, FormControl, FormGroup, Box } from '@mui/material';
import { WiDaySunny, WiThermometer, WiThermometerExterior, WiHumidity, WiStrongWind } from 'react-icons/wi';

const apiKey = process.env.REACT_APP_apiKey; // Replace with your API key

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const handleCityChange = (event) => {
    setCity(event.target.value);
    setWeather(null);
  };

  const getWeatherData = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );

      // Extract relevant weather information from response.data
      const weatherData = {
        description: response.data.weather[0].description,
        temperature: response.data.main.temp,
        tempFeelsLike: response.data.main.feels_like,
        humidity: response.data.main.humidity,
        windSpeed: response.data.wind.speed,
      };

      setWeather(weatherData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }, [city]);

  const handleSubmit = (event) => {
    event.preventDefault();
    getWeatherData();
  };

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
        bgcolor: 'lavender',
        borderRadius: '8px',
        boxShadow: 3,
        marginTop: 3,
      }}
    >
      <FormControl component="form" onSubmit={handleSubmit} sx={{ marginBottom: 2, width: '100%' }}>
        <FormGroup sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, width: '100%' }}>
          <TextField
            label="Enter City"
            variant="outlined"
            value={city}
            onChange={handleCityChange}
            sx={{ marginBottom: 1, width: '100%' }}
          />
          <Button type="submit" variant="contained" color="primary">
            Get Weather
          </Button>
        </FormGroup>
      </FormControl>

      {weather && (
        <Paper sx={{ padding: 2, borderRadius: 2, boxShadow: 3, bgcolor: '#FFFFFF', marginTop: 2, width: '100%' }} elevation={3}>
          <Typography variant="h5" sx={{ marginBottom: 1 }}>
            {city}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 1 }}>
            <Typography variant="body1">
              <WiDaySunny /> Description: {weather.description}
            </Typography>
            <Typography variant="body1">
              <WiThermometer /> Temperature: {(weather.temperature - 273.15).toFixed(2)} °C
            </Typography>
            <Typography variant="body1">
              <WiThermometerExterior /> Feels Like: {(weather.tempFeelsLike - 273.15).toFixed(2)} °C
            </Typography>
            <Typography variant="body1">
              <WiHumidity /> Humidity: {weather.humidity}%
            </Typography>
            <Typography variant="body1">
              <WiStrongWind /> Wind Speed: {(weather.windSpeed * 3.6).toFixed(2)} km/h
            </Typography>
          </Box>
        </Paper>
      )}
    </Paper>
  );
};

export default Weather;
