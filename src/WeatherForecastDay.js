import React from "react";
import WeatherIcon from "./WeatherIcon";

function WeatherForecastDay(props) {
  function maxTemperature() {
    let temperature = Math.round(props.data.temp.max);
    return `${temperature}°`;
  }

  function minTemperature() {
    let temperature = Math.round(props.data.temp.min);
    return `${temperature}°`;
  }

  function day() {
    let date = new Date(props.data.dt * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[day];
  }

  return (
    <div className="WeatherForecast-day text-center p-3 bg-light rounded shadow-sm">
      <div className="fw-bold text-primary mb-2">{day()}</div>
      <div className="d-flex justify-content-center mb-2">
        <WeatherIcon code={props.data.weather[0].icon} size={48} />
      </div>
      <div className="temperature-range">
        <span className="fw-bold text-dark fs-6">{maxTemperature()}</span>
        <span className="forecast-day-temperature-min text-muted ms-1">
          {minTemperature()}
        </span>
      </div>
    </div>
  );
}

export default WeatherForecastDay;
