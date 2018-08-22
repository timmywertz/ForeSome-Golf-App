import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Component } from "react";
import { Link } from "react-router-dom";
import SelectButtons from "../../components/select";
import { connect } from "react-redux";
import {
  NEW_TEETIME_CREATED,
  TEETIME_TIME_SELECTED,
  NEW_TEETIME_BOOKED
} from "../../constants";
import { FormControlLabel } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { map } from "ramda";
import AvailableTeeTimeSelector from "../../components/teetimepicker";
import { addTeeTime } from "../../action-creators/teetimes";
import Paper from "@material-ui/core/Paper";
import CustomSnackbar from "../../components/snackbar";

const ThankYou = props => {
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
    listAvailableTeeTimes,
    history,
    createNewTeeTime,
    isError,
    isSaving,
    errMsg,
    isBooked
  } = props;
  console.log("availableTeeTimes", availableTeeTimes);
  return (
    <div>
      <center>
        <CustomSnackbar message="Tee-Time Booked!" snackType="success" />
        <Typography style={{ marginTop: 50 }} variant="display3">
          THANK YOU FOR USING FORESOME!
        </Typography>
        <Paper style={{ marginTop: 15, width: 300 }}>
          <AvailableTeeTimeSelector style={{ marginTop: 60 }} />
        </Paper>
        <Typography style={{ marginTop: 80 }} variant="title" />
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
          to="/menu"
          variant="contained"
          size="large"
          color="primary"
        >
          Return To Main Menu
        </Button>
      </center>
    </div>
  );
};

const mapStateToProps = state => ({
  courses: state.courses,
  currentCourse: state.courses.currentCourse,
  courseId: state.courses.currentCourse._id,
  groupSize: state.courses.groupSize,
  gender: state.courses.gender,
  hcpRange: state.courses.hcpRange,
  teeTimes: state.courses.currentCourse.teeTimes,
  golferId: state.courses.golfer_id,
  teeTimeDate: state.courses.teeTimeDate,
  teeTimeCreated: state.courses.teeTimeCreated,
  availableTeeTimes: state.courses.availableTeeTimes,
  isSaving: state.courses.isSaving,
  isError: state.courses.isError,
  errMessage: state.courses.errMessage,
  isBooked: state.courses.isBooked
});

const mapActionsToProps = dispatch => {
  return {
    teeTimeBooked: teetime => {
      dispatch({ type: NEW_TEETIME_BOOKED, payload: teetime });
    }
  };
};

const connector = connect(
  mapStateToProps,
  mapActionsToProps
);

export default connector(ThankYou);
