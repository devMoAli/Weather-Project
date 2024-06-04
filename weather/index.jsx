import { useEffect, useState } from "react";
import Search from "../search";

export default function Weather() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  async function fetchWeatherData(param) {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=6c508f37b2019234319s5g2f32895b7`
      );
      const data = await response.json();
      //   console.log(data);
      if (data) {
        setWeatherData(data);
        // console.log('data', data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  // handleSearch function will call an API to fetch weather data
  function handleSearch() {
    fetchWeatherData(search);
  }
  function getCurrentDate() {
    return new Date().toLocaleDateString("en-us", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }
  // to Display city weather map for any city on landing page
  useEffect(() => {
    fetchWeatherData("london");
  }, []);

  return (
    <div className="mainContainer">
      <Search
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />

      {loading && <div className="loading">Loading...</div>}
      {weatherData && (
        <div className="weatherContainer">
          <div className="cityName">
            <h2>
              {weatherData.name},{" "}
              <span>
                {weatherData.sys?.country}{" "}
                <img
                  alt=""
                  src="https://www.metoffice.gov.uk/webfiles/1716891040263/images/icons/weather/3.svg"
                />
              </span>
            </h2>{" "}
          </div>{" "}
          <div className="date">
            <span>{getCurrentDate()}</span>
          </div>
          <div className="temp">{Math.round(weatherData.main.temp) / 10}°C</div>
          <p className="desc"> {weatherData.weather[0].description}🌦️🌤️</p>
          <div className="weatherInfo">
            <div className="windHumidity">
              <div>
                <p>Wind Speed💨</p>
                <p className="wind">{weatherData?.wind?.speed}mph</p>
              </div>
            </div>
            <div className="windHumidity">
              <div>
                <p>Humidity💧</p>
                <p className="humidity">{weatherData?.main?.humidity}%</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
