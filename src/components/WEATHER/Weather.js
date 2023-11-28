import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Paper, FormControl, FormGroup, Box, Container } from '@mui/material';
import { WiDaySunny, WiThermometer, WiThermometerExterior, WiHumidity, WiStrongWind } from 'react-icons/wi';
import { BiSearch } from 'react-icons/bi';

const apiKey = process.env.REACT_APP_apiKey;

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
    <Container>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 3,
          bgcolor: 'aliceblue',
          borderRadius: '8px',
          boxShadow: 3,
          marginTop: 3,
        }}
      >
        <FormControl component="form" onSubmit={handleSubmit} sx={{ marginBottom: 2, width: '65%' }}>
          <FormGroup sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <WiDaySunny style={{ fontSize: '40px', marginRight: '10px', color: 'orange' }} />
              <TextField
                label="Enter City"
                variant="outlined"
                value={city}
                onChange={handleCityChange}
                sx={{ width: '100%' }}
                name='cityname'
              />
              <BiSearch style={{ fontSize: '35px', marginLeft: '10px', color: 'gray', cursor: 'pointer' }} onClick={handleSubmit} />
            </Box>
            <Button type="submit" variant="contained" color="primary">
              Get Weather
            </Button>
          </FormGroup>
        </FormControl>

        {weather && (
          <Paper sx={{ padding: 2, borderRadius: 2, boxShadow: 3, bgcolor: 'aliceblue', marginTop: 2, width: '100%' }} elevation={3}>
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
    </Container>
  );
};

export default Weather;
