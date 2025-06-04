import React from "react";
import FormattedDate from "./FormattedDate";
import WeatherIcon from "./WeatherIcon";
import WeatherTemperature from "./WeatherTemperature";

import "./Weather.css";

function WeatherInfo(props) {
  return (
    <div className="WeatherInfo mb-6">
      <h1 className="text-4xl font-light text-gray-800 mb-2">
        {props.data.city}
      </h1>
      <ul className="list-none p-0 mb-4 text-gray-600">
        <li>
          <FormattedDate date={props.data.date} />
        </li>
        <li className="capitalize text-lg">{props.data.description}</li>
      </ul>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <WeatherIcon code={props.data.icon} size={64} />
          <WeatherTemperature celsius={props.data.temperature} />
        </div>
        <ul className="list-none p-0 text-gray-600 text-lg">
          <li>
            Humidity:{" "}
            <span className="font-semibold">{props.data.humidity}%</span>
          </li>
          <li>
            Wind:{" "}
            <span className="font-semibold">
              {Math.round(props.data.wind)} km/h
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default WeatherInfo;
