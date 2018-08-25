import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import CourseSelector from "../../components/coursepicker";
import { filter } from "ramda";
import { connect } from "react-redux";
import CourseCard from "../../components/coursecard";
import { CURRENT_COURSE_SELECTED, GET_TEETIMES } from "../../constants";

import Paper from "@material-ui/core/Paper";
import filterCourses from "../../lib/joinCoursesHelper";
import { cyan } from "@material-ui/core/colors";

const styles = {
  card: {
    maxWidth: 354
  }
};

const JoinLocation = props => {
  return (
    <div>
      <center>
        <Typography
          style={{ marginTop: 50, marginBottom: 30, color: cyan[500] }}
          variant="display1"
        >
          DESTINATION
        </Typography>
        <CourseCard />
        <Paper
          style={{ marginTop: 15, width: 300, backgroundColor: cyan[500] }}
        >
          <CourseSelector join />
        </Paper>
        <Button
          style={{ marginRight: 20, marginTop: 30, padding: 20 }}
          component={Link}
          to="/menu"
          variant="contained"
          size="large"
          color="primary"
        >
          Go Back
        </Button>
        <Button
          component={Link}
          style={{ marginTop: 30, padding: 20 }}
          to="/teetime/join/group"
          variant="contained"
          size="large"
          color="secondary"
        >
          NEXT
        </Button>
      </center>
    </div>
  );
};

const mapStateToProps = state => ({
  courses: state.courses,
  getCurrentCourse: state.courses.currentCourse,
  availableTeeTimes: filter(t => !t.isFull, state.teeTimes),
  teeTimes: state.teeTimes
});

const mapActionsToProps = dispatch => {
  return {
    selectedValue: name => {
      dispatch({ type: CURRENT_COURSE_SELECTED, payload: name });
    },
    setTeeTimes: teeTimes => {
      dispatch({ type: GET_TEETIMES, payload: teeTimes });
    },
    filterCourses: courses => dispatch(filterCourses(courses))
  };
};

const connector = connect(
  mapStateToProps,
  mapActionsToProps
);

export default connector(withStyles(styles)(JoinLocation));
