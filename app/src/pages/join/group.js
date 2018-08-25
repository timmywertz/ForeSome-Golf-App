import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import {
  TEETIME_TIME_JOINED,
  TEETIME_JOIN_SAVE_STARTED
} from "../../constants";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Button";
import JoinAvailableTeeTimeSelector from "../../components/jointimepicker";
import { filter } from "ramda";
import { joinTeeTime } from "../../action-creators/teetimes";
import CustomSnackbar from "../../components/snackbar";
import { cyan } from "@material-ui/core/colors";

const style = {
  marginRight: 20,
  marginLeft: 20,
  marginTop: 20,
  padding: 20,
  marginBottom: 40
};

const JoinGroup = props => {
  const { currentCourse } = props;

  return (
    <div>
      <center>
        <Typography
          style={{ marginTop: 50, color: cyan[500] }}
          variant="display1"
        >
          Available Tee-Times at {currentCourse.name}:
        </Typography>

        <div>
          <img
            style={{ marginTop: 30, marginBottom: 0 }}
            width="250"
            height="250"
            alt="logo"
            src="/png-images/clock-42655_1280.png"
          />
        </div>
        <Paper
          style={{
            backgroundColor: cyan[500],
            marginTop: 30,
            width: 300,
            height: 80
          }}
        >
          <JoinAvailableTeeTimeSelector />
        </Paper>
        <div>
          <Button
            style={{
              marginRight: 20,
              marginLeft: 20,
              marginTop: 20,
              padding: 20,
              marginBottom: 40
            }}
            component={Link}
            to="/teetime/join/location"
            variant="contained"
            size="large"
            color="primary"
          >
            Go Back
          </Button>
          <Button
            style={{
              marginRight: 20,
              marginLeft: 20,
              marginTop: 20,
              padding: 20,
              marginBottom: 40
            }}
            component={Link}
            to="/teetime/join/thankyou"
            variant="contained"
            size="large"
            color="secondary"
          >
            Next
          </Button>
          {props.isError && (
            <CustomSnackbar
              message="There has been an error joining this teetime"
              snackType="error"
            />
          )}
          {props.isSaving && (
            <CustomSnackbar message="Saving..." snackType="info" />
          )}
          {props.isBooked && (
            <CustomSnackbar message="Tee-Time Joined!" snackType="success" />
          )}
        </div>
      </center>
    </div>
  );
};

const mapStateToProps = state => ({
  coursesFromState: state.courses,
  currentCourse: state.courses.currentCourse,
  selectedTeeTimes: state.courses.currentCourse.availableTeeTimes,
  joinTeeTime: state.courses.joinTeeTime,
  teeTimes: state.teeTimes,
  listAvailableTeeTimes: filter(t => !t.isFull, state.teeTimes),
  isError: state.teeTimes.isError,
  isSaving: state.courses.isSaving,
  errMessage: state.courses.errMessage,
  isBooked: state.courses.isBooked
});

const mapActionsToProps = dispatch => {
  return {
    joinedTeeTimeTime: teetime => {
      dispatch({ type: TEETIME_JOIN_SAVE_STARTED, payload: teetime });
    },
    // selectedTeeTime: teetime => {
    //   dispatch({ type: TEETIME_TIME_JOINED, payload: teetime });
    // },
    teeTimeJoinedInDatabase: history => e => {
      e.preventDefault();
      dispatch(joinTeeTime(history));
    }
  };
};

const connector = connect(
  mapStateToProps,
  mapActionsToProps
);

export default connector(JoinGroup);
