import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherInfo from "./WeatherInfo";

export default function WeatherData(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity || "New York"); // Added a fallback default city

  function handleResponse(response) {
    setWeatherData({
      ready: true,
      coordinates: response.data.coord,
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      date: new Date(response.data.dt * 1000),
      wind: response.data.wind.speed,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      city: response.data.name,
    });
  }

  function search() {
    const apiKey = "6782253072f7d90462731a624097fc54";
    const units = "metric";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(handleResponse).catch(handleError); // Added error handling
  }

  function handleError(error) {
    console.error("Error fetching weather data:", error);
    // You might want to display an error message to the user here
    setWeatherData({ ready: false }); // Reset ready state on error
    alert("Could not find weather data for that city. Please try again.");
  }

  function handleSubmit(event) {
    event.preventDefault();
    search(); // Call search when form is submitted
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  // useEffect to call search on component mount and when the defaultCity prop changes
  useEffect(() => {
    if (props.defaultCity) {
      setCity(props.defaultCity);
      search();
    } else if (!weatherData.ready && city) {
      // Initial load for default city if no prop
      search();
    }
  }, [props.defaultCity, city]); // Dependency array: re-run effect if defaultCity or city changes

  if (weatherData.ready) {
    return (
      <div className="Weather">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-9">
              <input
                type="search"
                placeholder="Enter a city.."
                className="form-control"
                autoFocus="on"
                onChange={handleCityChange}
                value={city} // Controlled component: input value tied to state
              />
            </div>
            <div className="col-3">
              <input
                type="submit"
                value="Search"
                className="btn btn-primary w-100"
              />
            </div>
          </div>
        </form>
        {/* Pass weatherData as a prop to WeatherInfo */}
        <WeatherInfo data={weatherData} />
      </div>
    );
  } else {
    // We initiate the search via useEffect, so just show loading here
    return "Loading...";
  }
}
