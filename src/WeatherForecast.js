import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherForecastDay from "./WeatherForecastDay";

export default function WeatherForecast(props) {
  let [loaded, setLoaded] = useState(false);
  let [forecast, setForecast] = useState(null);

  function handleResponse(response) {
    // The 5-day forecast API returns data every 3 hours, so we need to process it
    // to get daily forecasts. We'll take one forecast per day (around noon when possible)
    const dailyForecasts = [];
    const seenDates = new Set();

    response.data.list.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const dateString = date.toDateString();

      // Skip today and only add one forecast per day
      if (!seenDates.has(dateString) && dailyForecasts.length < 5) {
        // Convert to match the expected format from One Call API
        const dailyItem = {
          dt: item.dt,
          temp: {
            max: item.main.temp_max,
            min: item.main.temp_min,
          },
          weather: item.weather,
        };
        dailyForecasts.push(dailyItem);
        seenDates.add(dateString);
      }
    });

    setForecast(dailyForecasts);
    setLoaded(true);
  }

  useEffect(() => {
    function loadForecast() {
      let apiKey = "6782253072f7d90462731a624097fc54";
      let longitude = props.coordinates.lon;
      let latitude = props.coordinates.lat;
      // Using the 5-day forecast API instead of deprecated One Call API
      let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

      setLoaded(false);
      axios.get(apiUrl).then(handleResponse);
    }

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
              {forecast.map(function (dailyForecast, index) {
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
