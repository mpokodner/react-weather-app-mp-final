import React from "react";
import WeatherIcon from "./WeatherIcon";
import "./WeatherForecast.css";
import axios from "axios";

export default function WeatherForecast(props) {
  function handleResponse(response) {
    console.log(response.data);
  }
  console.log(props);

  let apiKey = "6f578b96aa9505bcce148ac22cb85794";
  let longitude = props.coordinates.lon;
  let latitude = props.coordinates.lat;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(handleResponse);

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
