import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Component } from "react";
import { Link } from "react-router-dom";
import Select from "../components/select";

const Final = () => (
  <div>
    <center>
      <Typography style={{ marginTop: 50 }} variant="display3">
        Select Your Tee Time
      </Typography>
      <Select />
      <Button
        component={Link}
        style={{ marginTop: 0, padding: 20 }}
        to="/thankyou"
        variant="contained"
        size="large"
        color="secondary"
      >
        DONE!
      </Button>
    </center>
  </div>
);

export default Final;
