import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherForecastDay from "./WeatherForecastDay";

export default function WeatherForecast(props) {
  let [loaded, setLoaded] = useState(false);
  let [forecast, setForecast] = useState(null);

  function handleResponse(response) {
    setForecast(response.data.daily);
    setLoaded(true);
  }

  function loadForecast() {
    let apiKey = "6782253072f7d90462731a624097fc54"; // Use the same API key
    let longitude = props.coordinates.lon;
    let latitude = props.coordinates.lat;
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    setLoaded(false);
    axios.get(apiUrl).then(handleResponse);
  }

  useEffect(() => {
    setLoaded(false);
    loadForecast();
  }, [props.coordinates.lat, props.coordinates.lon]);

  if (loaded) {
    return (
      <div className="WeatherForecast mt-4">
        <div className="card">
          <div className="card-header">
            <h5 className="card-title mb-0">5-Day Forecast</h5>
          </div>
          <div className="card-body">
            <div className="row g-2">
              {forecast.slice(1, 6).map(function (dailyForecast, index) {
                return (
                  <div className="col" key={index}>
                    <WeatherForecastDay data={dailyForecast} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="WeatherForecast mt-4">
        <div className="card">
          <div className="card-body text-center">
            <div
              className="spinner-border spinner-border-sm text-primary"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2 mb-0 text-muted">Loading forecast...</p>
          </div>
        </div>
      </div>
    );
  }
}
