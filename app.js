import React from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled from 'styled-components'
import Local from "./Pages/Local";
import Search from "./Pages/Search";

const StyledLink = styled(Link)`
  color: red;
`

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <StyledLink to="/">Home</StyledLink>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
          </ul>
        </nav>
        {/* <Switch>
          <Route path="/">
            <Local />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
        </Switch> */}
      </div>
    </Router>
  );
}
