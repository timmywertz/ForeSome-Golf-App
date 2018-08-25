import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { NEW_TEETIME_STARTED, TEETIME_JOINED } from "../constants";

const Menu = props => {
  const { teeTimeJoined, teeTimeStarted, join } = props;

  return (
    <div>
      <center>
        <Button
          style={{ marginTop: 120, padding: 30 }}
          component={Link}
          to="/teetime/new/location"
          variant="contained"
          size="large"
          color="primary"
        >
          Create a TeeTime
        </Button>
        <div>
          <img
            style={{ marginTop: 0, marginBottom: 0 }}
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
            to="/teetime/join/location"
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
};

export default Menu;
