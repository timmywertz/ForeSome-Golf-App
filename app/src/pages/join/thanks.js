import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  TEETIME_JOIN_BOOKED,
  TEETIME_JOIN_SAVE_STARTED,
  TEETIME_TIME_JOINED,
  JOINED_TEETIME_TIME
} from "../../constants";
import Paper from "@material-ui/core/Paper";
import CustomSnackbar from "../../components/snackbar";
import { map, filter, find, propEq } from "ramda";
import { cyan } from "@material-ui/core/colors";
import filterCourses from "../../lib/joinCoursesHelper";

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
    isBooked,
    joinedTeeTimeTime,
    reservedTeeTime,
    currentTeeTimes
  } = props;
  console.log("listAvailableTeeTimes", listAvailableTeeTimes);
  console.log("reservedTeeTime", reservedTeeTime);
  console.log("currentTeeTimes", currentTeeTimes);
  console.log("joinedTeeTimeTime", joinedTeeTimeTime);
  return (
    <div>
      <center>
        {console.log("reservedTeeTime", reservedTeeTime)}
        <CustomSnackbar message="Tee-Time Joined!" snackType="success" />
        <Typography
          style={{ marginTop: 50, color: cyan[500] }}
          variant="display3"
        >
          THANK YOU FOR USING FORESOME!
        </Typography>
        <Paper>
          {console.log(JSON.stringify(groupSize))}
          <Typography style={{ marginTop: 20 }} variant="subheading">
            <div> Course: {currentCourse.name} </div>
            <div> Group Size: {reservedTeeTime.groupSize} </div>
            <div> Gender: {reservedTeeTime.gender} </div>
            <div> Handicap Range: {reservedTeeTime.hcpRange} </div>
            <div> Date: {reservedTeeTime.teeTimeDate} </div>
            <div> Time: {reservedTeeTime.teeTimeCreated} </div>
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
  state: state,
  currentCourse: state.courses.currentCourse,
  groupSize: state.teeTimes.teeTimes.groupSize,
  gender: state.teeTimes.teeTimes.gender,
  hcpRange: state.teeTimes.teeTimes.hcpRange,
  teeTimeDate: state.teeTimes.teeTimes.teeTimeDate,
  teeTimeCreated: state.teeTimes.teeTimes.teeTimeCreated,
  // teeTimes: state.teeTimes,
  joinedTeeTimeTime: state.teeTimes.teeTimes.joinedTeeTimeTime,
  reservedTeeTime: find(
    propEq(
      t => t._id === state.teeTimes.teeTimes.joinedTeeTimeTime,
      state.teeTimes.teeTimes.listAvailableTeeTimes
    )
  ),
  //   t => t.teeTimes._id === state.teeTimes.joinedTeeTimeTime,
  //   state.teeTimes
  // ),
  //   state.teeTimes.teeTimes

  // find(
  //   propEq(state.teeTimes.joinedTeeTimeTime, state.teeTimes.teeTimes._id)
  // ),
  //   t => t._id === state.teeTimes.joinedTeeTimeTime,
  //   state.teeTimes.teeTimes
  // ),
  isSaving: state.teeTimes.isSaving,
  isError: state.teeTimes.isError,
  errMessage: state.teeTimes.errMessage,
  isBooked: state.teeTimes.isBooked,
  courses: state.courses,
  currentTeeTimes: filter(
    t => t.courseId === state.courses.currentCourse._id,
    state.teeTimes.teeTimes
  ),
  listAvailableTeeTimes: filter(t => !t.isFull, state.teeTimes.teeTimes),
  teeTimes: state.teeTimes.teeTimes
});

const mapActionsToProps = dispatch => {
  return {
    teeTimeBooked: teetime => {
      dispatch({ type: TEETIME_JOIN_BOOKED, payload: teetime });
    },
    joinedTeeTimeTime: teetime => {
      dispatch({ type: JOINED_TEETIME_TIME, payload: teetime });
    },
    filterCourses: courses => dispatch(filterCourses(courses))
  };
};

const connector = connect(
  mapStateToProps,
  mapActionsToProps
);

export default connector(JoinThankYou);
