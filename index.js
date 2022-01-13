import React from "react";
import axios from "axios";

export default class Local extends React.Component {
  state = {
    lat: "",
    lon: "",
    localWeather: null,
    weatherIcon: "",
    isLoading: false,
    hasError: false,
    userMessage: ""
  };

  getLocalWeather = async () => {
    this.setState({ isLoading: true });
    try {
      const {
        data
      } = await axios(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.lon}&units=imperial&appid=e796806e429831a5c613d003290850bf
      `);
      const iconId = data.weather[0].icon;
      const weatherIcon = "http://openweathermap.org/img/w/" + iconId + ".png";
      this.setState({
        localWeather: data,
        weatherIcon,
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
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        this.setState({ lat, lon, isLoading: false });
        this.getLocalWeather();
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
    return (
      <div>
        <h1>Weather App</h1>
        <h2>Current weather for your location:</h2>
        {this.state.hasError && <div>{this.state.userMessage}</div>}
        {this.state.isLoading && <div>Loading local weather...</div>}

        {this.state.localWeather && (
          <>
            <div>
              {this.state.localWeather.name},{" "}
              {this.state.localWeather.sys.country}
            </div>
            <img src={this.state.weatherIcon} alt="weather icon" />
            <div>
              Current temperature:{" "}
              {this.state.localWeather.main.temp.toFixed(0)}° F
            </div>
            <div>
              Feels like: {this.state.localWeather.main.feels_like.toFixed(0)}°
              F
            </div>
            <div>
              Description: {this.state.localWeather.weather[0].main}(
              {this.state.localWeather.weather[0].description})
            </div>
            <div>
              Today's low: {this.state.localWeather.main.temp_min.toFixed(0)}° F
            </div>
            <div>
              Today's high: {this.state.localWeather.main.temp_max.toFixed(0)}°
              F
            </div>
            <div>Humidity: {this.state.localWeather.main.humidity}%</div>
            <div>Wind: {this.state.localWeather.wind.speed.toFixed(0)} mph</div>
          </>
        )}
      </div>
    );
  }
}
