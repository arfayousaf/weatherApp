import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from '../weatherSlice';
import '../index.css';
import '../App.css';
import clear_icon from '../assets/clear_sky.png';
import cloud_icon from '../assets/clouds.png';
import scattered_clouds from '../assets/scattered_clouds.png';
import broken_clouds from '../assets/broken_clouds.png';
import shower_rain from '../assets/shower_rain.png';
import rain from '../assets/rain.png';
import thunderstorm from '../assets/thunderstorm.png';
import snow from '../assets/snow.png';
import mist from '../assets/mist.png';

const WeatherApp = () => {
  const dispatch = useDispatch();
  const weatherData = useSelector((state) => state.weather.weatherData);
  const [city, setCity] = useState('lahore');

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": scattered_clouds,
    "03n": scattered_clouds,
    "04d": broken_clouds,
    "04n": broken_clouds,
    "09d": shower_rain,
    "09n": shower_rain,
    "10d": rain,
    "10n": rain,
    "11d": thunderstorm,
    "11n": thunderstorm,
    "13d": snow,
    "13n": snow,
    "50d": mist,
    "50n": mist,
  };

  useEffect(() => {
    dispatch(fetchWeather(city));
  }, [ dispatch]);

  const handleSearch = () => {
    dispatch(fetchWeather(city));
  };

  const icon = allIcons[weatherData.icon];

  return (
    <div className='pt-10'>
      <div className='ml-[450px] mr-[450px] mt-5 bg-blue-900 rounded-3xl'>
        <div className='flex'>
          <input
            placeholder='search city'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className='bg-white text-gray-600 font-bold rounded-full p-3 ml-[100px] m-5'
          />
          <button onClick={handleSearch}>
            <img className="bg-white rounded-full" src='/search.png' alt='img'/>
          </button>
        </div>

        <div>
          <img className='ml-[180px] mt-5' src={icon} /><br></br>
          <h1 className="ml-[180px] text-5xl text-white font-bold">
            {weatherData.temperature}°C
          </h1><br></br>
          <p className="ml-[180px] text-3xl text-white">
            {weatherData.location}
          </p>
        </div>

        <div className='flex justify-around mt-11 '>
          <div className='flex space-x-3'>
            <img className='bg-white rounded-2xl p-2 ml-[18px]' src='/h-icon.png' />
            <h1 className="text-white font-bold">Humidity {weatherData.humidity}%</h1>
          </div>

          <div className='flex space-x-3 '>
            <img className='bg-white rounded-2xl p-2 ml-[50px]' src='/w-icon.png' />
            <h1 className="text-white font-bold">Wind Speed {weatherData.windspeed} km/h</h1>
          </div>
        </div>

        <div className='flex justify-around mt-5 pb-[100px]'>
          <div className='flex space-x-3 '>
            <img className='bg-white rounded-2xl p-2' src='/pressure.png' />
            <h1 className="text-white font-bold">Pressure {weatherData.pressure}</h1>
          </div>

          <div className='flex space-x-3'>
            <img className='bg-white rounded-2xl p-2' src='/real_feel.png' />
            <h1 className="text-white font-bold">Real Feel {weatherData.realfeel}°C</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
