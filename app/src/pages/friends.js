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
      <Typography style={{ marginTop: 50 }} variant="display2">
        New Friends
      </Typography>
      <IconTabs />
      <Button
        component={Link}
        style={{ marginTop: 30, padding: 20 }}
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
