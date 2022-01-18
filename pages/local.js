import React from "react";
import axios from "axios";
import LocalHeader from "/src/Components/LocalHeader";
import WeatherCard from "/src/Components/WeatherCard";
import { StyledDiv } from "./styles";

export default class Local extends React.Component {
  state = {
    localWeather: null,
    isLoading: false,
    hasError: false,
    userMessage: ""
  };

  getLocalWeather = async (lat, lon) => {
    this.setState({ isLoading: true });
    try {
      const {
        data
      } = await axios(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=e796806e429831a5c613d003290850bf
      `);
      this.setState({
        localWeather: data,
        isLoading: false,
        userMessage: "",
        hasError: false
      });
    } catch (err) {
      this.setState({
        isLoading: false,
        hasError: true,
        userMessage: "Local weather not available"
      });
      console.log(err);
    }
  };

  getLocation = () => {
    this.setState({ isLoading: true });
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        this.getLocalWeather(lat, lon);
      });
    } else {
      this.setState({
        isLoading: false,
        hasError: true,
        userMessage: "User Location Not Available"
      });
    }
  };

  componentDidMount() {
    this.getLocation();
  }

  render() {
    const city = this.state.localWeather;
    return (
      <div>
        <LocalHeader />
        {this.state.hasError && <StyledDiv>{this.state.userMessage}</StyledDiv>}
        {this.state.isLoading && (
          <StyledDiv>Loading local weather...</StyledDiv>
        )}
        {this.state.localWeather && (
          <div>
            <WeatherCard city={city} />
          </div>
        )}
      </div>
    );
  }
}
