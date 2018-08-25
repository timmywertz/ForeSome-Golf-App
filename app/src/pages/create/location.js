import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import CourseSelector from "../../components/coursepicker";
import { connect } from "react-redux";
import CourseCard from "../../components/coursecard";
import { CURRENT_COURSE_SELECTED } from "../../constants";
import Paper from "@material-ui/core/Paper";
import { cyan } from "@material-ui/core/colors";

const styles = theme => ({
  card: {
    maxWidth: 354,
    maxHeight: 400
  },
  buttons: {
    marginRight: 20,
    marginLeft: 20,
    marginTop: 20,
    padding: 20,
    marginBottom: 40
  }
});

const Location = props => {
  const { classes } = props;

  return (
    <div>
      <center>
        <Typography
          style={{ marginTop: 40, marginBottom: 20, color: cyan[500] }}
          variant="display1"
        >
          DESTINATION
        </Typography>
        <CourseCard />
        <div>
          <Paper
            style={{
              backgroundColor: cyan[500],
              marginTop: 30,
              width: 300,
              height: 80
            }}
          >
            <CourseSelector />
          </Paper>
        </div>
        <Button
          component={Link}
          className={classes.buttons}
          to="/menu"
          variant="contained"
          size="large"
          color="primary"
        >
          Go Back
        </Button>
        <Button
          component={Link}
          className={classes.buttons}
          to="/teetime/new/date"
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
  coursesFromState: state.courses,
  currentCourse: state.courses.currentCourse
});

const mapActionsToProps = dispatch => {
  return {
    selectedValue: name => {
      dispatch({ type: CURRENT_COURSE_SELECTED, payload: name });
    }
  };
};

const connector = connect(
  mapStateToProps,
  mapActionsToProps
);

export default connector(withStyles(styles)(Location));
