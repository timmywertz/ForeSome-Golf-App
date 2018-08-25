import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { NEW_TEETIME_BOOKED } from "../../constants";
import Paper from "@material-ui/core/Paper";
import CustomSnackbar from "../../components/snackbar";
import { cyan } from "@material-ui/core/colors";

const ThankYou = props => {
  const {
    currentCourse,
    groupSize,
    gender,
    hcpRange,
    teeTimeDate,
    teeTimeCreated,
    availableTeeTimes
  } = props;
  console.log("availableTeeTimes", availableTeeTimes);
  return (
    <div>
      <center>
        <CustomSnackbar message="Tee-Time Booked!" snackType="success" />
        <Typography
          style={{ marginTop: 80, color: cyan[300] }}
          variant="display3"
        >
          THANKS FOR USING FORESOME!
        </Typography>
        <Paper style={{ backgroundColor: cyan[300] }}>
          <Typography style={{ marginTop: 20 }} variant="subheading">
            <div> Course: {currentCourse.name} </div>
            <div> Group Size: {groupSize} </div>
            <div> Gender: {gender} </div>
            <div> Handicap Range: {hcpRange} </div>
            <div> Date: {teeTimeDate} </div>
            <div> Time: {teeTimeCreated} </div>
          </Typography>
        </Paper>
        <Button
          style={{ marginRight: 20, marginTop: 50, padding: 20 }}
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
