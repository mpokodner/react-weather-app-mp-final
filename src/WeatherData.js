import React, { useState } from "react";
import axios from "axios";

// component to display weather info
function WeatherDisplay(props) {
  const { city, temperature, description, humidity, wind } = props.data;

  return (
    <div className="weather-info">
      <h2>{city} Weather</h2>
      <ul>
        <li>Temperature: {Math.round(temperature)}°C</li>
        <li>Description: {description}</li>
        <li>Humidity: {humidity}%</li>
        <li>Wind: {Math.round(wind)} m/s</li>
      </ul>
    </div>
  );
}

// Search component & handles input and API call
export default function Search() {
  const [query, setQuery] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiKey = "6782253072f7d90462731a624097fc54"; // It's better to keep API keys in environment variables

  function handleSearch(event) {
    event.preventDefault();
    if (query.length > 0) {
      setLoading(true);
      setError(null); // Clear previous errors
      const units = "metric";
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${units}`;

      axios
        .get(apiUrl)
        .then((response) => {
          setWeatherData({
            city: response.data.name,
            temperature: response.data.main.temp,
            description: response.data.weather[0].description,
            humidity: response.data.main.humidity,
            wind: response.data.wind.speed,
          });
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching weather data:", err);
          setWeatherData(null); // Clear previous data
          setError("City not found or an error occurred.");
          setLoading(false);
        });
    } else {
      alert("Please enter a city.");
    }
  }

  function updateQuery(event) {
    setQuery(event.target.value);
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="search"
          placeholder="Type a city"
          onChange={updateQuery}
          value={query} // input controlled
        />
        <input type="submit" value="Search" />
      </form>

      {loading && <p>Loading weather data...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {weatherData && <WeatherDisplay data={weatherData} />}
    </div>
  );
}
