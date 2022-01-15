import React from "react";
import { StyledHeader } from "../LocalHeader/styles";

export default class SearchHeader extends React.Component {
  state = {
    searchTerm: ""
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.getCity(this.state.searchTerm);
    this.setState({ searchTerm: "" });
  };

  handleChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  };
  render() {
    return (
      <StyledHeader>
        <h2>Search for other locations: </h2>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} value={this.state.searchTerm} />
        </form>
      </StyledHeader>
    );
  }
}
