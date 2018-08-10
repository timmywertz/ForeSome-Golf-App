import React, { Component } from "react";

import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

import Home from "./pages/home";
import Menu from "./pages/menu";
import Date from "./pages/date";
//import Login from "./pages/login";
import Location from "./pages/location";
import Friends from "./pages/friends";
import Final from "./pages/final";

const register = props => <Link to="/register" {...props} />;

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={register} />
          {/*<Route exact path="/login" component={Login} /> */}
          <Route exact path="/menu" component={Menu} />
          <Route exact path="/teetime/new/date" component={Date} />
          <Route exact path="/teetime/join/date" component={Date} />
          <Route exact path="/teetime/new/location" component={Location} />
          <Route exact path="/teetime/join/location" component={Location} />
          <Route exact path="/teetime/new/friends" component={Friends} />
          <Route exact path="/teetime/join/final" component={Final} />
          <Route exact path="/teetime/new/final" component={Final} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
