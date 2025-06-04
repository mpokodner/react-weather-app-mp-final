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
    <div className="text-center bg-gray-50 p-4 rounded-lg shadow-sm">
      <div className="font-medium text-gray-700 mb-2">{day()}</div>
      <WeatherIcon code={props.data.weather[0].icon} size={36} />
      <div className="mt-2 text-lg">
        <span className="font-bold text-gray-800">{maxTemperature()}</span>
        <span className="text-gray-500 ml-1">{minTemperature()}</span>
      </div>
    </div>
  );
}

export default WeatherForecastDay;
