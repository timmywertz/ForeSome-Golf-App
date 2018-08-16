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
import { QueryBuilder } from "@material-ui/icons";

import { TEETIME_TIME_SELECTED } from "../constants";
import { connect } from "react-redux";
import { map } from "ramda";

const styles = {
  avatar: {
    backgroundColor: grey[100],
    color: grey[600]
  }
};

class TimePicker extends React.Component {
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
      ...other
    } = this.props;

    const listTimes = time => (
      <ListItem
        button
        onClick={() => this.handleListItemClick(time)}
        key={time}
      >
        <ListItemAvatar>
          <Avatar className={classes.avatar}>
            <QueryBuilder />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={time} />
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
            {map(listTimes, teeTimeWindow)}
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

TimePicker.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string
};

const mapStateToPropsPicker = state => ({
  currentTeeTimeWindow: state.courses.currentCourse.teeTimeWindow,
  teeTimeWindow: state.courses.teeTimeWindow
});

const connectorPick = connect(mapStateToPropsPicker);

const WrappedTimePicker = connectorPick(withStyles(styles)(TimePicker));

class TimeSelector extends React.Component {
  state = {
    open: false,
    selectedTimeWindow: this.props.teeTimeWindow[1]
  };

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = value => {
    console.log(value);
    this.props.selectedTimeWindow(value);
    this.setState({ selectedTimeWindow: value, open: false });
  };

  render() {
    return (
      <div>
        <Typography variant="subheading">
          Selected: {this.state.selectedTimeWindow}
        </Typography>
        <br />
        <Button onClick={this.handleClickOpen}>Select Time</Button>
        <WrappedTimePicker
          selectedValue={this.state.selectedTimeWindow}
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
  selectedValue: state.selectedValue,
  selectedTimeWindow: state.selectedTimeWindow
});

const mapActionsToProps = dispatch => {
  return {
    selectedTimeWindow: teetime => {
      dispatch({ type: TEETIME_TIME_SELECTED, payload: teetime });
    }
  };
};

const connector = connect(
  mapStateToProps,
  mapActionsToProps
);

export default connector(TimeSelector);
