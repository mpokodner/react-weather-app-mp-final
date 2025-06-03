import "./App.css";
import WeatherData from "./WeatherData";

function App() {
  // Add a breakpoint here for debugging
  debugger;
  return (
    <div className="App">
      <div className="container">
        <WeatherData defaultCity="New York" />
      </div>
      <footer>
        This project was coded by{" "}
        <a
          href="https://github.com/mpokodner"
          target="_blank"
          rel="noopener noreferrer"
        >
          Michelle Pokodner
        </a>{" "}
        and is{" "}
        <a
          href="https://weatherappreact-mp.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          hosted on Netlify
        </a>
      </footer>
    </div>
  );
}

export default App;
