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

const times = [
  "8:00am - 10:00am",
  "9:00am - 11:00am",
  "10:00am - 12:00pm",
  "11:00am - 1:00pm",
  "12:00pm - 2:00pm",
  "1:00pm - 3:00pm",
  "2:00pm - 4:00pm",
  "3:00pm - 5:00pm"
];
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
    const { classes, onClose, selectedValue, ...other } = this.props;

    return (
      <Dialog
        onClose={this.handleClose}
        aria-labelledby="time-picker"
        {...other}
      >
        <DialogTitle id="time-picker">Select Time Window</DialogTitle>
        <div>
          <List>
            {times.map(time => (
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

TimePicker.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string
};

const TimePickerWrapped = withStyles(styles)(TimePicker);

class TimeSelector extends React.Component {
  state = {
    open: false,
    selectedValue: times[1]
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
        <Button onClick={this.handleClickOpen}>Select Time</Button>
        <TimePickerWrapped
          selectedValue={this.state.selectedValue}
          open={this.state.open}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

export default TimeSelector;
