import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { NEW_TEETIME_SAVE_STARTED } from "../../constants";
import AvailableTeeTimeSelector from "../../components/teetimepicker";
import { addTeeTime } from "../../action-creators/teetimes";
import Paper from "@material-ui/core/Paper";
import { cyan } from "@material-ui/core/colors";
import CustomSnackbar from "../../components/snackbar";
import { Home } from "@material-ui/icons";

const Final = props => {
  const {
    currentCourse,
    groupSize,
    gender,
    hcpRange,
    teeTimeDate,
    teeTimeCreated,
    availableTeeTimes,
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
      <Button
        style={{ marginRight: 20, marginTop: 0, padding: 20 }}
        component={Link}
        to="/menu"
        variant="extendedFab"
        size="small"
        color="secondary"
      >
        <Home />
      </Button>
      <form autoComplete="off" onSubmit={createNewTeeTime(history)}>
        <center>
          <Typography
            style={{ marginTop: 50, color: cyan[500] }}
            variant="display3"
          >
            CONFIRM
          </Typography>
          <Paper
            style={{ backgroundColor: cyan[500], marginTop: 15, width: 300 }}
          >
            <AvailableTeeTimeSelector style={{ marginTop: 60 }} />
          </Paper>
          <Typography style={{ marginTop: 80 }} variant="title">
            Settings:
          </Typography>
          <Typography style={{ marginTop: 20 }} variant="subheading">
            <div> Course: {currentCourse.name} </div>
            <div> Group Size: {groupSize} </div>
            <div> Gender: {gender} </div>
            <div> Handicap Range: {hcpRange} </div>
            <div> Date: {teeTimeDate} </div>
          </Typography>
          <div>
            <Button
              type="submit"
              onChange={teeTimeCreated}
              value="submit"
              aria-label="add"
              style={{ marginTop: 20, padding: 20 }}
              variant="extendedFab"
              size="large"
              color="primary"
            >
              Submit New Tee-Time!
            </Button>
          </div>
        </center>
      </form>
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
    teeTimeCreated: teetime => {
      dispatch({ type: NEW_TEETIME_SAVE_STARTED, payload: teetime });
    },
    createNewTeeTime: history => e => {
      e.preventDefault();
      dispatch(addTeeTime(history));
    }
  };
};

const connector = connect(
  mapStateToProps,
  mapActionsToProps
);

export default connector(Final);
