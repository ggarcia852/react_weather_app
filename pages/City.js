import React from "react";
import axios from "axios";
import WeatherCard from "/src/Components/WeatherCard";
import { StyledDiv } from "../Local/styles";

export default class City extends React.Component {
  state = {
    weather: null,
    isLoading: false,
    hasError: false,
    userMessage: ""
  };

  getWeather = async () => {
    this.setState({ isLoading: true });
    try {
      const {
        data
      } = await axios(`https://api.openweathermap.org/data/2.5/weather?q=${this.props.match.params.cityId}&units=imperial&appid=e796806e429831a5c613d003290850bf
      `);
      this.setState({
        weather: data,
        isLoading: false,
        userMessage: "",
        hasError: false
      });
    } catch (err) {
      this.setState({
        isLoading: false,
        hasError: true,
        userMessage: "Weather not available for this location."
      });
      console.log(err);
    }
  };

  componentDidUpdate(prevProps) {
    if (this.props.match.params.cityId !== prevProps.match.params.cityId) {
      this.getWeather();
    }
  }

  componentDidMount() {
    this.getWeather();
  }

  render() {
    return (
      <div>
        {this.state.hasError && <StyledDiv>{this.state.userMessage}</StyledDiv>}
        {this.state.isLoading && <StyledDiv>Loading weather...</StyledDiv>}
        {this.state.hasError
          ? null
          : this.state.weather && <WeatherCard city={this.state.weather} />}
      </div>
    );
  }
}
