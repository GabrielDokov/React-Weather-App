import React, { useState } from "react";
import Search from "./componets/search/search";
import CurrentWeather from "./componets/current-weather/currentweather";
import "../src/App.css";
import { weatherAPIURL, weatherAPIKEY } from "./api";
import Forecast from "./componets/forecast/forecast";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);

  const handleOnSearchChenge = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${weatherAPIURL}/weather?lat=${lat}&lon=${lon}&appid=${weatherAPIKEY}&units=metric`
    );
    const forecastWeatherFetch = fetch(
      `${weatherAPIURL}/forecast?lat=${lat}&lon=${lon}&appid=${weatherAPIKEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastWeatherFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecastWeather({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));

    console.log(currentWeather);
    console.log(forecastWeather);
  };

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChenge} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecastWeather && <Forecast data={forecastWeather}/>}
    </div>
  );
}

export default App;
