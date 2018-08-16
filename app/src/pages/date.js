import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Component } from "react";
import { Link } from "react-router-dom";
import DatePicker from "../components/datepicker";
import TimeSelector from "../components/timepicker";
import { TEETIME_DATE_SELECTED, TEETIME_TIME_SELECTED } from "../constants";
import { connect } from "react-redux";
import { isEmpty } from "ramda";

const Date = props => (
  <div>
    <center>
      <Typography style={{ marginTop: 50 }} variant="display1">
        What day would you like to play?
      </Typography>

      <DatePicker onChange={props.onChange} value={props.teeTimeDate} />
      <div>
        <img
          style={{ marginTop: 30, marginBottom: 0 }}
          width="250"
          height="250"
          alt="logo"
          src="/png-images/clock-42655_1280.png"
        />
      </div>
      <TimeSelector />
      <div>
        <Button
          style={{ marginRight: 20, marginTop: 30, padding: 20 }}
          component={Link}
          to="/teetime/new/location"
          variant="contained"
          size="large"
          color="primary"
        >
          Go Back
        </Button>
        <Button
          component={Link}
          style={{ marginLeft: 20, marginTop: 30, padding: 20 }}
          to="/teetime/new/friends"
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

const mapStateToProps = state => ({
  coursesFromState: state.courses,
  currentCourse: state.courses.currentCourse,
  teeTimeWindow: state.courses.teeTimeWindow,
  teeTimes: state.courses.currentCourse.teeTimes,
  teeTimeDate: state.courses.teeTimeDate
});

const mapActionsToProps = dispatch => {
  return {
    selectedTimeWindow: teetime => {
      dispatch({ type: TEETIME_TIME_SELECTED, payload: teetime });
    },
    onChange: value => dispatch({ type: TEETIME_DATE_SELECTED, payload: value })
  };
};

const connector = connect(
  mapStateToProps,
  mapActionsToProps
);

export default connector(Date);
