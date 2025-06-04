import React, { useState, useEffect } from "react";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";
import axios from "axios";

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
    searchWeather();
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  function searchWeather() {
    const apiKey = "6782253072f7d90462731a624097fc54";
    const units = "metric";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

    setWeatherData({ ready: false }); // Show loading state

    axios
      .get(apiUrl)
      .then(handleResponse)
      .catch((error) => {
        console.error("Error fetching current weather:", error);
        alert("City not found. Please try again.");
        setWeatherData({ ready: false });
      });
  }

  // Only search on initial mount with default city
  useEffect(() => {
    searchWeather();
    // eslint-disable-next-line
  }, []); // Empty dependency array - only run once on mount

  if (weatherData.ready) {
    return (
      <div className="font-sans text-gray-800">
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="row g-2">
            <div className="col-9">
              <input
                type="search"
                placeholder="Enter a city.."
                className="form-control form-control-lg"
                autoFocus="on"
                onChange={handleCityChange}
                value={city}
              />
            </div>
            <div className="col-3">
              <input
                type="submit"
                value="Search"
                className="btn btn-primary btn-lg w-100"
              />
            </div>
          </div>
        </form>
        <WeatherInfo data={weatherData} />
        <WeatherForecast
          coordinates={weatherData.coordinates}
          key={weatherData.city}
        />
      </div>
    );
  } else {
    return (
      <div className="text-center text-gray-600 text-lg py-8">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading weather data for {city}...</p>
      </div>
    );
  }
}

export default WeatherData;
