import React from "react";
import FormattedDate from "./FormattedDate";
import WeatherIcon from "./WeatherIcon";
import WeatherTemperature from "./WeatherTemperature";

function WeatherInfo(props) {
  return (
    <div className="WeatherInfo mb-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h1 className="card-title display-4 fw-light text-primary mb-3">
            {props.data.city}
          </h1>

          <div className="row align-items-center mb-4">
            <div className="col-md-6">
              <ul className="list-unstyled text-muted mb-3">
                <li className="fs-5">
                  <FormattedDate date={props.data.date} />
                </li>
                <li className="text-capitalize fs-5 fw-medium text-secondary">
                  {props.data.description}
                </li>
              </ul>
            </div>
          </div>

          <div className="row align-items-center">
            <div className="col-md-6 d-flex align-items-center justify-content-center justify-content-md-start">
              <WeatherIcon code={props.data.icon} size={80} />
              <WeatherTemperature celsius={props.data.temperature} />
            </div>

            <div className="col-md-6">
              <div className="weather-details">
                <div className="row g-3">
                  <div className="col-6">
                    <div className="bg-light p-3 rounded text-center">
                      <div className="text-muted small">Humidity</div>
                      <div className="fw-bold fs-5 text-primary">
                        {props.data.humidity}%
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="bg-light p-3 rounded text-center">
                      <div className="text-muted small">Wind</div>
                      <div className="fw-bold fs-5 text-primary">
                        {Math.round(props.data.wind)} km/h
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherInfo;
