import React from "react";
import WeatherIcon from "./WeatherIcon";
import "./WeatherForecast.css";

export default function WeatherForecast() {
  return (
    <div className="WeatherForecast">
      <div className="row">
        <div className="col">
          <div className="forecast-day-weather">Thurs</div>
          <WeatherIcon code="01d" size={36} />
          <div className="forecast-day-temperatures">
            <span className="forecast-day-temperature-max">18</span>
            <span className="forecast-day-temperature-min">12</span>
          </div>
        </div>
      </div>
    </div>
  );
}
