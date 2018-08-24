import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  TEETIME_JOIN_BOOKED,
  TEETIME_JOIN_SAVE_STARTED
} from "../../constants";
import Paper from "@material-ui/core/Paper";
import CustomSnackbar from "../../components/snackbar";

const JoinThankYou = props => {
  const {
    courses,
    currentCourse,
    groupSize,
    gender,
    hcpRange,
    selectedTeeTime,
    teeTimeDate,
    teeTimeCreated,
    availableTeeTimes,
    listAvailableTeeTimes,
    history,
    createNewTeeTime,
    teeTimeJoined,
    teeTimes,
    isError,
    isSaving,
    errMsg,
    isBooked
  } = props;
  console.log("availableTeeTimes", availableTeeTimes);
  return (
    <div>
      <center>
        <CustomSnackbar message="Tee-Time Joined!" snackType="success" />
        <Typography style={{ marginTop: 50 }} variant="display3">
          THANK YOU FOR USING FORESOME!
        </Typography>
        <Paper>
          <Typography style={{ marginTop: 20 }} variant="subheading">
            <div> Course: {currentCourse.name} </div>
            <div> Group Size: {selectedTeeTime.groupSize} </div>
            <div> Gender: {selectedTeeTime.gender} </div>
            <div> Handicap Range: {selectedTeeTime.hcpRange} </div>
            <div> Date: {selectedTeeTime.teeTimeDate} </div>
            <div> Time: {selectedTeeTime.teeTimeCreated} </div>
          </Typography>
        </Paper>
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
      {isError && (
        <CustomSnackbar
          message="There has been an error uploading this teetime"
          snackType="error"
        />
      )}
      {isSaving && <CustomSnackbar message="Saving..." snackType="info" />}
      {isBooked && (
        <CustomSnackbar message="Tee-Time Booked!" snackType="success" />
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  currentCourse: state.courses.currentCourse,
  groupSize: state.teeTimes.groupSize,
  gender: state.teeTimes.gender,
  hcpRange: state.teeTimes.hcpRange,
  teeTimeDate: state.teeTimes.teeTimeDate,
  teeTimeCreated: state.teeTimes.teeTimeCreated,
  teeTimes: state.teeTimes,
  teeTimeJoined: state.teeTimeJoined,
  selectedTeeTime: state.selectedTeeTime,
  isSaving: state.teeTimes.isSaving,
  isError: state.teeTimes.isError,
  errMessage: state.teeTimes.errMessage,
  isBooked: state.teeTimes.isBooked
});

const mapActionsToProps = dispatch => {
  return {
    teeTimeBooked: teetime => {
      dispatch({ type: TEETIME_JOIN_BOOKED, payload: teetime });
    },
    teeTimeJoined: teetime => {
      dispatch({ type: TEETIME_JOIN_SAVE_STARTED, payload: teetime });
    }
  };
};

const connector = connect(
  mapStateToProps,
  mapActionsToProps
);

export default connector(JoinThankYou);
