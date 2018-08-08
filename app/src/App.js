import React, { Component } from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "../src/pages/home";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={register} />
          <Route exact path="/login" component={login} />
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
          <Route exact path="teetime/finish" component={ReturnHome} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
