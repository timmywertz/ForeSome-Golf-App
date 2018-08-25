import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { TEETIME_DATE_SELECTED } from "../constants";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginTop: 20,
    marginLeft: 100,
    marginRight: theme.spacing.unit,
    width: 200
  }
});

class DatePicker extends React.Component {
  state = {
    open: false,
    selectedDate: this.props.datePicked || new Date()
  };

  handleDate = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes, courses, teeTimes, onChange, value } = this.props;

    console.log(value);

    return (
      <form className={classes.container}>
        <TextField
          onChange={e => onChange(e.target.value)}
          value={value}
          id="date"
          label="Select Date"
          type="date"
          className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
        />
      </form>
    );
  }
}

export default withStyles(styles)(DatePicker);
