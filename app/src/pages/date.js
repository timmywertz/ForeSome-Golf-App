import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Component } from "react";
import { Link } from "react-router-dom";
import DatePickers from "../components/datepicker";
import SimpleDialogDemo from "../components/timepicker";

const Date = () => (
  <div>
    <center>
      <Typography style={{ marginTop: 50 }} variant="display1">
        What day would you like to play?
      </Typography>

      <DatePickers />
      <div>
        <img
          style={{ marginTop: 30, marginBottom: 0 }}
          width="250"
          height="250"
          alt="logo"
          src="/png-images/clock-42655_1280.png"
        />
      </div>
      <SimpleDialogDemo />
      <div>
        <Button
          style={{ marginRight: 20, marginTop: 30, padding: 20 }}
          component={Link}
          to="/menu"
          variant="contained"
          size="large"
          color="primary"
        >
          Go Back
        </Button>
        <Button
          component={Link}
          style={{ marginLeft: 20, marginTop: 30, padding: 20 }}
          to="/teetime/new/location"
          variant="contained"
          size="large"
          color="secondary"
        >
          Next
        </Button>
      </div>
    </center>
  </div>
);

export default Date;
