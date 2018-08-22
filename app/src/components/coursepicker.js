/* eslint-disable react/no-multi-comp */

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import grey from "@material-ui/core/colors/grey";
import { GolfCourse } from "@material-ui/icons";
import { connect } from "react-redux";
import filterCourses from "../lib/joinCoursesHelper";

import { getCourses } from "../action-creators/courses";
import { GET_CURRENT_COURSE, CURRENT_COURSE_SELECTED } from "../constants";
import { currentCourse } from "../reducers/courses";
import { map } from "ramda";
const uuid = require("uuid");

const styles = {
  avatar: {
    backgroundColor: grey[100],
    color: grey[600]
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
      // currentCourse,
      getCurrentCourse,
      handleListItemClick,
      join,
      ...other
    } = this.props;

    const listCourses = course => (
      <ListItem
        button
        onClick={() => {
          // this.props.getCurrentCourse("test");
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
          <List>
            {this.props.join
              ? map(listCourses, filterCourses(courses))
              : map(listCourses, courses)}
            <ListItem
              button
              onClick={() => {
                // this.props.getCurrentCourse(courses._id);
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
  courses: state.courses.courses
});

const connectorPick = connect(
  mapStateToPropsPicker
  //mapActionsToPropsPicker
);

const WrappedCoursePicker = connectorPick(withStyles(styles)(CoursePicker));

class CourseSelector extends React.Component {
  state = {
    open: false,
    selectedValue: this.props.courses[1]
  };

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = value => {
    console.log("value", value);

    this.props.selectedValue(value);
    // this.props.getCurrentCourse(value);
    this.setState({ selectedValue: value, open: false });
  };

  render() {
    return (
      <div>
        <Typography variant="subheading">
          Selected: {this.state.selectedValue}
        </Typography>
        <br />
        <Button onClick={this.handleClickOpen}>Select Course</Button>
        <WrappedCoursePicker
          selectedValue={this.state.selectedValue}
          open={this.state.open}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  courses: state.courses.courses,
  name: state.courses.name,
  selectedValue: state.selectedValue
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
