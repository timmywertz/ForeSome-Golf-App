import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Component } from "react";
import { Link } from "react-router-dom";
import SelectButtons from "../components/select";
import { connect } from "react-redux";
import { NEW_TEETIME_CREATED, TEETIME_TIME_SELECTED } from "../constants";
import { FormControlLabel } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { map } from "ramda";
import AvailableTeeTimeSelector from "../components/teetimepicker";

// const listAvailableTeeTimes = availableTeeTimes => (
//   <SelectButtons
//     value={availableTeeTimes.time}
//     // onChange={handleTeeTimeSelected}
//     label={availableTeeTimes.time}
//   />
// );

const Final = props => {
  const {
    courses,
    currentCourse,
    groupSize,
    gender,
    hcpRange,
    selectedTeeTimeWindow,
    teeTimeDate,
    teeTimeCreated,
    availableTeeTimes,
    listAvailableTeeTimes
  } = props;
  console.log("availableTeeTimes", availableTeeTimes);
  return (
    <div>
      <center>
        <Typography style={{ marginTop: 50 }} variant="display3">
          CONFIRM
        </Typography>
        <AvailableTeeTimeSelector style={{ marginTop: 60 }} />

        {/* <SelectButtons /> */}
        {/* <SelectButtons
          value={"4:20pm"}
          onChange={teeTimeSelected}
          label={"4:20pm"}
        >
          <FormControlLabel
            control={<Radio />}
            value={"3:20pm"}
            label={"3:50pm"}
            onChange={teeTimeSelected}
          />
        </SelectButtons> */}
        <Typography style={{ marginTop: 80 }} variant="title">
          Settings:
        </Typography>
        <Typography style={{ marginTop: 20 }} variant="subheading">
          <div> Course: {currentCourse.name} </div>
          <div> Group Size: {groupSize} </div>
          <div> Gender: {gender} </div>
          <div> Handicap Range: {hcpRange} </div>
          <div> Date: {teeTimeDate} </div>
          {/* <div> Time Window: {selectedTeeTimeWindow} </div> */}
        </Typography>
        <Button
          style={{ marginRight: 20, marginTop: 15, padding: 20 }}
          component={Link}
          to="/teetime/new/friends"
          variant="contained"
          size="large"
          color="primary"
        >
          Go Back
        </Button>
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
};

const mapStateToProps = state => ({
  courses: state.courses,
  currentCourse: state.courses.currentCourse,
  groupSize: state.courses.groupSize,
  gender: state.courses.gender,
  hcpRange: state.courses.hcpRange,
  teeTimes: state.courses.currentCourse.teeTimes,
  selectedTeeTimeDate: state.courses.teeTimeDate,
  selectedTeeTimeWindow: state.courses.selectedTeeTimeWindow,
  selectedTeeTime: state.courses.selectedTeeTime,
  teeTimeDate: state.courses.teeTimeDate,
  teeTimeCreated: state.courses.teeTimeCreated,
  availableTeeTimes: state.courses.availableTeeTimes
});

const mapActionsToProps = dispatch => {
  return {
    teeTimeCreated: teetime => {
      dispatch({ type: NEW_TEETIME_CREATED, payload: teetime });
    }
  };
};

const connector = connect(
  mapStateToProps,
  mapActionsToProps
);

export default connector(Final);
