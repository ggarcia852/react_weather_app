import React from "react";
import axios from "axios";

export default class Local extends React.Component {

  state = {
    lat: "",
    lon: ""
  };

  getLocalWeather = async () => {
    try {
      const response = await axios(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.lon}&appid=e796806e429831a5c613d003290850bf
      `);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        this.setState({ lat, lon });
        console.log(lat, lon);
      });
      this.getLocalWeather();
    } else {
      console.log("Location Not Available");
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
      </div>
    );
  }
}
