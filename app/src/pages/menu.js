import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Component } from "react";
import { Link } from "react-router-dom";
import Tracker from "../components/tracker";
import { connect } from "react-redux";
import { NEW_TEETIME_STARTED, TEETIME_JOINED } from "../constants";

const Menu = props => {
  const { teeTimeJoined, teeTimeStarted, join } = props;

  return (
    <div>
      <center>
        {/* <div>
        <img
          style={{ marginTop: 40, marginBottom: 5 }}
          width="100"
          height="200"
          alt="line of golf balls"
          src="/jpg-images/golf-2517685_1919.jpg"
         />
       </div> */}
        <Button
          // onClick={e => join === true}
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

// const mapStateToProps = state => ({
//   courses: state.courses,
//   join: state.courses.join
// });

// const mapActionsToProps = dispatch => {
//   return {
//     teeTimeStarted: (event, join) => {
//       dispatch({ type: NEW_TEETIME_STARTED, payload: join });
//     }
//   };
// };

// const connector = connect(
//   mapStateToProps,
//   mapActionsToProps
// );

export default Menu;
