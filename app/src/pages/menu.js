import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Component } from "react";
import { Link } from "react-router-dom";
import Tracker from "../components/tracker";

const Menu = () => (
  <div>
    <center>
      <div>
        <img
          style={{ marginTop: 40, marginBottom: 5 }}
          width="50"
          height="200"
          alt="line of golf balls"
          src="/jpg-images/golf-2517685_340.jpg"
        />
      </div>
      <Button
        style={{ marginTop: 30, padding: 30 }}
        component={Link}
        to="/teetime/new/date"
        variant="contained"
        size="large"
        color="primary"
      >
        Create a TeeTime
      </Button>
      <div>
        <img
          style={{ marginTop: 10, marginBottom: 10 }}
          width="280"
          height="280"
          alt="three golf balls"
          src="/png-images/the-golf-ball-3505303_1280.png"
        />
      </div>
      <div>
        <Button
          component={Link}
          style={{ marginTop: -10, padding: 30 }}
          to="/teetime/join/date"
          variant="contained"
          size="large"
          color="secondary"
        >
          Join a TeeTime
        </Button>
      </div>
    </center>
  </div>
);

export default Menu;
