import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactAnimatedWeather from "react-animated-weather";
import WeatherData from "./WeatherData";

// App.js
function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col items-center justify-center p-4">
      <div className="container max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 md:p-8">
        <WeatherData defaultCity="New York" />
      </div>
      <footer className="mt-8 text-gray-700 text-sm text-center">
        This project was coded by{" "}
        <a
          href="https://github.com/mpokodner"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          Michelle Pokodner
        </a>{" "}
        and is{" "}
        <a
          href="https://weatherappreact-mp.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          hosted on Netlify
        </a>
      </footer>
    </div>
  );
}

export default App;
