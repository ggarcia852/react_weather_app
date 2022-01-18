import { Component } from "react";
import { StyledHeader } from "./styles";

export default class LocalHeader extends Component {
  render() {
    return (
      <StyledHeader>
        <h1>Weather App</h1>
        <h3>Current weather for your location:</h3>
      </StyledHeader>
    );
  }
}
