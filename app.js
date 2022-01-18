import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled from "styled-components";
import Local from "./pages/Local";
import City from "./Pages/City";
import AddLocation from "/src/Components/AddLocation";
import { StyledNavList } from "./styles";

const StyledLink = styled(Link)`
  margin: 10px;
`;

export default class App extends React.Component {
  setInStorage = (cities) => {
    window.localStorage.setItem("cities", JSON.stringify(cities));
  };

  state = {
    cities: []
  };

  handleSubmit = (newCity) => {
    const newCities = [...this.state.cities, newCity];
    this.setState({ cities: newCities });
    this.setInStorage(newCities);
  };

  componentDidMount() {
    this.setState({
      cities: JSON.parse(window.localStorage.getItem("cities")) || []
    });
  }

  render() {
    return (
      <Router>
        <div>
          <nav>
            <StyledNavList>
              <li>
                <StyledLink to="/">Home</StyledLink>
              </li>
              {this.state.cities.map((city) => (
                <li key={city}>
                  <StyledLink to={`/city/${city}`}>{city}</StyledLink>
                </li>
              ))}
            </StyledNavList>
          </nav>
          <AddLocation handleSubmit={this.handleSubmit} />
          <Switch>
            <Route exact path="/" component={Local} />
            <Route exact path="/city/:cityId" component={City} />
          </Switch>
        </div>
      </Router>
    );
  }
}
