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
import { getCourses } from "../action-creators/courses";

//{Course.name}

const courses = [
  "Patriots Point Links",
  "City of Charleston Golf Course",
  "The Ocean Course, Kiawah Island Golf Resort",
  "Daniel Island Club",
  "Wild Dunes Links Golf Course",
  "Shadowmoss Plantation Golf Club",
  "Links at Stono Ferry",
  "Crowfield Golf Club",
  "Dunes West Golf and River Club",
  "Legend Oaks Golf Club",
  "RiverTowne Country Club",
  "Wild Dunes Harbor"
];
// const li = courses => {
//     return (

//     )
// }

const styles = {
  avatar: {
    backgroundColor: grey[100],
    color: grey[600]
  }
};

class CoursePicker extends React.Component {
  //const CoursePicker = course => {
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  render() {
    const { classes, onClose, selectedValue, ...other } = this.props;

    return (
      <Dialog
        onClose={this.handleClose}
        aria-labelledby="course-picker"
        {...other}
      >
        <DialogTitle id="course-picker">Select Course</DialogTitle>
        <div>
          <List>
            {courses.map(course => (
              <ListItem
                button
                onClick={() => this.handleListItemClick(course)}
                key={course}
              >
                <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                    <GolfCourse />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={course} />
              </ListItem>
            ))}
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

CoursePicker.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string
};

const CoursePickerWrapped = withStyles(styles)(CoursePicker);

class CourseSelector extends React.Component {
  state = {
    open: false,
    selectedValue: courses[1]
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
        <CoursePickerWrapped
          selectedValue={this.state.selectedValue}
          open={this.state.open}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return { courses: state.courses };
// };

//const connector = connect(mapStateToProps);
export default CourseSelector;
