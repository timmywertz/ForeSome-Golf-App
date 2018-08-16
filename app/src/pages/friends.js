import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Component } from "react";
import { Link } from "react-router-dom";
import IconTabs from "../components/tabs";

const Friends = () => (
  <div>
    <center>
      <Typography
        style={{ marginTop: 20, marginBottom: 20 }}
        variant="headline"
      >
        Select Your Group's:
      </Typography>
      <IconTabs />
      <Button
        style={{ marginRight: 20, marginTop: 15, padding: 20 }}
        component={Link}
        to="/teetime/new/date"
        variant="contained"
        size="large"
        color="primary"
      >
        Go Back
      </Button>
      <Button
        component={Link}
        style={{ marginTop: 15, padding: 20 }}
        to="/teetime/new/final"
        variant="contained"
        size="large"
        color="secondary"
      >
        NEXT
      </Button>
    </center>
  </div>
);

export default Friends;
