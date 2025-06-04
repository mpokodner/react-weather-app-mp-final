import React, { useState, useEffect } from "react"; // Add useEffect here
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast"; // This import is now correct
import axios from "axios";
import "./Weather.css";

function WeatherData(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);

  function handleResponse(response) {
    setWeatherData({
      ready: true,
      coordinates: response.data.coord,
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      date: new Date(response.data.dt * 1000),
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      wind: response.data.wind.speed,
      city: response.data.name,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  function search() {
    const apiKey = "6782253072f7d90462731a624097fc54"; // Your API key
    const units = "metric";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios
      .get(apiUrl)
      .then(handleResponse)
      .catch((error) => {
        console.error("Error fetching current weather:", error);
        // You could add a user-friendly message here, e.g., "City not found"
        setWeatherData({ ready: false }); // Reset state if city not found
      });
  }

  // Use useEffect to call search on initial mount and when defaultCity changes
  useEffect(() => {
    search();
    // eslint-disable-next-line
  }, [city]); // Dependency on 'city' to re-fetch when city state changes

  if (weatherData.ready) {
    return (
      <div className="font-sans text-gray-800">
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex space-x-2">
            <input
              type="search"
              placeholder="Enter a city.."
              className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              autoFocus="on"
              onChange={handleCityChange}
            />
            <input
              type="submit"
              value="Search"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
            />
          </div>
        </form>
        <WeatherInfo data={weatherData} />
        <WeatherForecast coordinates={weatherData.coordinates} />
      </div>
    );
  } else {
    return (
      <div className="text-center text-gray-600 text-lg py-8">
        Loading weather data for {city}...
      </div>
    );
  }
}

export default WeatherData;
