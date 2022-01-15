import React from "react";
import { WeatherCardDiv, ItemDiv, CityName, StyledIcon } from "./styles";

export default function WeatherCard(props) {
  return (
    <WeatherCardDiv>
      <CityName>
        {props.city.name}, {props.city.sys.country}
        <StyledIcon img src={props.weatherIcon} alt="weather icon" />
      </CityName>
      <ItemDiv>
        Current temperature: {props.city.main.temp.toFixed(0)}° F
      </ItemDiv>
      <ItemDiv>Feels like: {props.city.main.feels_like.toFixed(0)}° F</ItemDiv>
      <ItemDiv>
        Description: {props.city.weather[0].main} (
        {props.city.weather[0].description})
      </ItemDiv>
      <ItemDiv>Today's low: {props.city.main.temp_min.toFixed(0)}° F</ItemDiv>
      <ItemDiv>Today's high: {props.city.main.temp_max.toFixed(0)}° F</ItemDiv>
      <ItemDiv>Humidity: {props.city.main.humidity}%</ItemDiv>
      <ItemDiv>Wind: {props.city.wind.speed.toFixed(0)} mph</ItemDiv>
    </WeatherCardDiv>
  );
}
