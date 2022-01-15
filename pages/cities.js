import React from "react";
import axios from "axios";
import SearchHeader from "/src/Components/SearchHeader";
import WeatherCard from "/src/Components/WeatherCard";
import { StyledDiv } from "../Local/styles";

export default class Search extends React.Component {
  state = {
    cities: [],
    weatherIcons: [],
    isLoading: false,
    hasError: false,
    userMessage: ""
  };

  getCity = async (city) => {
    const hasCity = this.state.cities.find(
      (element) => element.name.toLowerCase() === city.toLowerCase()
    );
    if (hasCity) {
      this.setState({
        isLoading: false,
        hasError: false,
        userMessage: "City Already Added"
      });
    } else {
      try {
        this.setState({ isLoading: true });
        const { data } = await axios(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=e796806e429831a5c613d003290850bf`
        );
        // const iconId = data.weather[0].icon;
        // const weatherIcons = "http://openweathermap.org/img/w/" + iconId + ".png";
        const newCities = [...this.state.cities, data];
        this.setState({
          cities: newCities,
          // weatherIcons,
          isLoading: false,
          hasError: false,
          userMessage: ""
        });
      } catch (err) {
        this.setState({ hasError: true, isLoading: false, userMessage: "" });
      }
    }
  };

  render() {
    const hasCity = !this.state.isLoading && this.state.cities;
    // const iconId = this.state.cities.data.weather[0].icon;
    // const weatherIcon = "http://openweathermap.org/img/w/" + iconId + ".png";
    return (
      <div>
        <SearchHeader getCity={this.getCity} />
        {this.state.hasError && <StyledDiv>Location Not Found</StyledDiv>}
        {this.state.isLoading && <StyledDiv>loading...</StyledDiv>}
        <StyledDiv>{this.state.userMessage}</StyledDiv>
        {hasCity && (
          <div>
            {this.state.cities.map((city) => (
              <WeatherCard
                city={city}
                key={city.name}
                // weatherIcon={weatherIcon}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}
