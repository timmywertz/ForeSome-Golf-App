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
import { cyan } from "@material-ui/core/colors";
import { QueryBuilder } from "@material-ui/icons";

import { NEW_TEETIME_CREATED } from "../constants";
import { connect } from "react-redux";
import { map } from "ramda";
const uuid = require("uuid");

const styles = {
  avatar: {
    backgroundColor: cyan[100],
    color: cyan[600]
  }
};

class TeeTimePicker extends React.Component {
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
      ...other
    } = this.props;

    const listTeeTimes = list => (
      <ListItem
        button
        onClick={() => this.handleListItemClick(list)}
        key={uuid.v4()}
      >
        <ListItemAvatar>
          <Avatar className={classes.avatar}>
            <QueryBuilder />
          </Avatar>
        </ListItemAvatar>

        <ListItemText primary={list.time} />
      </ListItem>
    );

    return (
      <Dialog
        onClose={this.handleClose}
        aria-labelledby="time-picker"
        {...other}
      >
        <DialogTitle id="time-picker">Select Time Window</DialogTitle>
        <div>
          <List>
            {map(listTeeTimes, availableTeeTimes)}
            <ListItem
              button
              onClick={() => this.handleListItemClick(availableTeeTimes._id)}
            />
          </List>
        </div>
      </Dialog>
    );
  }
}

const mapStateToPropsPicker = state => ({
  currentTeeTimeWindow: state.courses.currentCourse.teeTimeWindow,
  teeTimeWindow: state.courses.teeTimeWindow,
  availableTeeTimes: state.courses.availableTeeTimes
});

const connectorPick = connect(mapStateToPropsPicker);

const WrappedTeeTimePicker = connectorPick(withStyles(styles)(TeeTimePicker));

class AvailableTeeTimeSelector extends React.Component {
  state = {
    open: false,
    teeTimeCreated: this.props.teeTimeCreated[1]
  };

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = value => {
    console.log("VALUE", value);
    this.props.teeTimeCreated(value.time);
    this.setState({ teeTimeCreated: value.time, open: false });
  };

  render() {
    const { teeTimeCreated } = this.props;
    return (
      <React.Fragment>
        <Button onClick={this.handleClickOpen}>
          {this.state.teeTimeCreated || `PRESS HERE TO SELECT TEE-TIME`}
        </Button>
        <WrappedTeeTimePicker
          selectedValue={this.state.teeTimeCreated}
          open={this.state.open}
          onClose={this.handleClose}
        />
      </React.Fragment>
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
  teeTimeCreated: state.courses.teeTimeCreated,
  availableTeeTimes: state.courses.availableTeeTimes
});

const mapActionsToProps = dispatch => {
  return {
    teeTimeCreated: teetime => {
      dispatch({ type: NEW_TEETIME_CREATED, payload: teetime });
    }
  };
};

const connector = connect(
  mapStateToProps,
  mapActionsToProps
);

export default connector(AvailableTeeTimeSelector);
