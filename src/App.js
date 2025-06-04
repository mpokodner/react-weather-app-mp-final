import React from "react";
import WeatherData from "./WeatherData";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div className="min-vh-100 bg-gradient-to-br from-blue-100 to-purple-100 py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-xl-6">
            <div className="bg-white shadow-lg rounded-4 p-4 p-md-5">
              <WeatherData defaultCity="New York" />
            </div>
          </div>
        </div>

        <footer className="text-center mt-5">
          <div className="text-muted">
            This project was coded by{" "}
            <a
              href="https://github.com/mpokodner"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary text-decoration-none"
            >
              Michelle Pokodner
            </a>{" "}
            and is{" "}
            <a
              href="https://weatherappreact-mp.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary text-decoration-none"
            >
              hosted on Netlify
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
