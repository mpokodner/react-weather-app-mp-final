import React, { useState } from "react";

export default function WeatherTemperature(props) {
  const [unit, setUnit] = useState("celsius");
  function convertToFahrenheit(event) {
    event.preventDefault();
    setUnit("fahrenheit");
  }
  function fahrenheit() {
    return (props.celsius * 9) / 5 + 32;
  }
  function convertToCelsius(event) {
    event.preventDefault();
    setUnit("celsius");
  }
  if (unit === "celsius") {
    return (
      <div className="WeatherTemperature">
        <span className="temperature">{Math.round(props.celsius)}</span>
        <span className="unit">
          <a href="/" onClick={convertToFahrenheit}>
            {" "}
            °C
          </a>{" "}
          |{" "}
          <a href="/" onClick={convertToCelsius}>
            °F
          </a>{" "}
        </span>
      </div>
    );
  } else {
    return (
      <div className="WeatherTemperature">
        <span className="temperature">{Math.round(fahrenheit())}</span>
        <span className="unit">
          <a href="/" onClick={convertToCelsius}>
            {" "}
            °C
          </a>{" "}
          | °F
        </span>
      </div>
    );
  }
}
