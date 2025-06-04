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
    <div className="WeatherTemperature d-flex align-items-start ms-3">
      <span className="temperature-value display-1 fw-bold text-dark lh-1">
        {Math.round(unit === "celsius" ? props.celsius : fahrenheit())}
      </span>
      <div className="temperature-units mt-2 ms-2">
        {unit === "celsius" ? (
          <div className="fs-4">
            <span className="text-primary fw-bold">°C</span>
            <span className="text-muted mx-1">|</span>
            <a
              href="/"
              onClick={showFahrenheit}
              className="text-decoration-none text-muted hover-link"
            >
              °F
            </a>
          </div>
        ) : (
          <div className="fs-4">
            <a
              href="/"
              onClick={showCelsius}
              className="text-decoration-none text-muted hover-link"
            >
              °C
            </a>
            <span className="text-muted mx-1">|</span>
            <span className="text-primary fw-bold">°F</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherTemperature;
