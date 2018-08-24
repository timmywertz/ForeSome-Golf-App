/* eslint-disable react/no-multi-comp */

import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { cyan, grey } from "@material-ui/core/colors";
import { GolfCourse } from "@material-ui/icons";
import { connect } from "react-redux";
import filterCourses from "../lib/joinCoursesHelper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { CURRENT_COURSE_SELECTED } from "../constants";
import { filter, map } from "ramda";
const uuid = require("uuid");

const styles = {
  avatar: {
    backgroundColor: cyan[100],
    color: cyan[600]
  }
};

class CoursePicker extends React.Component {
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  render() {
    const {
      classes,
      onClose,
      selectedValue,
      courses,
      name,
      availableTeeTimes,
      getCurrentCourse,
      handleListItemClick,
      join,
      filterCourses,
      teeTimes,
      ...other
    } = this.props;

    const listCourses = course => (
      <ListItem
        button
        onClick={() => {
          this.handleListItemClick(course.name);
        }}
        key={uuid.v4()}
      >
        <ListItemAvatar>
          <Avatar className={classes.avatar}>
            <GolfCourse />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={course.name} />
      </ListItem>
    );

    return (
      <Dialog
        onClose={this.handleClose}
        aria-labelledby="course-picker"
        {...other}
      >
        <DialogTitle id="course-picker">Select Course</DialogTitle>
        <div>
          {console.log(availableTeeTimes)}
          <List>
            {this.props.join
              ? map(listCourses, filterCourses(courses, availableTeeTimes))
              : map(listCourses, courses)}
            <ListItem
              button
              onClick={() => {
                this.handleListItemClick(courses._id);
              }}
            />
          </List>
        </div>
      </Dialog>
    );
  }
}

const mapStateToPropsPicker = state => ({
  courses: state.courses.courses,
  availableTeeTimes: filter(t => !t.isFull, state.teeTimes),
  teeTimes: state.teeTimes
});

const mapActionsToPropsPicker = dispatch => {
  return {
    filterCourses: (courses, teeTimes) =>
      dispatch(filterCourses(courses, teeTimes))
  };
};

const connectorPick = connect(
  mapStateToPropsPicker,
  mapActionsToPropsPicker
);

const WrappedCoursePicker = connectorPick(withStyles(styles)(CoursePicker));

////////
///////
///////
///////

class CourseSelector extends React.Component {
  state = {
    open: false,
    selectedValue: this.props.courses[1] || ""
  };

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  select = `PRESS HERE TO SELECT COURSE`;

  handleClose = value => {
    console.log("value", value);

    this.props.selectedValue(value);
    this.setState({ selectedValue: value, open: false });
  };

  render() {
    const { select, selectedValue, join } = this.props;
    return (
      <React.Fragment>
        <Typography variant="subheading">
          {`${
            typeof this.state.selectedValue === typeof {}
              ? ""
              : this.state.selectedValue
          }`}
        </Typography>
        <Button onClick={this.handleClickOpen}>
          PRESS HERE TO SELECT COURSE
        </Button>
        <WrappedCoursePicker
          selectedValue={this.state.selectedValue}
          open={this.state.open}
          onClose={this.handleClose}
          join={join || false}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  courses: state.courses.courses,
  name: state.courses.name,
  selectedValue: state.selectedValue,
  teeTimes: state.teeTimes,
  select: `PRESS HERE TO SELECT COURSE`
});

const mapActionsToProps = dispatch => {
  return {
    selectedValue: name => {
      dispatch({ type: CURRENT_COURSE_SELECTED, payload: name });
    },
    filterCourses: courses => dispatch(filterCourses(courses))
  };
};

const connector = connect(
  mapStateToProps,
  mapActionsToProps
);

export default connector(CourseSelector);
