import React, { Component } from "react";

import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

import Home from "./pages/home";
import Menu from "./pages/menu";
import Date from "./pages/create/date";
import Login from "./pages/login";
import Location from "./pages/create/location";
import Friends from "./pages/create/friends";
import Final from "./pages/create/final";
import ThankYou from "./pages/create/thanks";
import JoinGroup from "./pages/join/group";
import JoinLocation from "./pages/join/location";
import JoinThankYou from "./pages/join/thanks";

const register = props => <Link to="/register" {...props} />;

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/menu" component={Menu} />
          <Route exact path="/teetime/new/date" component={Date} />
          <Route exact path="/teetime/join/group" component={JoinGroup} />
          <Route exact path="/teetime/new/location" component={Location} />
          <Route exact path="/teetime/join/location" component={JoinLocation} />
          <Route exact path="/teetime/new/friends" component={Friends} />
          <Route exact path="/teetime/join/thankyou" component={JoinThankYou} />
          <Route exact path="/teetime/new/final" component={Final} />
          <Route exact path="/teetime/new/thankyou" component={ThankYou} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
