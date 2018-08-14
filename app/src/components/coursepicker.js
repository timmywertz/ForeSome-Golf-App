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

import { getCourses, getCurrentCourse } from "../action-creators/courses";
import { currentCourse } from "../reducers/courses";
import { map } from "ramda";

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
      currentCourse,
      ...other
    } = this.props;

    const listCourses = course => (
      <ListItem
        button
        onClick={() => this.handleListItemClick(course.name)}
        key={course._id}
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
            {map(listCourses, courses)}
            <ListItem
              button
              onClick={() => this.handleListItemClick("addAccount")}
            />
          </List>
        </div>
      </Dialog>
    );
  }
}
const mapStateToPropsPicker = state => ({
  courses: state.courses
});

const connectorPick = connect(mapStateToPropsPicker);

const WrappedCoursePicker = connectorPick(withStyles(styles)(CoursePicker));

CoursePicker.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
  courses: PropTypes.object.isRequired,
  name: PropTypes.string
};

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
  courses: state.courses,
  name: state.courses.name,
  selectedValue: state.selectedValue
});

const mapActionsToProps = dispatch => ({
  currentCourse: selectedValue => dispatch(currentCourse(selectedValue))
});

const connector = connect(
  mapStateToProps,
  mapActionsToProps
);

export default connector(CourseSelector);
