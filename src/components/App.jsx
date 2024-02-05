import React, { useState } from 'react';
import Search from './search/search';
import Weather from './weather/weather';
import './App.scss';

const API_KEY = 'f6f1838a8a1c41789a544643240502';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const getWeather = async (city) => {
    try {
      const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error('City not found');
      }

      const data = await response.json();
      setWeatherData(data);
      setError(null);

    } catch (error) {
      setError(error.message);
      setWeatherData(null);
    }
  };
  
  const handleSearchChange = (city) => {
    getWeather(city);
  };

  return (
    <div className="card">
      <Search onSearchChange={handleSearchChange} />
      {weatherData && (
        <Weather
          location={weatherData.location.name}
          time={weatherData.location.localtime}
          weatherIcon={weatherData.current.condition.icon}
          temp={weatherData.current.temp_c}
          humidity={weatherData.current.humidity}
          wind={weatherData.current.wind_kph}
          feelsLike={weatherData.current.feelslike_c}
          uv={weatherData.current.uv}
        />
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default App;
