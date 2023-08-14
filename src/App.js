import "./App.css";
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState({
    name: "",
    country: "",
    temp_c: "",
    precip_mm: "",
    humidity: "",
    wind_kph: "",
  });
  const [isWeatherVisible, setIsWeatherVisible] = useState(false); // Add this state
  const [notFoundRes, setNotFoundRes] = useState(false);
  const [loaderHandler, setLoaderHandler] = useState(false);

  //sending the request to the server and handling the errors
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoaderHandler(true)
    try {
      const response = await axios.get(
        `https://weatherappserver-opbk.onrender.com/api/weather/:${cityName}`
      );
      setWeatherData(response.data);
      setIsWeatherVisible(true);
      setNotFoundRes(false);
      setLoaderHandler(false)
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setNotFoundRes(true);
      setIsWeatherVisible(false);
      setLoaderHandler(false)
    }
  };
  return (
    <div className="container">
      <div className="formBox">
        <h1>
          Use our weather app <br /> to see the weather <br />
          around the world
        </h1>
        <p>City name: </p>
        <form onSubmit={handleSubmit}>
          <div className="relative-container">
            <input
              className="txtBox"
              type="text"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
              placeholder="Enter city name"
              required
            />
            <button className="checkBtn" type="submit">
              Check
            </button>
            {loaderHandler && <div class="loader"></div>}

          </div>
        </form>
      </div>
      <div className="weatherContainer">
        {notFoundRes && (
          <div className={`notfound ${notFoundRes ? "show" : ""}`}>
            we are sorry,
            <br />
            What you are looking for
            <br /> is not in our data base
          </div>
        )}
        {isWeatherVisible && (
          <div className="weather">
            <div className="dataContainer">
              <h3 id="city">{weatherData.name}</h3>
              <h4 id="country">{weatherData.country}</h4>
              <h2 id="degrees">{Math.round(weatherData.temp_c)}&deg;</h2>
              <table className="paramsTable">
                <tr>
                  <th>precipitation</th>
                  <th>Humidity</th>
                  <th>wind</th>
                </tr>
                <tr>
                  <td>{weatherData.precip_mm}mm</td>
                  <td>{weatherData.humidity}%</td>
                  <td>{weatherData.wind_kph} km/h</td>
                </tr>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
