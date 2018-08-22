import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Component } from "react";
import { Link } from "react-router-dom";
import SelectButtons from "../../components/select";
import { connect } from "react-redux";
import { NEW_TEETIME_CREATED, TEETIME_TIME_SELECTED } from "../../constants";
import { FormControlLabel } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { map } from "ramda";
import AvailableTeeTimeSelector from "../../components/teetimepicker";
import { addTeeTime } from "../../action-creators/teetimes";
import Paper from "@material-ui/core/Paper";
import MySnackBar from "../../components/snackbar";

// const listAvailableTeeTimes = availableTeeTimes => (
//   <SelectButtons
//     value={availableTeeTimes.time}
//     // onChange={handleTeeTimeSelected}
//     label={availableTeeTimes.time}
//   />
// );

const JoinFinal = props => {
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
    errMsg
  } = props;
  console.log("availableTeeTimes", availableTeeTimes);
  return (
    <div>
      {/* <form autoComplete="off">onSubmit={joinTeeTime(history)} */}
      <center>
        <Typography style={{ marginTop: 50 }} variant="display3">
          CONFIRM
        </Typography>
        <Paper style={{ marginTop: 15, width: 300 }}>
          <AvailableTeeTimeSelector style={{ marginTop: 60 }} />
        </Paper>
        <Typography style={{ marginTop: 80 }} variant="title">
          Settings:
        </Typography>
        <Typography style={{ marginTop: 20 }} variant="subheading">
          <div> Course: {currentCourse.name} </div>
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
        <div>
          <Button
            component={Link}
            // onClick={}
            type="submit"
            value="submit"
            aria-label="add"
            style={{ marginTop: 0, padding: 20 }}
            to="/thankyou"
            variant="extendedFab"
            size="large"
            color="secondary"
          >
            Submit New Tee-Time!
          </Button>
        </div>
      </center>
      {/* </form> */}
      {/* {props.isError && ( */}
      {/* //   <MySnackBar */}
      {/* //     message="There has been an error uploading this teetime"
      //     snackType="error"
      //   />
      // )}
      // {props.isSaving && <MySnackBar message="Saving..." snackType="info" />} 
      */}
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
  //   selectedTeeTimeDate: state.courses.teeTimeDate,
  //   selectedTeeTimeWindow: state.courses.selectedTeeTimeWindow,
  //   selectedTeeTime: state.courses.selectedTeeTime,
  teeTimeDate: state.courses.teeTimeDate,
  teeTimeCreated: state.courses.teeTimeCreated,
  availableTeeTimes: state.courses.availableTeeTimes

  // newTeeTimeData: state.newTeeTime.data,
  // isSaving: state.newTeeTime.isSaving,
  // isError: state.newTeeTime.isError,
  // errMessage: state.newTeeTime.errMessage
});

// const mapActionsToProps = dispatch => {
//   return {
//     teeTimeCreated: teetime => {
//       dispatch({ type: NEW_TEETIME_CREATED, payload: teetime });
//     },
//     joinTeeTime: history => e => {
//       e.preventDefault();
//       dispatch(addTeeTime(history));
//     }
//   };
// };

// const connector = connect(
//   mapStateToProps,
//   mapActionsToProps
// );

export default JoinFinal;
