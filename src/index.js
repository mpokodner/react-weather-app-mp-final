// src/index.js (or App.js, wherever WeatherData is rendered)
import React from "react";
import ReactDOM from "react-dom/client";
import WeatherData from "./WeatherData"; // Changed to default import
import "./index.css"; // Or your main CSS

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WeatherData defaultCity="New York" />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
