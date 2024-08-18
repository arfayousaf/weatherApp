import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchWeather = createAsyncThunk('weather/fetchWeather', async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  
  return {
    humidity: data.main.humidity,
    windspeed: data.wind.speed,
    temperature: Math.floor(data.main.temp),
    location: data.name,
    realfeel: data.main.feels_like,
    pressure: data.main.pressure,
    icon: data.weather[0].icon,
  };
});

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    weatherData: {},
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.weatherData = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default weatherSlice.reducer;
