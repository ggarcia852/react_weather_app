import React from "react";
import { WeatherCardDiv, ItemDiv, CityName, StyledIcon } from "./styles";

export default function WeatherCard({ city }) {
  const iconId = city.weather[0].icon;
  const weatherIcon = `http://openweathermap.org/img/w/${iconId}.png`;

  return (
    <WeatherCardDiv>
      <CityName>
        {city.name}, {city.sys.country}
        <StyledIcon img src={weatherIcon} alt="weather icon" />
      </CityName>
      <ItemDiv>Current temperature: {city.main.temp.toFixed(0)}° F</ItemDiv>
      <ItemDiv>Feels like: {city.main.feels_like.toFixed(0)}° F</ItemDiv>
      <ItemDiv>
        Description: {city.weather[0].main} ({city.weather[0].description})
      </ItemDiv>
      <ItemDiv>Today's low: {city.main.temp_min.toFixed(0)}° F</ItemDiv>
      <ItemDiv>Today's high: {city.main.temp_max.toFixed(0)}° F</ItemDiv>
      <ItemDiv>Humidity: {city.main.humidity}%</ItemDiv>
      <ItemDiv>Wind: {city.wind.speed.toFixed(0)} mph</ItemDiv>
    </WeatherCardDiv>
  );
}
