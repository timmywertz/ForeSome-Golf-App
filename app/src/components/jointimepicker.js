/* eslint-disable react/no-multi-comp */

import React from "react";
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
import { QueryBuilder } from "@material-ui/icons";

import { TEETIME_JOINED } from "../constants";
import { connect } from "react-redux";
import { filter, map } from "ramda";
const uuid = require("uuid");

const styles = {
  avatar: {
    backgroundColor: grey[100],
    color: grey[600]
  }
};

class JoinTeeTimePicker extends React.Component {
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
      teeTimeWindow,
      currentTeeTimeWindow,
      availableTeeTimes,
      teeTimes,
      currentTeeTimes,
      currentCourse,
      ...other
    } = this.props;

    const listAvailableTeeTimes = teeTimes => (
      <ListItem
        button
        onClick={() => this.handleListItemClick(teeTimes._id)}
        key={uuid.v4()}
      >
        <ListItemAvatar>
          <Avatar className={classes.avatar}>
            <QueryBuilder />
          </Avatar>
        </ListItemAvatar>

        <ListItemText
          primary={`Date: ${teeTimes.teeTimeDate}
                    Time: ${teeTimes.teeTimeCreated}
                    Gender Preferences: ${teeTimes.gender}
                    Handicap Range: ${teeTimes.hcpRange}
                    Desired Group Size: ${teeTimes.groupSize}`}
        />
      </ListItem>
    );

    return (
      <Dialog
        onClose={this.handleClose}
        aria-labelledby="time-picker"
        {...other}
      >
        <DialogTitle id="time-picker">Select Tee-Time</DialogTitle>
        <div>
          <List>
            {map(listAvailableTeeTimes, currentTeeTimes)}
            <ListItem
              button
              onClick={() =>
                this.handleListItemClick(listAvailableTeeTimes._id)
              }
            />
          </List>
        </div>
      </Dialog>
    );
  }
}

const mapStateToPropsPicker = state => ({
  courses: state.courses,
  currentCourse: state.courses.currentCourse,
  currentTeeTimes: filter(
    t => t.courseId === state.courses.currentCourse._id,
    state.teeTimes
  ),
  listAvailableTeeTimes: filter(t => !t.isFull, state.teeTimes),
  teeTimes: state.teeTimes
});

// const mapActionsToPropsPicker = dispatch => {
//   return {
//     filterTeeTimes
//   };
// };

const connectorPick = connect(mapStateToPropsPicker);

const WrappedJoinTeeTimePicker = connectorPick(
  withStyles(styles)(JoinTeeTimePicker)
);

class JoinAvailableTeeTimeSelector extends React.Component {
  state = {
    open: false,
    teeTimeCreated: this.props.teeTimeJoined[1]
  };

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = value => {
    console.log("VALUE", value);
    this.props.teeTimeJoined(value);
    this.setState({ teeTimeJoined: value, open: false });
  };

  render() {
    const { teeTimes } = this.props;
    return (
      <div>
        <Typography variant="subheading">
          Selected: {this.state.teeTimeJoined}
        </Typography>
        <br />
        <Button onClick={this.handleClickOpen}>Select Tee-Time</Button>
        <WrappedJoinTeeTimePicker
          selectedValue={this.state.teeTimeJoined}
          open={this.state.open}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  courses: state.courses,
  course: state.courses.currentCourse,
  teeTimes: state.courses.currentCourse.teeTimes,
  teeTimeWindow: state.courses.teeTimeWindow,
  currentTeeTimeWindow: state.courses.currentCourse.teeTimeWindow,
  selectedTeeTimeWindow: state.courses.selectedTeeTimeWindow,
  teeTimeJoined: state.teeTimes._id,
  teeTimes: state.teeTimes,
  listAvailableTeeTimes: filter(t => !t.isFull, state.teeTimes)
});

const mapActionsToProps = dispatch => {
  return {
    teeTimeJoined: teetime => {
      dispatch({ type: TEETIME_JOINED, payload: teetime });
    }
  };
};

const connector = connect(
  mapStateToProps,
  mapActionsToProps
);

export default connector(JoinAvailableTeeTimeSelector);
