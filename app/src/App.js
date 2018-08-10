import React, { Component } from "react";

import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

import Home from "./pages/home";
import Menu from "./pages/menu";
import Date from "./pages/date";

const register = props => <Link to="/register" {...props} />;

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={register} />
          <Route exact path="/menu" component={Menu} />
          <Route exact path="/teetime/new/date" component={Date} />
          <Route exact path="/teetime/join/date" component={Date} />
          <Route exact path="/teetime/new/location" component={Location} />
          <Route exact path="/teetime/join/location" component={Location} />
          {/* <Route exact path="/login" component={login} />
          <Route exact path="/teetime/create" component={MenuCreate} />
          <Route exact path="/teetime/create/time" component={CreateTime} />
          <Route
            exact
            path="/teetime/create/location"
            component={CreateLocation}
          />
          <Route
            exact
            path="/teetime/create/player"
            component={CreatePlayers}
          />
          <Route exact path="/teetime/join" component={MenuJoin} />
          <Route exact path="/teetime/join/time" component={JoinTime} />
          <Route exact path="/teetime/join" component={JoinLocation} />
          <Route exact path="teetime/finish" component={ReturnHome} /> */}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
