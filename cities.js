import React from "react";
import axios from "axios";

export default class Search extends React.Component {
  state = {
    searchTerm: "",
    cities: [],
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
        userMessage: "City Already Added."
      });
    } else {
      try {
        this.setState({ isLoading: true });
        const { data } = await axios(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=e796806e429831a5c613d003290850bf`
        );
        console.log(data);
        const newCities = [...this.state.cities, data];
        this.setState({
          cities: newCities,
          isLoading: false,
          hasError: false,
          userMessage: ""
        });
      } catch (err) {
        this.setState({ hasError: true, isLoading: false, userMessage: "" });
      }
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.getCity(this.state.searchTerm);
    this.setState({ searchTerm: "" });
  };

  handleChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  render() {
    const hasCity = !this.state.isLoading && this.state.cities;
    return (
      <div>
        <h2>Search for other locations: </h2>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} value={this.state.searchTerm} />
        </form>
        {this.state.hasError && <div>Location Not Found</div>}
        {this.state.isLoading && <div>loading...</div>}
        {hasCity && (
          <div>
            {this.state.cities.map((city) => (
              <>
                <div>
                  {city.name}, {city.sys.country}
                </div>
                <img src={this.state.weatherIcon} alt="weather icon" />
                <div>Current temperature: {city.main.temp.toFixed(0)}° F</div>
                <div>Feels like: {city.main.feels_like.toFixed(0)}° F</div>
                <div>
                  Description: {city.weather[0].main}(
                  {city.weather[0].description})
                </div>
                <div>Today's low: {city.main.temp_min.toFixed(0)}° F</div>
                <div>Today's high: {city.main.temp_max.toFixed(0)}° F</div>
                <div>Humidity: {city.main.humidity}%</div>
                <div>Wind: {city.wind.speed.toFixed(0)} mph</div>
              </>
            ))}
          </div>
        )}
      </div>
    );
  }
}
