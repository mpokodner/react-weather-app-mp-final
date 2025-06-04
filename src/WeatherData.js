import React, { useState } from "react";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";
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

// WeatherForecast.js
function WeatherForecast(props) {
  const [loaded, setLoaded] = useState(false);
  const [forecast, setForecast] = useState(null);

  // Function to load the forecast data
  function loadForecast() {
    const apiKey = "6f578b96aa9505bcce148ac22cb85794"; // Your API key for onecall
    let longitude = props.coordinates.lon;
    let latitude = props.coordinates.lat;
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=metric`;

    axios
      .get(apiUrl)
      .then(handleResponse)
      .catch((error) => {
        console.error("Error fetching forecast:", error);
        setLoaded(false); // Reset loaded state on error
      });
  }

  function handleResponse(response) {
    setForecast(response.data.daily);
    setLoaded(true);
  }

  // Use useEffect to fetch forecast when coordinates change
  useEffect(() => {
    // Reset loaded state and forecast data when coordinates change
    setLoaded(false);
    setForecast(null);
    if (props.coordinates) {
      loadForecast();
    }
  }, [props.coordinates]); // Re-run when coordinates prop changes

  if (loaded) {
    return (
      <div className="WeatherForecast mt-6 border-t pt-4">
        <h2 className="text-xl font-semibold mb-4">5-Day Forecast</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {forecast.slice(0, 5).map(function (dailyForecast, index) {
            return (
              <div key={index} className="col-span-1">
                <WeatherForecastDay data={dailyForecast} />
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    // Show loading message or null if coordinates are not yet available
    return props.coordinates ? (
      <div className="text-center text-gray-600 text-lg py-4">
        Loading forecast...
      </div>
    ) : null;
  }
}

export { WeatherData, WeatherInfo, WeatherForecast };
