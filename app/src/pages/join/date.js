import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import DatePicker from "../../components/datepicker";
import TimeSelector from "../../components/timepicker";
import {
  TEETIME_DATE_JOINED,
  TEETIME_TIME_JOINED,
  TEETIME_WINDOW_JOINED
} from "../../constants";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Button";

const JoinDate = props => {
  const { onChange, teeTimeDate } = props;

  return (
    <div>
      <center>
        <Typography style={{ marginTop: 50 }} variant="display1">
          What day would you like to play?
        </Typography>

        <DatePicker onChange={onChange} value={teeTimeDate} />
        <div>
          <img
            style={{ marginTop: 30, marginBottom: 0 }}
            width="250"
            height="250"
            alt="logo"
            src="/png-images/clock-42655_1280.png"
          />
        </div>
        <Paper style={{ marginTop: 15, width: 300 }}>
          <TimeSelector />
        </Paper>
        <div>
          <Button
            style={{ marginRight: 20, marginTop: 20, padding: 20 }}
            component={Link}
            to="/teetime/join/location"
            variant="contained"
            size="large"
            color="primary"
          >
            Go Back
          </Button>
          <Button
            component={Link}
            style={{ marginLeft: 20, marginTop: 20, padding: 20 }}
            to="/teetime/join/final"
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
};

//JOIN MAPSTATETOPROPS
// const mapStateToProps = state => ({
//   teetimes: state.joinTeeTime,
//   teeTimeWindow: state.joinTeeTime.teeTimeWindow,
//   selectedTeeTimeWindow: state.joinTeeTime.selectedTeeTimeWindow,
//   selectedTeeTimeDate: state.joinTeeTime.selectedTeeTimeDate,
//   selectedTeeTime: state.joinTeeTime.selectedTeeTime
// });

//ORIGINAL
const mapStateToProps = state => ({
  coursesFromState: state.courses,
  currentCourse: state.courses.currentCourse,
  teeTimeWindow: state.courses.teeTimeWindow,
  teeTimes: state.courses.currentCourse.teeTimes,
  selectedTeeTimeDate: state.courses.selectedTeeTimeDate,
  selectedTeeTimeWindow: state.courses.selectedTeeTimeWindow,
  selectedTeeTime: state.courses.selectedTeeTime
});
//

//JOIN;
const mapActionsToProps = dispatch => {
  return {
    selectedTimeWindow: teetime => {
      dispatch({ type: TEETIME_WINDOW_JOINED, payload: teetime });
    },
    selectedTeeTime: teetime => {
      dispatch({ type: TEETIME_TIME_JOINED, payload: teetime });
    },
    onChange: value => dispatch({ type: TEETIME_DATE_JOINED, payload: value })
  };
};

const connector = connect(
  mapStateToProps,
  mapActionsToProps
);

export default connector(JoinDate);
