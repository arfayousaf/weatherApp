import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from '../src/weatherSlice';

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
});
