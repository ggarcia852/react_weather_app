import { Component } from "react";
import { StyledDiv } from "./styles";

export default class LocalHeader extends Component {
  state = {
    searchTerm: ""
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const newCity = this.state.searchTerm;
    this.props.handleSubmit(newCity);
    this.setState({ searchTerm: "" });
  };

  handleChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  };
  render() {
    return (
      <StyledDiv>
        <div>Add other locations:</div>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} value={this.state.searchTerm} />
        </form>
      </StyledDiv>
    );
  }
}
