import React, { useState } from "react";

function WeatherTemperature(props) {
  const [unit, setUnit] = useState("celsius");

  function showFahrenheit(event) {
    event.preventDefault();
    setUnit("fahrenheit");
  }
  function fahrenheit() {
    return (props.celsius * 9) / 5 + 32;
  }
  function showCelsius(event) {
    event.preventDefault();
    setUnit("celsius");
  }

  return (
    <div className="WeatherTemperature flex items-start ml-4">
      <span className="text-6xl font-bold text-gray-900 leading-none">
        {Math.round(unit === "celsius" ? props.celsius : fahrenheit())}
      </span>
      <span className="text-xl relative top-2 ml-1">
        {unit === "celsius" ? (
          <>
            <span className="text-blue-600 font-bold">°C</span>{" "}
            <a
              href="/"
              onClick={showFahrenheit}
              className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
            >
              | °F
            </a>
          </>
        ) : (
          <>
            <a
              href="/"
              onClick={showCelsius}
              className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
            >
              °C |
            </a>{" "}
            <span className="text-blue-600 font-bold">°F</span>
          </>
        )}
      </span>
    </div>
  );
}

export default WeatherTemperature;
